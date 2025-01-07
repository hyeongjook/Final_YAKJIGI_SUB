const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const xml2js = require('xml2js');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/law', async (req, res) => {
  const lawId = req.query.lawId;
  if (!lawId) {
    return res.status(400).json({ error: '법령 ID가 필요합니다.' });
  }

  const apiUrl = `https://www.law.go.kr/law/viewer.do?target=law&lawId=${lawId}&OC=hyeongjoo1008`;

  try {
    const response = await fetch(apiUrl);

    // 응답 상태 코드 확인
    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status} - ${response.statusText}`);
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.text();

    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error('XML 파싱 중 오류:', err);
        return res.status(500).json({ error: 'XML 파싱 오류' });
      }

      // 파싱된 결과 반환
      res.json({ data: result });
    });

  } catch (error) {
    console.error('API 요청 처리 중 오류:', error);
    res.status(500).json({ error: '법제처 API 요청 중 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});