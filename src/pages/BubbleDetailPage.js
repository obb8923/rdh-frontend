import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Lock } from '../../src/assets/lock.svg';
import GNB from '../components/GNB';

export default function BubbleDetailPage() {
  const [circles, setCircles] = useState([]);
  const [postData, setPostData] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = 'http://3.37.170.109:8080'; // 실제 API 서버 주소로 변경하세요
        const postResponse = await fetch(`${baseUrl}/api/post/${id}`);
        const postContentType = postResponse.headers.get("content-type");

        if (!postResponse.ok || !postContentType.includes("application/json")) {
          const errorText = await postResponse.text(); // 응답을 텍스트로 읽어 오류 확인
          throw new Error(`HTTP error! status: ${postResponse.status}, received content type: ${postContentType}, response text: ${errorText}`);
        }

        const postData = await postResponse.json();
        if (postData.success) {
          setPostData(postData.data);
        } else {
          console.error('데이터를 가져오는 중 오류 발생:', postData.message);
        }

        const userResponse = await fetch(`${baseUrl}/api/post/${id}/users`);
        const userContentType = userResponse.headers.get("content-type");

        if (!userResponse.ok || !userContentType.includes("application/json")) {
          const errorText = await userResponse.text();
          throw new Error(`HTTP error! status: ${userResponse.status}, received content type: ${userContentType}, response text: ${errorText}`);
        }

        const userData = await userResponse.json();
        setHasAccess(userData); // true 또는 false 값을 저장
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    };

    fetchData();
  }, [id]);

  const makeCircle = () => {
    const centralRadius = 344;
    const buffer = 65 + 20;
    const minDistance = centralRadius + buffer;
    const maxDistance = centralRadius + 300;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let x, y;

    do {
      const angle = Math.random() * 2 * Math.PI;
      const distance = minDistance + Math.random() * (maxDistance - minDistance);

      x = centerX + distance * Math.cos(angle);
      y = centerY + distance * Math.sin(angle);
    } while (
      x < 0 + buffer ||
      y < 0 + buffer ||
      x > window.innerWidth - buffer ||
      y > window.innerHeight - buffer
      );

    setCircles([...circles, { id: circles.length, x, y }]);
  };

  const handleRequestClick = () => {
    makeCircle();
    navigate('/exchange-form');
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen relative">
      <div className="z-30">
        <GNB />
      </div>
      <div
        className="flex flex-col justify-center items-center border-[#90CCDA] rounded-full w-[688px] h-[688px] border-2 border-solid relative"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="text-center w-[400px] h-[400px] overflow-scroll scroll-container">
          <div className="mb-4">
            <p className="text-3xl text-left">{postData.title}</p>
          </div>
          <div className="pb-4 flex justify-between items-center gap-2">
            <p>{`작성자 ${postData.user.name} ${new Date(postData.createdAt).toLocaleDateString()}`}</p>
            <button
              onClick={handleRequestClick}
              className="px-2 py-1 bg-[#90CCDA] text-white rounded-xl"
            >
              요청하기
            </button>
          </div>
          <div>
            <div className="pb-4 text-left">{postData.preview}</div>

          <div className="pb-4 text-left">
            {hasAccess ? (
              <div>{postData.content}</div>
            ) : (
              <Lock />
            )}
          </div>
          </div>
          <div className="flex justify-center items-center w-[300px]">
            {postData.image && (
              <img src={postData.image} alt="content" className="w-full h-auto" />
            )}
          </div>
        </div>
      </div>
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute w-[70px] h-[70px] bg-[#90CCDA] rounded-full animate-pop"
          style={{ top: `${circle.y - 65}px`, left: `${circle.x - 65}px` }}
        ></div>
      ))}
    </div>
  );
}