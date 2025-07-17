import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Define types for map locations
interface MapLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string; // Social club images from campus
  story: string;
  type: 'activity' | 'landmark' | 'building';
}

// Real Pearson College UWC campus social club locations with associated images
const pearsonCampusLocations: MapLocation[] = [
  {
    id: 'dining-hall-pie',
    name: 'Dining Hall Pie Club',
    coordinates: { lat: 48.3523, lng: -123.5240 },
    description: 'Community Pie Sharing Event',
    image: '/test/A convenient sunset, Miti.jpg',
    story: 'Weekly community gathering in the main dining hall where students share homemade pies and discuss sustainability practices. A sweet tradition that brings our diverse international campus together.',
    type: 'activity'
  },
  {
    id: 'marine-biology-center',
    name: 'Marine Biology Center',
    coordinates: { lat: 48.3518, lng: -123.5235 },
    description: 'Pearson College Marine Research Center',
    image: '/test/Porphyra Linearis_AI.jpg',
    story: 'State-of-the-art facility for marine biology and environmental research. Students conduct field studies on local Pacific Northwest ecosystems and marine conservation.',
    type: 'building'
  },
  {
    id: 'coastal-studies-lab',
    name: 'Coastal Studies Lab',
    coordinates: { lat: 48.3515, lng: -123.5250 },
    description: 'Coastal Ecology Laboratory',
    image: '/test/Sound and vision_Alessandro_Carboni_Alaska-impression.jpg',
    story: 'Hands-on research station where students study the Strait of Juan de Fuca tidal pools, marine life, and coastal erosion patterns affecting southern Vancouver Island.',
    type: 'landmark'
  },
  {
    id: 'forest-campus-trail',
    name: 'Campus Forest Trail',
    coordinates: { lat: 48.3530, lng: -123.5245 },
    description: 'Sustainable Forest Education Trail',
    image: '/test/JosePereyraLucena.jpeg',
    story: 'Interactive hiking trail through the campus forest showcasing old-growth Douglas Fir conservation and Coast Salish indigenous land management practices.',
    type: 'landmark'
  }
];

