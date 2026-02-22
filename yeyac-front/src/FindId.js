import { useNavigate } from "react-router-dom";
import "./FindId.css";
import { useState } from "react";

function Find(){
    const [phone, setPhone] = useState("");
    const [veryCode, setVeryCode] = useState("");
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부 상태 추가
    const navigate = useNavigate();
    //폰 번호 입력한 거 onChange로 잡기
    //인증번호 전송 누르면 인증번호 보내기
    //확인 누르면 인증번호 일치 확인
    //아이디 찾기 누르면 url 이동해서 아이디 알려주기

    const findIdData = { phone : phone, veryCode : veryCode }

    const sendCode = async() => {
        if(!phone){
            alert("휴대폰 번호를 입력해주세요.");
            return;
        }

        try{
            const response = await fetch("/api/v1/users/send-code", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({phone : phone})
            });

            if(response.ok){
                alert("인증번호가 전송되었습니다.");
            }else{
                alert("인증번호 전송에 실패했습니다.");
            }
        }catch(error){
            console.error(error);
        }
    }

    const ok = async() => {
        if(!veryCode){
            alert("인증번호를 입력해주세요.");
        }
        try {
            const response = await fetch("/api/v1/users/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phone, code: veryCode })
            });
            
            if (response.ok) {
                alert("인증에 성공했습니다.");
                setIsVerified(true); // 인증 완료 상태로 변경
            } else {
                alert("인증번호가 일치하지 않습니다.");
                setIsVerified(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function findId() {
        if (!isVerified) return alert("먼저 휴대폰 인증을 완료해주세요.");

        try {
            const response = await fetch("/api/v1/users/find-id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phone })
            });
            
            const data = await response.json();
            if (response.ok) {
                // 성공 시 아이디 결과 페이지로 이동하며 데이터 전달
                navigate("/findId-result", { state: { userId: data.userId } });
            } else {
                alert("일치하는 아이디가 없습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 통신 오류");
        }
    }
    
    return (
        <div className="entireContainer">
        <div className="title">아이디 / 비밀번호 찾기</div>
        <div className="mergeFind">
            <div className="findId">아이디 찾기</div>
            <div className="findPw" onClick={() => navigate("/findPw")}>비밀번호 찾기</div>
        </div>

        <div className="lineWrapper">
            <div className="line"></div> 
            <div className="line1"></div> 
        </div>

            <div className="mergePhone">
                <input className="putPhone" placeholder='휴대전화번호 입력("-"제외)' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <div className="sendCode" onClick={sendCode}>인증번호 전송</div>
            </div>
            <div className="line2"></div>
            <div className="mergeCode">
                <input className="putCode" placeholder="인증번호 입력" value={veryCode} onChange={(e) => setVeryCode(e.target.value)}/>
                <div className="ok" onClick={ok}>확인</div>
            </div>
            <div className="line2"></div>
            <button className="go" onClick={findId}>아이디 찾기</button>
        </div>
    );
}
export default Find;