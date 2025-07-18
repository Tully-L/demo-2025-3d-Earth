import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('No file chosen');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      
      // Create a preview URL for the selected photo
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select a file to upload');
      setFileName('No file chosen');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you! Your message has been sent to ecofairuwc@gmail.com');
      setComment('');
      setPhotoPreview(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        background: 'linear-gradient(to bottom, #1e40af 0%, #1e3a8a 15%, #0891b2 30%, #0ea5e9 45%, #0284c7 60%, #0369a1 75%, #1e40af 90%, #3730a3 100%)'
      }}
    >
      {/* Top Navigation Area */}
      <div className="relative z-50">
        <div className="fixed top-6 left-1/2 -translate-x-1/2 flex space-x-4">
          {/* Home Button (Top Left) */}
          <Link to="/">
            <button className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md hover:bg-white/40 transition-all duration-300 text-white text-base font-medium">
              🌍Home
            </button>
          </Link>
          
          {/* Navigation Buttons (Top Right) */}
          <button className="p-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow-md text-white text-base font-medium">
            About
          </button>
          <Link to="/gallery">
            <button className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md hover:bg-white/40 transition-all duration-300 text-white text-base font-medium">
              Gallery
            </button>
          </Link>
        </div>

        {/* Centered Title */}
        <div className="pt-24 pb-12 text-center">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            Welcome to Green Pulse! 👋
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex justify-center px-6 relative z-10">
        <div className="max-w-4xl w-full">
          {/* Main Content Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-16 shadow-xl">
            <div className="text-white leading-relaxed space-y-8">
              {/* Purpose & Vision Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Purpose & Vision</h2>
                <p className="text-lg opacity-90">
                  Through photos, personal stories, and key locations, we hope to:
                </p>
                <ul className="list-none space-y-4 mt-4 pl-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">✨</span>
                    <span>
                      <strong>Spark curiosity</strong> – Encourage you to go outside and uncover hidden spots on campus or nearby.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">🌿</span>
                    <span>
                      <strong>Promote outdoor & community vibes</strong> – Show how much fun (and accomplishment!) comes from exploring trails—and the memories you'll make along the way.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">🌊</span>
                    <span>
                      <strong>Invite you into nature!</strong> – Not sure where to start? This map's packed with easy-to-find spots. Email me if you want the inside scoop!
                    </span>
                  </li>
                </ul>
              </section>

              {/* What's Inside Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">What's Inside?</h2>
                <ul className="list-none space-y-4 pl-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">📍</span>
                    <span><strong>Interactive Map</strong> – My fav spots with pics + stories to get you exploring.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">📸</span>
                    <span><strong>Photo Gallery</strong> – A visual love letter to Pearson's landscapes. Soak it in!</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-xl">🎵</span>
                    <span><strong>Music & Atmosphere</strong> – Browse through the views, press play, and pretend you're here.</span>
                  </li>
                </ul>
              </section>

              {/* Why "Green Pulse"? Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Why "Green Pulse"?</h2>
                <p className="text-lg opacity-90">
                  Because this place is so alive—the trees, the ocean, the late-night laughter in hallways. 
                  I hope this map helps you find your own rhythm here :D
                </p>
              </section>

              {/* Join the Adventure Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Join the Adventure!</h2>
                <p className="text-lg opacity-90">
                  This project grows with your stories! Email me your photos, favorite spots, or random campus thoughts—let's keep the Green Pulse alive.
                </p>
                <p className="text-lg mt-4 opacity-90 italic">
                  P.S. Seriously, email me! (I'm nice, I promise. ✨)
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Share Your Story!</h3>
              <p className="text-white/90 text-lg">
                <span className="font-medium">ecofairuwc@gmail.com</span>
              </p>
              <p className="text-white/80 mt-2 text-base">
                Send your photos or share your favorite campus spots!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your campus story or favorite spot..."
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 text-lg resize-none h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 text-lg font-medium mb-3">
                  Share a photo:
                </label>
                <div className="relative">
                  <label className="w-full flex items-center px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-white/50 focus-within:border-white/50 cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-white/30 text-white rounded-xl hover:bg-white/40 transition-all duration-300 text-sm font-semibold">
                      Choose File
                    </span>
                    <span className="ml-4 text-white/70">{fileName}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {photoPreview && (
                <div className="mt-4">
                  <p className="text-white mb-2">Selected photo:</p>
                  <div className="relative w-full max-w-xs mx-auto">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-full h-auto rounded-lg border-2 border-white/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-white/25 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg hover:bg-white/35 transition-all duration-300 text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Share Your Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 