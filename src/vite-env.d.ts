/// <reference types="vite/client" />

// React types
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Project-specific types
export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
} 