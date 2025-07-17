import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import GalleryPage from './pages/gallery';
import MapPage from './pages/map';

function App() {
  return (
    <div className="min-h-screen bg-light-ocean">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/map/:campus" element={<MapPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<div>管理页面开发中...</div>} />
      </Routes>
    </div>
  );
}

export default App; 