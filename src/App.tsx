import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';

function App() {
  return (
    <div className="min-h-screen bg-light-ocean">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map/:campus" element={<div>地图页面开发中...</div>} />
        <Route path="/gallery" element={<div>画廊页面开发中...</div>} />
        <Route path="/about" element={<div>关于页面开发中...</div>} />
        <Route path="/admin" element={<div>管理页面开发中...</div>} />
      </Routes>
    </div>
  );
}

export default App; 