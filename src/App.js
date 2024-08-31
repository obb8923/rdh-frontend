import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import TargetPage from './pages/TargetPage';
import ReceivedBubbles from './pages/ReceivedBubbles';
import RequestedBubbles from './pages/RequestedBubbles';
import MyBubbles from './pages/MyBubbles';
import ManualPage from './pages/ManualPage';
import Login from './pages/Login';
import FormPage from './pages/FormPage';
import ExchangeFormPage from './pages/ExchangeFormPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/target" element={<TargetPage />} />
        <Route path="/received-bubbles" element={<ReceivedBubbles />} />
        <Route path="/requested-bubbles" element={<RequestedBubbles />} />
        <Route path="/my-bubbles" element={<MyBubbles />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/exchange-form" element={<ExchangeFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