export default function Map() {
  const { campus } = useParams<{ campus: string }>();
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapMode, setMapMode] = useState<'satellite' | 'roadmap' | 'terrain'>('roadmap');
  const [showLocations, setShowLocations] = useState(true);
  const isPearsonCampus = campus === 'pearson';

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    // Auto zoom to location
    setZoomLevel(1.5);
  };

  const closeLocationDetail = () => {
    setSelectedLocation(null);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5));
  };

  const toggleMapMode = () => {
    const modes: ('satellite' | 'roadmap' | 'terrain')[] = ['roadmap', 'satellite', 'terrain'];
    const currentIndex = modes.indexOf(mapMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMapMode(modes[nextIndex]);
  };

  const getMapBackground = () => {
    switch (mapMode) {
      case 'satellite':
        return 'linear-gradient(135deg, #2d5016 0%, #3e6b1f 25%, #4a7c23 50%, #2d5016 75%, #1a3209 100%)';
      case 'terrain':
        return 'linear-gradient(135deg, #8b7355 0%, #a68b5b 25%, #c4a484 50%, #8b7355 75%, #6b5b47 100%)';
      default: // roadmap
        return 'linear-gradient(to bottom, #e8f4fd 0%, #b8e6ff 25%, #87ceeb 50%, #4682b4 75%, #2e8b57 100%)';
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        background: getMapBackground()
      }}
    >
      {/* Earth Globe Thumbnail - Top Left */}
      <div className="fixed top-6 left-6 z-[9999]">
        <Link to="/">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-500 relative overflow-hidden">
              <div className="absolute top-1 left-1 w-2 h-2 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute bottom-1 right-1 w-3 h-1 bg-blue-600 rounded opacity-60"></div>
              <div className="absolute top-3 right-2 w-1 h-1 bg-green-700 rounded-full"></div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation - Top Right */}
      <div className="fixed top-6 right-6 flex space-x-4 z-[9999]">
        <Link to="/about">
          <button className="px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 text-gray-700 text-lg font-medium">
            About
          </button>
        </Link>
        <Link to="/gallery">
          <button className="px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:bg-white/30 transition-all duration-300 text-gray-700 text-lg font-medium">
            Gallery
          </button>
        </Link>
      </div>

      {/* Map Info Panel - Only show for non-Google Maps view */}
      {!isPearsonCampus && (
        <div className="fixed bottom-6 left-6 z-[9999]">
          <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 max-w-xs">
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Map Mode:</span>
                <span className="capitalize text-blue-600 font-medium">{mapMode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Zoom:</span>
                <span className="text-blue-600 font-medium">{Math.round(zoomLevel * 100)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Locations:</span>
                <span className="text-blue-600 font-medium">{showLocations ? 'Visible' : 'Hidden'}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-500">🏫 Real Campus Map • Social Club Locations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Controls - Only show for non-Google Maps view */}
      {!isPearsonCampus && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <div className="flex flex-col space-y-3">
            {/* Zoom Controls */}
            <div className="flex flex-col space-y-1 bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={zoomIn}
                className="w-12 h-12 bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center text-gray-700 text-xl font-bold border-b border-gray-200"
              >
                +
              </button>
              <button
                onClick={zoomOut}
                className="w-12 h-12 bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center text-gray-700 text-xl font-bold"
              >
                −
              </button>
            </div>
            
            {/* Map Mode Toggle */}
            <button
              onClick={toggleMapMode}
              className="w-12 h-12 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center text-gray-700 text-sm font-medium"
              title={`Switch to ${mapMode === 'roadmap' ? 'satellite' : mapMode === 'satellite' ? 'terrain' : 'roadmap'} view`}
            >
              {mapMode === 'roadmap' && '🗺️'}
              {mapMode === 'satellite' && '🛰️'}
              {mapMode === 'terrain' && '⛰️'}
            </button>
            
            {/* Toggle Locations */}
            <button
              onClick={() => setShowLocations(!showLocations)}
              className={`w-12 h-12 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center text-sm font-medium ${
                showLocations ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Toggle location markers"
            >
              📍
            </button>
          </div>
        </div>
      )}

      {/* Main Map Area */}
      <div className="flex-grow flex items-center justify-center relative overflow-hidden">
        {isPearsonCampus ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-[80vh] max-w-6xl rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1kaZ702EFoVPBuG5UdV1cZUO8Igv379o&ehbc=2E312F" 
                width="100%" 
                height="100%"
                className="absolute inset-0"
                title="Pearson College UWC Campus Map"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              
              {/* Campus Title Overlay */}
             
            </div>
          </div>
        ) : (
          <div 
            className="relative w-full h-full max-w-6xl max-h-[80vh] transition-transform duration-500"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Pearson College Campus Map Container */}
            <div className="relative w-full h-full rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden">
              
              {/* Real Pearson College UWC Campus Map */}
              <div className="absolute inset-0 z-50">
                {/* Base Campus Image */}
                <div className="absolute inset-0 z-50">
                  <img 
                    src="/Pearson_College/UWC.jpg" 
                    alt="Pearson College UWC Campus"
                    className="w-full h-full object-cover z-50"
                    onError={(e) => {
                      console.log('Image failed to load:', e.currentTarget.src);
                      console.log('Trying alternative image...');
                      e.currentTarget.src = '/Pearson_College/UWC1.jpg';
                    }}
                    onLoad={() => {
                      console.log('Campus image loaded successfully');
                    }}
                  />
                  
                  {/* Fallback background if image fails */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-emerald-100 -z-10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-4">🏫</div>
                        <p className="text-lg font-medium">Campus Map Loading...</p>
                      </div>
                    </div>
                  </div>
                
                {/* Map mode overlays */}
                {mapMode === 'roadmap' && (
                  <div className="absolute inset-0 bg-blue-500/5 z-10">
                    {/* Roadmap grid overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-10">
                      <defs>
                        <pattern id="roadGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ffffff" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#roadGrid)" />
                    </svg>
                  </div>
                )}
                
                {mapMode === 'satellite' && (
                  <div className="absolute inset-0 bg-green-600/5 z-10">
                    {/* Satellite enhancement overlay */}
                    <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-green-300/10 to-blue-300/10"></div>
                  </div>
                )}
                
                {mapMode === 'terrain' && (
                  <div className="absolute inset-0 bg-yellow-600/5 z-10">
                    {/* Terrain contour overlay */}
                    <svg className="absolute inset-0 w-full h-full opacity-15">
                      <defs>
                        <pattern id="terrainContour" width="80" height="80" patternUnits="userSpaceOnUse">
                          <circle cx="40" cy="40" r="35" fill="none" stroke="#8b7355" strokeWidth="1"/>
                          <circle cx="40" cy="40" r="20" fill="none" stroke="#8b7355" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#terrainContour)" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Campus Title Overlay */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
                <h2 className="text-3xl font-bold text-white bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-white/20">
                  Pearson College UWC Campus
                </h2>
              </div>

              {/* Debug Image Display - Temporary */}
              <div className="absolute top-20 right-4 w-32 h-24 bg-white/90 rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 z-40">
                <img 
                  src="/Pearson_College/UWC.jpg" 
                  alt="Debug Campus View"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Debug image failed:', e.currentTarget.src);
                  }}
                  onLoad={() => {
                    console.log('Debug image loaded');
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                  Campus Test
                </div>
              </div>

              {/* Social Club Location Markers on Campus */}
              {showLocations && pearsonCampusLocations.map((location, index) => {
                // Position markers based on campus layout
                const positions = [
                  { left: '25%', top: '30%' }, // Pie location - dining area
                  { left: '60%', top: '45%' }, // Nature Center - academic building
                  { left: '40%', top: '65%' }, // Coastal Lab - near waterfront
                  { left: '70%', top: '25%' }  // Forest Trail - outdoor area
                ];
                const position = positions[index] || { left: '50%', top: '50%' };
                
                return (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    style={{
                      left: position.left,
                      top: position.top,
                      zIndex: selectedLocation?.id === location.id ? 100 : 50
                    }}
                    onClick={() => handleLocationClick(location)}
                  >
                  {/* Red Marker Box with Google Maps style */}
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                      selectedLocation?.id === location.id 
                        ? 'bg-blue-500 border-3 border-white scale-125' 
                        : 'bg-red-500 border-2 border-white group-hover:bg-red-600 group-hover:scale-110'
                    }`}>
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-current rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Location Label */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-700">{location.name}</span>
                    </div>

                    {/* Red area highlight for selected location */}
                    {selectedLocation?.id === location.id && (
                      <div className="absolute -top-8 -left-8 w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Location Detail Modal with Social Club Images - Only for custom map */}
      {!isPearsonCampus && selectedLocation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Image Header */}
            {selectedLocation.image && (
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={selectedLocation.image} 
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-8 text-white">
                  <h3 className="text-4xl font-bold drop-shadow-lg mb-2">{selectedLocation.name}</h3>
                  <p className="text-xl opacity-90 drop-shadow-md">{selectedLocation.description}</p>
                </div>
                <button
                  onClick={closeLocationDetail}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8">              
              <div className="space-y-6">
                {/* Location Info */}
                <div className="flex justify-between items-center">
                  <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-full font-medium capitalize text-sm">
                    {selectedLocation.type}
                  </span>
                  <span className="font-mono text-sm text-gray-500">
                    📍 {selectedLocation.coordinates.lat.toFixed(4)}°N, {Math.abs(selectedLocation.coordinates.lng).toFixed(4)}°W
                  </span>
                </div>
                
                {/* Story Section */}
                <div className="bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                    <span className="mr-2">📖</span>
                    Campus Social Club Story
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">{selectedLocation.story}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="mr-2">🔍</span>
                    Click other red markers to explore more social clubs
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setZoomLevel(2)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300 text-sm font-medium"
                    >
                      Zoom to Location
                    </button>
                    <button
                      onClick={closeLocationDetail}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 