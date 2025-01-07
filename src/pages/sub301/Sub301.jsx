import React, { useState, useEffect } from 'react';
import commons from '../../styles/common.module.css';
import styles from '../../styles/sub301/sub301.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

// 초성 추출 함수
const getChosung = (text) => {
    const chosung = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const result = [];

    // 초성만 입력된 경우 그대로 반환
    if (/^[ㄱ-ㅎ]+$/.test(text)) {
        return text;
    }

    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);

        if (char >= 0xAC00 && char <= 0xD7A3) { // 한글 음절인 경우
            const unicodeIndex = char - 0xAC00;
            const firstCharIndex = Math.floor(unicodeIndex / (21 * 28));  // 초성 인덱스
            result.push(chosung[firstCharIndex]);
        }
    }

    return result.join('');
};

// 특수문자 제거 함수
const removeSpecialChars = (str) => {
    return str.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s]/g, ''); // 한글과 숫자, 공백을 제외한 특수문자 제거
};

// 주소에서 특수문자 및 공백 제거 함수
const cleanAddress = (address) => {
    return removeSpecialChars(address).replace(/\s+/g, ''); // 공백 제거
};

function Sub301(props) {
    const { mainTitle, subTitle } = useDocumentTitle();

    // 상태 변수
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPharmacies, setFilteredPharmacies] = useState([]); // 검색 결과를 저장
    const [pharmacies, setPharmacies] = useState([]); // 전체 약국 데이터를 저장
    const [loading, setLoading] = useState(true);

    // 페이지네이션 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹

    // JSON 파일을 fetch로 불러오기
    useEffect(() => {
        const loadPharmacies = async () => {
            try {
                // fetch를 통해 JSON 파일 불러오기
                const response = await fetch('/filteredsub301.json'); // 파일 경로 수정
                const data = await response.json(); // JSON 형식으로 파싱

                if (Array.isArray(data)) {
                    // 데이터를 가나다순으로 정렬
                    const sortedData = data.sort((a, b) => {
                        return a.phar_name.localeCompare(b.phar_name, 'ko'); // 한글 가나다순으로 정렬
                    });

                    setPharmacies(sortedData); // 전체 약국 데이터를 저장
                    setFilteredPharmacies(sortedData); // 초기에는 필터링된 데이터도 전체로 설정
                    setTotalPages(Math.ceil(sortedData.length / itemsPerPage)); // 전체 페이지 수 계산
                } else {
                    console.error('데이터 형식 오류: 배열이어야 합니다');
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading pharmacies:", error);
                setLoading(false);
            }
        };

        loadPharmacies();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 검색 함수
    const handleSearch = (e) => {
        e.preventDefault(); // 폼 제출로 인한 페이지 리로드 방지

        let query = searchQuery.trim().replace(/\s+/g, ''); // 검색어에서 공백 제거
        if (query === '') {
            setFilteredPharmacies(pharmacies); // 검색어가 없을 경우 전체 목록으로 초기화
            setTotalPages(Math.ceil(pharmacies.length / itemsPerPage)); // 전체 페이지 수 갱신
            setCurrentPage(1); // 첫 페이지로 리셋
            return;
        }

        // 1. 초성만 추출한 검색어
        const isChosungOnly = /^[ㄱ-ㅎ]+$/.test(query); // 초성만 포함된 경우
        let filtered = [];
        if (isChosungOnly) {
            // 검색어가 초성만 있는 경우
            const queryChosung = getChosung(query); // 검색어 초성 추출

            filtered = pharmacies.filter((pharmacy) => {
                const pharAddress = (pharmacy.phar_address_num || '') + (pharmacy.phar_address || ''); // 주소 합치기
                const pharChosung = getChosung(pharAddress); // 주소의 초성 추출
                return pharChosung.includes(queryChosung); // 초성 검색
            });
        } else {
            // 텍스트 검색: 주소에 검색어가 포함되는지 확인
            filtered = pharmacies.filter((pharmacy) => {
                const pharAddress = (pharmacy.phar_address_num || '') + (pharmacy.phar_address || ''); // 주소 합치기
                // 주소에서 공백 제거 후 텍스트로 검색
                const cleanAddressStr = cleanAddress(pharAddress);
                return cleanAddressStr.includes(query); // 공백 제거한 주소로 검색
            });
        }

        if (filtered.length === 0) {
            // 검색 결과가 없으면 메시지를 출력
            setFilteredPharmacies([]); // 필터링된 결과가 없으면 빈 배열로 설정
        } else {
            // 검색 결과가 있으면 리스트를 업데이트
            setFilteredPharmacies(filtered);
        }

        setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // 전체 페이지 수 갱신
        setCurrentPage(1); // 첫 페이지로 리셋
    };

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 이전 5개 페이지로 이동
    const goToPreviousPages = () => {
        setPageGroup((prev) => {
            const newGroup = Math.max(prev - 1, 0); // 5페이지씩 이전 그룹으로 이동
            setCurrentPage(newGroup * 5 + 1); // 새로운 그룹의 첫 페이지로 설정
            return newGroup;
        });
    };

    // 다음 5개 페이지로 이동
    const goToNextPages = () => {
        setPageGroup((prev) => {
            const newGroup = Math.min(prev + 1, Math.floor(totalPages / 5)); // 5페이지씩 다음 그룹으로 이동
            setCurrentPage(newGroup * 5 + 1); // 새로운 그룹의 첫 페이지로 설정
            return newGroup;
        });
    };

    // 첫 페이지로 이동
    const goToFirstPage = () => {
        setPageGroup(0);
        setCurrentPage(1);
    };

    // 마지막 페이지로 이동
    const goToLastPage = () => {
        setPageGroup(Math.floor(totalPages / 5));
        setCurrentPage(totalPages);
    };

    // 현재 페이지에 해당하는 데이터만 추출
    const indexOfLastPharmacy = currentPage * itemsPerPage;
    const indexOfFirstPharmacy = indexOfLastPharmacy - itemsPerPage;
    const currentPharmacies = filteredPharmacies.slice(indexOfFirstPharmacy, indexOfLastPharmacy);

    // 페이지 번호 배열 생성 (5개씩 페이지 번호 표시)
    const pageNumbers = [];
    const maxVisiblePages = 5; // 한 화면에 보일 최대 페이지 번호 수
    let startPage = pageGroup * maxVisiblePages + 1;
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={commons.container__box__title}>
                <h2 className={commons.main_title}>{mainTitle}</h2>
                <p className={commons.sub_title}>{subTitle}</p>
            </div>

            {/* 검색바 */}
            <ul className={commons.common_search_container}>
                <li>
                    <p>주소 또는 초성 검색</p>
                    <div className={commons.common_search_div}>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                /* 띄어쓰기없이 검색 */
                                placeholder="건물명 또는 지역명을 입력하세요 (예시 : 동대문, ㄷㄷㅁ, ㅇㅅ, 일산)"
                            />
                            <button type="submit" className="material-icons">search</button>
                        </form>
                    </div>
                </li>
            </ul>

            <div className={styles.sub_container2}>
                <ul className={styles.contents_box}>
                    <li className={styles.textcenter}>
                        {/* 검색 결과 */}
                        {filteredPharmacies.length === 0 ? (
                            <div>검색 결과가 없습니다.</div>
                        ) : (
                            <>
                                <div>
                                    <ul className={styles.result_bar}>
                                        <li>총 <span>{filteredPharmacies.length}</span>개의 결과가 있습니다.</li>
                                    </ul>
                                </div>

                                <div className={styles.table}>
                                    <table className={styles.status_table}>
                                        <thead>
                                            <tr>
                                                <th>약국명</th>
                                                <th>주소</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPharmacies.map((pharmacy, index) => (
                                                <tr key={index}>
                                                    <td>{pharmacy.phar_name}</td>
                                                    <td>{pharmacy.phar_address || "주소 없음"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 페이지네이션 */}
                                <div>
                                    <ul className={commons.paging_num_ul}>
                                        <li onClick={goToFirstPage} className="material-icons">keyboard_double_arrow_left</li>
                                        <li onClick={goToPreviousPages} className="material-icons">chevron_left</li>
                                        {pageNumbers.map((number) => (
                                            <li
                                                key={number}
                                                onClick={() => handlePageChange(number)}
                                                className={currentPage === number ? commons.active : ''}>
                                                {number}
                                            </li>
                                        ))}
                                        <li onClick={goToNextPages} className="material-icons">chevron_right</li>
                                        <li onClick={goToLastPage} className="material-icons">keyboard_double_arrow_right</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sub301;