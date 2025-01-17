import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Child({ data, id, defaultPath, detailPath }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로를 가져오는 훅

  const colors = ['#ECFAFE', '#90CCDA', '#BEDBE2']; // 사용 가능한 색상들
  const [backgroundColor] = useState(
    () => colors[Math.floor(Math.random() * colors.length)],
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 배경색에 따라 글자색을 설정
  const textColor =
    backgroundColor === '#ECFAFE'
      ? '#454C54'
      : '#FFFFFF';

  const handleClick = () => {
    // 현재 경로에 따라 detailPath를 유동적으로 설정
    if (location.pathname === defaultPath) {
      navigate(`${detailPath}/${id}`);
    } else {
      navigate(`/bubble/${id}`); // 기본적으로 /bubble/{id}로 이동
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 즉시 position을 업데이트
    setPosition({
      x: Math.floor(Math.random() * 40) - 20,
      y: Math.floor(Math.random() * 40) - 20,
    });

    // 주기적으로 position을 업데이트하여 div를 움직이도록 합니다.
    const interval = setInterval(() => {
      setPosition({
        x: Math.floor(Math.random() * 40) - 20,
        y: Math.floor(Math.random() * 40) - 20,
      });
    }, 2000); // 2000ms마다 업데이트 (2초)

    return () => clearInterval(interval); // 컴포넌트가 unmount 될 때 interval을 정리합니다.
  }, []);

  return (
    <div
      className="flex justify-center w-full h-full rounded-full cursor-pointer transform transition-transform duration-1000 hover:scale-125"
      style={{
        backgroundColor,
        color: textColor,
        transform: `translate(${position.x}px, ${position.y}px)`, // div의 위치를 설정
        transition: 'transform 3s linear 0s', // 부드러운 움직임을 위한 transition 추가
      }}
      onClick={handleClick}
    >
      <p className="content-center">{data}</p>
    </div>
  );
}