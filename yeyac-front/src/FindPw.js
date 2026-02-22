import { useNavigate } from "react-router-dom";
import "./FindId.css";
import { useState } from "react";

function Find(){
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부 상태 추가
    const navigate = useNavigate();

    const findPwData = { id : id, email : email }

    async function findPw() {
        if (!id){
            alert("아이디를 입력해주세요.");
            return; }

        if (!email) {
            alert("이메일을 입력해주세요.");
            return; }

        try {
            const response = await fetch("/api/v1/find-pw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(findPwData)
            });
            
            const data = await response.json();
            if (response.ok) {
                // 성공 시 비번 재설정 페이지로 이동하며 데이터 전달
                navigate("/resetPw", { state: { id: id, info: data } });
            } else {
                alert("일치하는 계정이 없습니다.");
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
            <div className="findId" onClick={() => navigate("/findId")}>아이디 찾기</div>
            <div className="findPw" >비밀번호 찾기</div>
        </div>

        <div className="lineWrapper">
            <div className="line"></div> 
            <div className="line1"></div> 
        </div>

            <div className="mergeId">
                <input className="putId" placeholder='아이디 입력' value={id} onChange={(e) => setId(e.target.value)}/>
            </div>
            <div className="line2"></div>
            <div className="mergeEmail">
                <input className="putEmail" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="line2"></div>
            <button type="button" className="go" onClick={findPw}>비밀번호 찾기</button>
        </div>
    );
}
export default Find;
    
