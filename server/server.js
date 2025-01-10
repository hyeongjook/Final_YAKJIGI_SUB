// server/server.js
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const port = 5000;

// 외부 사이트 크롤링
app.get('/scrape-law', async (req, res) => {
  try {
    const response = await axios.get('https://www.law.go.kr/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%EC%95%BD%EC%82%AC%EB%B2%95#undefined');
    const $ = cheerio.load(response.data);

    // 예시: 사이트에서 제목을 추출하는 코드
    const title = $('title').text(); // 예시로 페이지 제목을 가져옴

    // 필요에 맞는 데이터를 추출하여 반환
    res.json({ title });
  } catch (error) {
    res.status(500).json({ error: '데이터를 불러오는 데 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
