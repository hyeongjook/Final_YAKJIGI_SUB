import React, { useState } from 'react';
import styles from '../../styles/sub105/sub105.module.css';

const Sub105 = () => {
  // 초기 상태를 '법령'으로 설정
  const [activeCategory, setActiveCategory] = useState('법령');

  // 각 카테고리에 해당하는 링크들
  const categoryLinks = {
    법령: 'https://www.law.go.kr/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%EC%95%BD%EC%82%AC%EB%B2%95#undefined',
    대통령령: 'https://www.law.go.kr/LSW/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%EC%9D%98%EC%95%BD%ED%92%88+%EB%B6%80%EC%9E%91%EC%9A%A9+%ED%94%BC%ED%95%B4%EA%B5%AC%EC%A0%9C%EC%97%90+%EA%B4%80%ED%95%9C+%EA%B7%9C%EC%A0%95#undefined',
    총리령: 'https://www.law.go.kr/LSW/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%EC%9D%98%EC%95%BD%ED%92%88+%EB%93%B1%EC%9D%98+%EC%95%88%EC%A0%84%EC%97%90+%EA%B4%80%ED%95%9C+%EA%B7%9C%EC%B9%99#undefined',
    고시: 'https://www.law.go.kr/LSW/admRulSc.do?menuId=5&subMenuId=41&tabMenuId=183&p1=&subMenu=1&nwYn=1&section=&tabNo=&query=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%95%BD%EC%A0%84#liBgcolor0'
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
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
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.sub105__medlawapicontent}>
        <iframe
          src={categoryLinks[activeCategory]}
          width="100%"
          height="800px"
          title={`${activeCategory} 법령`}
        />
      </div>
    </div>
  );
};

export default Sub105;
