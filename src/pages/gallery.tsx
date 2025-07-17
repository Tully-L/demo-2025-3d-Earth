import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EarthGlobe from '../components/earth-globe';
import { fetchGalleryContents } from '../utils/driveUtils';
import { MediaFile } from '../types';

export default function Gallery() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicName = "Walk Alone - Zkaaai";

  useEffect(() => {
    // Initialize music player
    audioRef.current = new Audio('/music/Zkaaai - Walk Alone.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const items = await fetchGalleryContents();
        
        if (items.length === 0) {
          throw new Error('No media files found in the gallery');
        }

        setMediaItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media items');
        console.error('Error loading media items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMediaItems();
  }, []);

  // Reset flip state when changing images
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleFrontClick = () => {
    setIsFlipped(true);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    // Check if the click target is the text element
    const target = e.target as HTMLElement;
    if (target.tagName === 'H2' && target.textContent === 'Click to return to Map') {
      navigate('/map/pearson');
    } else {
      setIsFlipped(false);
    }
  };

  // Handle media loading errors
  const handleMediaError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    const target = e.target as HTMLImageElement | HTMLVideoElement;
    console.error('Error loading media:', target.src);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">Oops!</p>
          <p className="text-xl mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1e40af 0%, #1e3a8a 15%, #0891b2 30%, #0ea5e9 45%, #0284c7 60%, #0369a1 75%, #1e40af 90%, #3730a3 100%)'
      }}
    >
      {/* Background Earth Globe */}
      <div className="absolute inset-0 opacity-30">
        <EarthGlobe />
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-[9999]">
        <Link to="/">
          <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 text-white text-lg font-medium">
            Home
          </button>
        </Link>
      </div>

      {/* Top Right Navigation */}
      <div className="fixed top-6 right-6 flex space-x-4 z-[9999]">
        <Link to="/about">
          <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 text-white text-lg font-medium">
            About
          </button>
        </Link>
        <button className="px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow-lg text-white text-lg font-medium">
          Gallery
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="relative w-full max-w-4xl aspect-[16/9] perspective-1000">
          {/* Media Card Container */}
          <div 
            className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front Side (Image/Video) */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
              onClick={handleFrontClick}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
                {mediaItems[currentIndex]?.type === 'video' ? (
                  <video
                    src={mediaItems[currentIndex].url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    onError={handleMediaError}
                  />
                ) : (
                  <img 
                    src={mediaItems[currentIndex].url}
                    alt={mediaItems[currentIndex].name}
                    className="w-full h-full object-cover"
                    onError={handleMediaError}
                  />
                )}
              </div>
            </div>

            {/* Back Side */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 cursor-pointer"
              onClick={handleBackClick}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-2xl hover:text-blue-300 transition-colors border-2 border-white/50 rounded-xl px-6 py-3">Click to return to Map</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {!isFlipped && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Music Control */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg px-4 py-2">
          <button
            onClick={toggleMusic}
            className="w-8 h-8 flex items-center justify-center bg-white/30 rounded-lg hover:bg-white/40 transition-all duration-300 text-sm"
          >
            {isMusicPlaying ? '⏸️' : '▶️'}
          </button>
          <div className="text-white text-sm">
            <span className="opacity-80">{isMusicPlaying ? 'Playing: ' : 'Paused: '}</span>
            <span>{musicName}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 