import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function HoAndPharNoti(){

    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    
    //axios는 fetch의 역할
    useEffect(() => {
        // 서버에서 예약 정보를 가져오는 API 호출 예시
        axios.get("/api/v1/last-reservation")
            .then(res => setReservation(res.data))
            .catch(err => console.log(err));
    }, []);

    return(
        <div class="web">
        <div class="container">
            <div class="question">예약한 병원과 가까운 약국을 확인하시겠습니까?</div>
            <div class="container2">
                <div class="reservation">
                    {reservation ? `${reservation.hospitalName} / ${reservation.dateTime}` : "불러오는 중..."}
                </div>
                <div class="img">
                    {reservation && <img src={reservation.hospitalImg} alt="병원" />}
                </div>
            </div>
            <div class="container3">
                <div class="letsFind">주변 가까운 약국과 시간대 찾아보기(지도 배경)</div>
                <div class="go" onClick={() => navigate("/HoAndPhar")}>'>'</div>
            </div>
        </div>
    </div>
    )
}
    
export default HoAndPharNoti;