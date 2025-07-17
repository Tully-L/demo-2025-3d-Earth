/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Project-specific types
export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
} 