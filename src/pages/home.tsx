import EarthGlobe from '../components/earth-globe';
import CampusSelector from '../components/campus-selector';
import { CampusLocation } from '../data/locations';
import { Link } from 'react-router-dom';

export default function Home() {
  const handleCampusSelect = (campus: CampusLocation) => {
    console.log('选择的校区:', campus);
    // 这里可以添加跳转到地图页面或其他操作
    // 例如: navigate(`/map/${campus.id}`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        background: 'linear-gradient(to bottom, #1e40af 0%, #1e3a8a 15%, #0891b2 30%, #0ea5e9 45%, #0284c7 60%, #0369a1 75%, #1e40af 90%, #3730a3 100%)'
      }}
    >
      {/* Top Navigation Area */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex space-x-4 z-[9999]">
        {/* Home Button (Top Left) */}
        <Link to="/">
          <button className="p-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow-md transition-all duration-300 text-white text-base font-medium">
            🌍Home
          </button>
        </Link>

        {/* Navigation Buttons (Top Right) */}
        <Link to="/about">
          <button className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md hover:bg-white/40 transition-all duration-300 text-white text-base font-medium">
            About
          </button>
        </Link>
        <Link to="/gallery">
          <button className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md hover:bg-white/40 transition-all duration-300 text-white text-base font-medium">
            Gallery
          </button>
        </Link>
      </div>

      {/* 主内容区 */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10">
        {/* 地球容器 - 更大的尺寸 */}
        <div className="w-full max-w-4xl h-[600px] relative">
          <EarthGlobe>
            {/* 在地球中间添加校区选择下拉框 */}
            <CampusSelector 
              onCampusSelect={handleCampusSelect}
              className="z-50"
            />
          </EarthGlobe>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 z-10">
        <Link to="/about">
          <div className="flex flex-col items-center space-y-0.3 cursor-pointer group">
            <p className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors duration-300">
              Scroll down to explore more
            </p>
            <div className="animate-bounce">
              <svg 
                className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 10l5 5 5-5" 
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 