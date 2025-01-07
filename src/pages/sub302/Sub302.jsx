import React, { useEffect, useRef, useState } from 'react';
import commons from '../../styles/common.module.css';
import styles from '../../styles/sub302/sub302.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Sub302(props) {
   const { mainTitle, subTitle } = useDocumentTitle();
   const mapContainerRef = useRef(null);
   const [locations, setLocations] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');

   // JSON 파일에서 주소 데이터를 가져옵니다.
   useEffect(() => {
      fetch('/filteredsub302.json')
         .then((response) => response.json())
         .then((data) => {
            setLocations(data);
         })
         .catch((error) => {
            console.error('주소 데이터를 불러오는 데 실패했습니다:', error);
         });
   }, []);

   useEffect(() => {
      if (locations.length === 0) return;

      // 카카오맵 API 스크립트를 동적으로 추가
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=ab07141ee929664c409a80cf396d1118&autoload=false`;
      script.async = true;
      script.onload = () => {
         window.kakao.maps.load(() => {
            const mapOption = {
               center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도, 경도
               level: 6, // 확대 수준
            };

            const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);

            const markers = [];
            const bounds = new window.kakao.maps.LatLngBounds(); // 마커가 다 보이게 하기 위한 범위 설정

            locations.forEach((location) => {
               // box_address와 검색어가 일치하는지 확인
               if (location.box_address.includes(searchQuery)) {
                  const latLng = new window.kakao.maps.LatLng(location.box_lat, location.box_long);
                  const marker = new window.kakao.maps.Marker({
                     position: latLng,
                  });
                  markers.push(marker);
                  marker.setMap(map);

                  // 마커를 포함할 영역 설정
                  bounds.extend(latLng);
               }
            });

            // 마커가 모두 표시된 후, 지도 영역을 자동으로 설정하여 모든 마커가 보이게 함
            if (markers.length > 0) {
               map.setBounds(bounds);
            }
         });
      };
      document.head.appendChild(script);

      return () => {
         // 컴포넌트가 unmount 될 때 스크립트를 제거할 수 있도록 cleanup 처리
         document.head.removeChild(script);
      };
   }, [locations, searchQuery]);

   // 검색어 변경 핸들러
   const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
   };

   return (
      <>
         <div className={commons.container__box__title}>
            <h2 className={commons.main_title}>{mainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>
         </div>
         
         {/* 검색바 */}
         <ul className={commons.common_search_container}>
            <li>
               <p>검색어 검색</p>
            
               <div className={commons.common_search_div}>
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input
                        type="text"
                        placeholder="검색어를 입력해주세요."
                        value={searchQuery}
                        onChange={handleSearchChange}
                     />
                     <button className="material-icons">search</button>
                  </form>
               </div>
            </li>
         </ul>
         
         <div className={styles.content_container}>
            <div className={styles.list_section}> 
               {/* 카카오맵 API가 들어갈 영역 */}
               <div
                  ref={mapContainerRef}
                  style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
               />
            </div>
         </div>
      </>
   );
}

export default Sub302;