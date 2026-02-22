import React from "react";
import AdminLogin from "./AdminLogin";
import FindId from "./FindId";
import FindPw from "./FindPw";
import HoAndPhar from "./HoAndPhar"
import HoAndPharNoti from "./HoAndPharNoti"
import Pharmacy from "./Pharmacy"
import Hos_RegionSelect from "./Hos_RegionSelect"
import ResetPassword from "./ResetPassword"
import UserLogin from "./UserLogin"
import UserSignup from "./UserSignup"
import DeptSearch from "./DeptSearch"
import Chat from "./Chat";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";

 
function App() {
<span></span>

  return (
    <BrowserRouter>
    <Link to="/adminLogin">관리자로그인. </Link>
    <Link to="/findId">아이디찾기. </Link>
    <Link to="/findPw">비번찾기. </Link>
    <Link to="/hoAndPharmacy">병원&약국. </Link>
    <Link to="/hoAndPharNoti">병원&약국공지. </Link>
    <Link to="/pharmacy">약국. </Link>
    <Link to="/passwordReset">비번재설정. </Link>
    <Link to="/hos_RegionSelect">약국지역찾기. </Link>
    <Link to="/userLogin">사용자로그인. </Link>
    <Link to="/deptSearch">자동완성. </Link>
    <Link to="/chat">채팅창. </Link>

    <Link to="/signup/userSignup">사용자회원가입. </Link>
    <Routes>
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/findId' element={<FindId />} />
        <Route path='/findPw' element={<FindPw />} />
        <Route path='/hoAndPharmacy' element={<HoAndPhar />} />
        <Route path='/hoAndPharNoti' element={<HoAndPharNoti />} />
        <Route path='/pharmacy' element={<Pharmacy />} />
        <Route path='/passwordReset' element={<ResetPassword />} />
        <Route path='/hos_RegionSelect' element={<Hos_RegionSelect />} />
        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/signup/userSignup' element={<UserSignup />} />
        <Route path='/deptSearch' element={<DeptSearch />} />
        <Route path='/chat' element={<Chat />} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
