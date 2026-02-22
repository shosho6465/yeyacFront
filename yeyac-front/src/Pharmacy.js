import { useState, useEffect } from 'react';
import "./Pharmacy.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. axios 임포트 추가

function Pharmacy() {
    const navigate = useNavigate();

    // 더 이상 initialPharmacies 고정 데이터를 사용하지 않고 빈 배열로 시작합니다.
    const [filteredPharmacies, setFilteredPharmacies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState(null); 

    // 2. 서버에서 데이터를 가져오는 함수 (Java Controller 호출)
    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('/api/v1/pharmacy/search', {
                params: {
                    searchTerm: searchTerm,
                    activeFilter: activeFilter
                    // 지역 검색 기능 추가 시 여기에 region 값 추가
                }
            });
            // 자바에서 보낸 List<PharmacyDTO>가 여기에 담깁니다.
            setFilteredPharmacies(response.data);
        } catch (error) {
            console.error("서버에서 약국 데이터를 가져오는 데 실패했습니다.", error);
        }
    };

    // 3. 실시간 검색 및 필터 반영
    // 검색어나 필터가 바뀔 때마다 fetchPharmacies 함수를 실행합니다.
    useEffect(() => {
        fetchPharmacies();
    }, [searchTerm, activeFilter]);

    function handleFilterToggle(type) {
        if (activeFilter === type) {
            setActiveFilter(null);
        } else {
            setActiveFilter(type);
        }
    }

    return (
        <div className="browser">
            <div className="container">
                <div className="upperContainer">
                    <div className="logo">바로닥큐</div>
                    <div className="searchbarDiv">
                        <div className="searchbar">검색창</div>
                    </div>
                    <div className="login">로그인</div>
                    <div className="signup">회원가입</div>
                </div>

                <div className="middleContainer">
                    <div className="regionSearch">
                        <div className="regionSearch1" onClick={() => navigate("/Hos_RegionSelect")}>지역 검색</div>
                        <div className="searchLine"></div>
                        <input 
                            className="regionSearch2" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="약국 이름을 입력하세요."
                        />
                        {/* 4. 검색 버튼 클릭 시에도 명시적으로 호출 가능 */}
                        <div className="searchBtn" onClick={fetchPharmacies}>검색버튼</div>
                    </div>
                    
                    <button className={`filter1 filter2 ${activeFilter === "진료중" ? "active" : ""}`} onClick={() => handleFilterToggle("진료중")}>진료중</button>
                    <button className={`filter1 filter2 ${activeFilter === "야간진료" ? "active" : ""}`} onClick={() => handleFilterToggle("야간진료")}>야간진료</button>
                    <button className={`filter1 filter2 ${activeFilter === "공휴일" ? "active" : ""}`} onClick={() => handleFilterToggle("공휴일")}>공휴일</button>
                    <button className="filter1 filter2" onClick={() => {setActiveFilter(null); setSearchTerm("");}}>전체보기</button>
                </div>
                
                <div className="container2">
                    <div className="map">지도 (마커 표시 영역)</div>
                    
                    <div className="pharmacyContainer">
                        {filteredPharmacies.length > 0 ? (
                            filteredPharmacies.map((pharmacy) => (
                                <div className="pharmacy" key={pharmacy.id}>
                                    <div className="pharName">{pharmacy.name}</div>
                                    <div className="pharExplain">
                                        <div className="pharExplain1">
                                            <div className="pharAddr">📍 {pharmacy.address}</div>
                                            <div className="pharTel">📞 {pharmacy.tel}</div>
                                            <div className="pharWay">🚶 {pharmacy.way}</div>
                                            <div className="pharTime">⏰ 영업시간: {pharmacy.hours}</div>
                                        </div>
                                        <div className="pharPhoto">
                                            {pharmacy.photo ? <img src={pharmacy.photo} alt="약국" /> : "사진 없음"}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="pharmacy">해당하는 약국이 없습니다.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pharmacy;