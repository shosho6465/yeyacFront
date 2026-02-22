import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [isFullSize, setIsFullSize] = useState(false);
  
  // 1. 상태 관리 추가: 입력값(input)과 메시지 리스트(messages)
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'hospital', text: '안녕하세요! 진료 예약 도와드릴까요?' },
    { id: 2, sender: 'user', text: '내일 오후 3시 예약 가능한가요?' }
  ]);

  const toggleSize = () => {
    setIsFullSize(!isFullSize);
  };

  // 2. 전송 함수 구현
  const handleSend = () => {
    if (inputText.trim() === "") return; // 빈 메시지는 전송 안 됨

    const newMessage = {
      id: Date.now(), // 고유 ID 생성을 위해 현재 시간 사용
      sender: 'user',
      text: inputText
    };

    const url = `http://localhost:8080/api/v1/chat/send?ho_num=1&user_num=1`;

    fetch("/api/v1/chat/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
      },
      body: inputText, // @RequestBody로 전달될 문자열
    })
    .then(response => {
      if (response.ok) {
        console.log("서버 저장 성공");
      } else {
        console.error("서버 응답 에러");
      }
    })
    .catch(error => {
      console.error("네트워크 에러:", error);
    });

    setMessages([...messages, newMessage]); // 기존 메시지에 새 메시지 추가
    setInputText(''); // 입력창 초기화
  };

  // 3. 엔터 키 지원
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`chat-window ${isFullSize ? 'full-size' : 'small-size'}`}>
      {/* 헤더 */}
      <div className="chat-header">
        <div className="title">
          <strong>OO병원 1:1 상담</strong>
        </div>
        <div className="header-buttons">
          <button onClick={toggleSize}>
            {isFullSize ? '축소' : '확대'}
          </button>
          <button>닫기</button>
        </div>
      </div>

      {/* 채팅창: 메시지 배열을 화면에 반복해서 뿌려줌 */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* 하단 입력: value와 이벤트 연결 */}
      <div className="chat-input-area">
        <input 
          type="text" 
          placeholder="메시지를 입력하세요..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="send-btn" onClick={handleSend}>↑</button>
      </div>
    </div>
  );
};

export default Chat;