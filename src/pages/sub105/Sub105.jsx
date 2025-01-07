import React, { useState, useEffect } from 'react';
import styles from '../../styles/sub105/sub105.module.css';

const Sub105 = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 법제처 API 요청 함수
  async function lawApiCall(apiUrl) {
    try {
      const response = await fetch(apiUrl); // 동적으로 설정된 URL로 요청
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json(); // JSON 형태로 응답 받기
      console.log('API Response Data:', jsonData); // API 데이터 구조 확인

      // 데이터가 정상적으로 응답되었을 때 상태 업데이트
      setApiData(jsonData); 
      setIsLoading(false); // 데이터 로딩 끝
    } catch (error) {
      console.error('Error:', error);
      setError('데이터를 불러오는 데 문제가 발생했습니다.'); // 에러 메시지 설정
      setIsLoading(false); // 로딩 상태 종료
    }
  }

  // 데이터 가져오기
  const fetchData = (category) => {
    setActiveCategory(category);
    setIsLoading(true);
    setError(null); // 에러 초기화

    let apiUrl = '';
    switch (category) {
      case '법령':
        apiUrl = 'https://www.law.go.kr/DRF/lawService.do?OC=biosnow19&target=law&MST=267395&type=JSON';
        break;
      case '대통령령':
        apiUrl = 'https://www.law.go.kr/DRF/lawService.do?OC=biosnow19&target=law&MST=267295&type=JSON';
        break;
      case '총리령':
        apiUrl = 'https://www.law.go.kr/DRF/lawService.do?OC=biosnow19&target=law&MST=267895&type=JSON';
        break;
      case '고시':
        apiUrl = 'https://www.law.go.kr/DRF/lawService.do?OC=biosnow19&target=admrul&type=XML&ID=2100000232576';
        break;
      default:
        return;
    }

    lawApiCall(apiUrl);
  };

  return (
    <div className={styles.sub105__medlawcontainer}>
      <h2 className={styles.sub105__medlawtitle}>의약품 관련 법령</h2>
      <h3 className={styles.sub105__medlawsubtitle}>의약품 관련 법령들을 조회해보세요</h3>

      <div className={styles.sub105__medlawcategories}>
        {['법령', '대통령령', '총리령', '고시'].map((category) => (
          <button
            key={category}
            className={`${styles.sub105__medlawcategorybtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => fetchData(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.sub105__medlawapicontent}>
        {isLoading && <p>데이터를 불러오는 중...</p>}
        {error && <p>{error}</p>} {/* 에러 메시지 표시 */}

        {apiData ? (
          apiData.법령 && apiData.법령.개정문 && apiData.법령.개정문.개정문내용 ? (
            apiData.법령.개정문.개정문내용.map((content, index) => (
              <div key={index} className={styles.contentItem}>
                {/* content가 문자열일 경우만 split을 적용 */}
                {typeof content === 'string' ? (
                  content.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))
                ) : (
                  <p>{JSON.stringify(content)}</p> // 문자열이 아니면 객체 형태로 출력
                )}
              </div>
            ))
          ) : (
            <p>데이터가 없습니다.</p>
          )
        ) : (
          <p>카테고리를 선택하십시오.</p> // apiData가 없을 경우
        )}
      </div>
    </div>
  );
};

export default Sub105;
