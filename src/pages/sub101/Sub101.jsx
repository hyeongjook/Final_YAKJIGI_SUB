import React, { useEffect, useState } from 'react';
import commons from '../../styles/common.module.css';
import styles from '../../styles/sub101/sub101.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Sub101(props) {
   const { mainTitle, subTitle } = useDocumentTitle();

   // 상태 변수 추가
   const [storedMainTitle, setStoredMainTitle] = useState(mainTitle);
   const [storedContent, setStoredContent] = useState('');
   const [storedSub1Title, setStoredSub1Title] = useState('');
   const [storedSub1Content, setStoredSub1Content] = useState('');
   const [storedSub2Title, setStoredSub2Title] = useState('');
   const [storedSub2Content, setStoredSub2Content] = useState('');
   const [storedSub3Title, setStoredSub3Title] = useState('');
   const [storedSub3Content, setStoredSub3Content] = useState('');
   const [storedSub4Title, setStoredSub4Title] = useState('');
   const [storedSub4Content, setStoredSub4Content] = useState('');

   // 도심 공원 관련 상태 추가
   const [storedParkTitle, setStoredParkTitle] = useState(''); // 도심 공원 타이틀
   const [storedYear1, setStoredYear1] = useState(''); // 1번 연도
   const [storedYear2, setStoredYear2] = useState(''); // 2번 연도
   const [storedYear3, setStoredYear3] = useState(''); // 3번 연도
   const [storedYear4, setStoredYear4] = useState(''); // 4번 연도

   useEffect(() => {
      // 로컬 저장소에서 값 불러오기
      const mainTitleFromStorage = localStorage.getItem('mainTitle');
      const contentFromStorage = localStorage.getItem('content');
      const sub1TitleFromStorage = localStorage.getItem('sub1Title');
      const sub1ContentFromStorage = localStorage.getItem('sub1Content');
      const sub2TitleFromStorage = localStorage.getItem('sub2Title');
      const sub2ContentFromStorage = localStorage.getItem('sub2Content');
      const sub3TitleFromStorage = localStorage.getItem('sub3Title');
      const sub3ContentFromStorage = localStorage.getItem('sub3Content');
      const sub4TitleFromStorage = localStorage.getItem('sub4Title');
      const sub4ContentFromStorage = localStorage.getItem('sub4Content');
      
      // 도심 공원과 연도 데이터도 로드
      const parkTitleFromStorage = localStorage.getItem('parkTitle');
      const year1FromStorage = localStorage.getItem('year1');
      const year2FromStorage = localStorage.getItem('year2');
      const year3FromStorage = localStorage.getItem('year3');
      const year4FromStorage = localStorage.getItem('year4');

      // 값이 있을 경우, 상태 업데이트
      if (mainTitleFromStorage) setStoredMainTitle(mainTitleFromStorage);
      if (contentFromStorage) setStoredContent(contentFromStorage);
      if (sub1TitleFromStorage) setStoredSub1Title(sub1TitleFromStorage);
      if (sub1ContentFromStorage) setStoredSub1Content(sub1ContentFromStorage);
      if (sub2TitleFromStorage) setStoredSub2Title(sub2TitleFromStorage);
      if (sub2ContentFromStorage) setStoredSub2Content(sub2ContentFromStorage);
      if (sub3TitleFromStorage) setStoredSub3Title(sub3TitleFromStorage);
      if (sub3ContentFromStorage) setStoredSub3Content(sub3ContentFromStorage);
      if (sub4TitleFromStorage) setStoredSub4Title(sub4TitleFromStorage);
      if (sub4ContentFromStorage) setStoredSub4Content(sub4ContentFromStorage);
      
      // 도심 공원과 연도 값이 있을 경우, 상태 업데이트
      if (parkTitleFromStorage) setStoredParkTitle(parkTitleFromStorage);
      if (year1FromStorage) setStoredYear1(year1FromStorage);
      if (year2FromStorage) setStoredYear2(year2FromStorage);
      if (year3FromStorage) setStoredYear3(year3FromStorage);
      if (year4FromStorage) setStoredYear4(year4FromStorage);
   }, []);

   return (
      <>
         <div className={commons.container__box}>
            <h2 className={commons.main_title}>{storedMainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>

            <p className={styles.sub101__content}>{storedContent}</p>
         </div>

         <div className={styles.sub101__container2}>
            <ul>
               <li>
                  <div className={styles.sub101__text}>
                        <p className={styles.sub101__title} data-aos="fade-up">
                           <span>{storedYear1}</span> {/* 연도 1 */}
                           {storedSub1Title}
                        </p>
                        <p className={styles.sub101__content} data-aos="fade-up">{storedSub1Content}</p>
                  </div>
               </li>
               <li>
                  <div className={styles.sub101__text}>
                        <p className={styles.sub101__title} data-aos="fade-up">
                           <span>{storedYear2}</span> {/* 연도 2 */}
                           {storedSub2Title}
                        </p>
                        <p className={styles.sub101__content} data-aos="fade-up">{storedSub2Content}</p>
                  </div>
               </li>
               <li>
                  <div className={styles.sub101__text}>
                        <p className={styles.sub101__title} data-aos="fade-up">
                           <span>{storedYear3}</span> {/* 연도 3 */}
                           {storedSub3Title}
                        </p>
                        <p className={styles.sub101__content} data-aos="fade-up">{storedSub3Content}</p>
                  </div>
               </li>
               <li>
                  <div className={styles.sub101__text}>
                        <p className={styles.sub101__title} data-aos="fade-up">
                           <span>{storedYear4}</span> {/* 연도 4 */}
                           {storedSub4Title} {/* 서브4 타이틀 */}
                        </p>
                        <p className={styles.sub101__content} data-aos="fade-up">{storedSub4Content}</p> {/* 서브4 내용 */}
                  </div>
               </li>
            </ul>
         </div>

         {/* 도심 공원 타이틀 추가 */}
         <div className={styles.sub101__container3}>
            <h3>{storedParkTitle}</h3>
         </div>
      </>
   );
}

export default Sub101;
