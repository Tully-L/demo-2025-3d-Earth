import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCampuses, CampusLocation } from '../data/locations';

interface CampusSelectorProps {
  onCampusSelect?: (campus: CampusLocation) => void;
  className?: string;
}

export default function CampusSelector({ onCampusSelect, className = '' }: CampusSelectorProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const campuses = getAllCampuses();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Add Pearson College UWC to the options
  const allOptions = [
    { id: 'pearson', name: 'Pearson College UWC', nameEn: 'Pearson College UWC' },
    ...campuses
  ];

  // Filter options based on search term
  const filteredOptions = allOptions.filter(option =>
    option.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleSelect = (option: any) => {
    setSearchTerm(option.nameEn);
    setIsOpen(false);
    
    // Navigate to map page for Pearson College UWC
    if (option.id === 'pearson') {
      navigate('/map/pearson');
      return;
    }
    
    if (onCampusSelect) {
      // Create a CampusLocation object for the callback
      const campusData: CampusLocation = {
        id: option.id,
        name: option.name,
        nameEn: option.nameEn,
        coordinates: option.coordinates || [0, 0],
        description: option.description || ''
      };
      onCampusSelect(campusData);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on options
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Choose your campus..."
          className="w-96 px-6 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 text-lg transition-all duration-300"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Dropdown options */}
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 z-50 overflow-hidden max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className="w-full px-6 py-4 text-left hover:bg-white/50 transition-colors duration-200 border-b border-white/20 last:border-b-0 text-gray-800"
            >
              <div className="flex flex-col">
                <span className="text-base font-medium">{option.nameEn}</span>
                {option.name !== option.nameEn && (
                  <span className="text-sm text-gray-600 mt-1">{option.name}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Show "No results" when search returns empty */}
      {isOpen && searchTerm && filteredOptions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 z-50 overflow-hidden">
          <div className="px-6 py-4 text-gray-600 text-center">
            No campuses found matching "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
} 