import Bubble from '../components/Bubble';
import GNB from '../components/GNB';
const RequestedBubbles = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <GNB />
      <Bubble />
    </div>
  );
};
export default RequestedBubbles;