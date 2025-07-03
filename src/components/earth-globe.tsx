import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 真实的地球组件
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // 加载纹理
  const [earthDayMap, earthNormalMap, earthSpecularMap, cloudsMap] = useTexture([
    '/textures/earth-daymap.jpg',     // 日间纹理
    '/textures/earth-normal.jpg',     // 法线贴图
    '/textures/earth-specular.jpg',   // 高光贴图
    '/textures/earth-clouds.png'      // 云层纹理
  ]);
  
  // 设置纹理重复和包裹模式，增强亮度
  useEffect(() => {
    [earthDayMap, earthNormalMap, earthSpecularMap, cloudsMap].forEach(texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });
    
    // 增强纹理亮度
    earthDayMap.encoding = THREE.sRGBEncoding;
    
    // 调整对比度和亮度
    new THREE.TextureLoader().load('/textures/earth-daymap.jpg', (texture) => {
      const canvas = document.createElement('canvas');
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      const context = canvas.getContext('2d');
      
      if (context) {
        // 绘制原始纹理
        context.drawImage(texture.image, 0, 0);
        
        // 获取图像数据
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 调整亮度和对比度 - 降低亮度，增加对比度
        const brightness = 15;  // 适当降低亮度
        const contrast = 40;    // 增加对比度
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        
        for (let i = 0; i < data.length; i += 4) {
          // 调整亮度
          data[i] += brightness;     // 红
          data[i + 1] += brightness; // 绿
          data[i + 2] += brightness; // 蓝
          
          // 增加对比度
          data[i] = factor * (data[i] - 128) + 128;
          data[i + 1] = factor * (data[i + 1] - 128) + 128;
          data[i + 2] = factor * (data[i + 2] - 128) + 128;
          
          // 特别增强蓝色区域（海洋）
          if (data[i + 2] > data[i] && data[i + 2] > data[i + 1]) {
            data[i + 2] = Math.min(255, data[i + 2] + 15);
            // 降低红色和绿色以增强蓝色的饱和度
            data[i] = Math.max(0, data[i] - 10);
            data[i + 1] = Math.max(0, data[i + 1] - 5);
          }
          
          // 增强绿色区域（陆地）
          if (data[i + 1] > data[i] && data[i + 1] > data[i + 2]) {
            data[i + 1] = Math.min(255, data[i + 1] + 15);
            // 降低红色和蓝色以增强绿色的饱和度
            data[i] = Math.max(0, data[i] - 5);
            data[i + 2] = Math.max(0, data[i + 2] - 10);
          }
        }
        
        // 将处理后的数据放回画布
        context.putImageData(imageData, 0, 0);
        
        // 创建新纹理
        const enhancedTexture = new THREE.CanvasTexture(canvas);
        enhancedTexture.needsUpdate = true;
        
        // 替换原始纹理
        if (earthRef.current) {
          const material = earthRef.current.material as THREE.MeshPhongMaterial;
          material.map = enhancedTexture;
          material.needsUpdate = true;
        }
      }
    });
  }, [earthDayMap, earthNormalMap, earthSpecularMap, cloudsMap]);
  
  // 地球旋转动画
  useFrame(({ clock }) => {
    if (earthRef.current) {
      // 较慢的自转速度，更加真实
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    
    if (cloudsRef.current) {
      // 云层稍快的旋转速度
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.055;
    }
  });

  return (
    <group>
      {/* 大气层 */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshPhongMaterial 
          color="#aaddff"
          side={THREE.BackSide}
          transparent={true}
          opacity={0.09}
        />
      </mesh>
      
      {/* 主地球 */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          map={earthDayMap}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={18}
          specular={new THREE.Color('#777777')}
          emissive={new THREE.Color('#113366')}
          emissiveIntensity={0.12}
        />
      </mesh>
      
      {/* 云层 */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshPhongMaterial 
          map={cloudsMap}
          transparent={true}
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// 加载指示器组件
function LoadingIndicator() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshBasicMaterial color="#1e88e5" wireframe={true} />
    </mesh>
  );
}

// 纹理加载错误备用方案
function EarthFallback() {
  const earthRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    // 创建Canvas纹理
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // 绘制海洋（更鲜艳的蓝色）
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#0066cc'); 
    oceanGradient.addColorStop(0.5, '#0077cc');
    oceanGradient.addColorStop(1, '#0066cc');
    
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制大陆（更鲜艳的绿色）
    ctx.fillStyle = '#4caf50';
    
    // 简化的大陆形状
    const continents = [
      { x: 512, y: 400, w: 300, h: 200 },
      { x: 700, y: 700, w: 160, h: 240 },
      { x: 1000, y: 400, w: 200, h: 160 },
      { x: 1100, y: 600, w: 240, h: 300 },
      { x: 1400, y: 400, w: 360, h: 240 },
      { x: 1600, y: 760, w: 200, h: 120 }
    ];
    
    // 绘制大陆
    continents.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w, c.h, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // 添加极地冰盖
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, 0, canvas.width / 3, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height, canvas.width / 3, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 创建纹理
    const fallbackTexture = new THREE.CanvasTexture(canvas);
    setTexture(fallbackTexture);
  }, []);
  
  // 简单的旋转动画
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      {texture && (
        <meshStandardMaterial 
          map={texture} 
          metalness={0.1}
          roughness={0.4}
          emissive={new THREE.Color('#113366')}
          emissiveIntensity={0.15}
        />
      )}
    </mesh>
  );
}

// 错误边界组件
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  return hasError ? <EarthFallback /> : <>{children}</>;
}

// 场景控制器
function SceneController() {
  const { camera } = useThree();
  
  useEffect(() => {
    // 设置初始相机位置
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  return null;
}

interface EarthGlobeProps {
  children?: React.ReactNode;
}

export default function EarthGlobe({ children }: EarthGlobeProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* 场景控制器 */}
        <SceneController />
        
        {/* 增强的光照系统 */}
        <ambientLight intensity={1.2} color={0xffffff} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color={0xffffff} />
        <pointLight position={[-5, -2, 3]} intensity={0.6} color={0xffffcc} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color={0xffffff} />
        <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#bbbbff" />
        
        {/* 错误边界处理纹理加载失败情况 */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingIndicator />}>
            <Earth />
          </Suspense>
        </ErrorBoundary>
        
        {/* 启用交互控制 */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.4}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* 中心内容覆盖层 */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
} 