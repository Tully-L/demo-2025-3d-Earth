import EarthGlobe from '../components/earth-globe';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#a8d8ff] flex flex-col">
      {/* 左上角首页按钮 */}
      <div className="fixed top-6 left-6 z-10">
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg">
          Home
        </button>
      </div>
      
      {/* 导航按钮 */}
      <div className="fixed top-6 right-6 flex space-x-4 z-10">
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg">
          About
        </button>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg">
          Gallery
        </button>
      </div>
      
      {/* 主内容区 */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* 地球容器 - 更大的尺寸 */}
        <div className="w-full max-w-4xl h-[600px] relative">
          <EarthGlobe />
        </div>
      </div>
    </div>
  );
} 