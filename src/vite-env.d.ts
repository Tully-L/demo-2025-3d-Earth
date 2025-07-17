/// <reference types="vite/client" />

// React types
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Global React namespace
declare namespace React {
  interface ChangeEvent<T = Element> {
    target: T;
  }
  
  interface MouseEvent<T = Element> {
    target: T;
  }
  
  interface SyntheticEvent<T = Element> {
    target: T;
  }
}

// Project-specific types
export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
}

// Module declarations for better compatibility
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react-dom/client' {
  import * as ReactDOM from 'react-dom/client';
  export = ReactDOM;
  export as namespace ReactDOM;
}

declare module 'react-router-dom' {
  import * as ReactRouterDOM from 'react-router-dom';
  export = ReactRouterDOM;
  export as namespace ReactRouterDOM;
}

declare module '@react-three/fiber' {
  import * as ReactThreeFiber from '@react-three/fiber';
  export = ReactThreeFiber;
  export as namespace ReactThreeFiber;
}

declare module '@react-three/drei' {
  import * as ReactThreeDrei from '@react-three/drei';
  export = ReactThreeDrei;
  export as namespace ReactThreeDrei;
}

declare module 'three' {
  import * as THREE from 'three';
  export = THREE;
  export as namespace THREE;
}

declare module 'framer-motion' {
  import * as FramerMotion from 'framer-motion';
  export = FramerMotion;
  export as namespace FramerMotion;
}

declare module 'lucide-react' {
  import * as LucideReact from 'lucide-react';
  export = LucideReact;
  export as namespace LucideReact;
}

declare module 'leaflet' {
  import * as Leaflet from 'leaflet';
  export = Leaflet;
  export as namespace Leaflet;
}

declare module 'react-leaflet' {
  import * as ReactLeaflet from 'react-leaflet';
  export = ReactLeaflet;
  export as namespace ReactLeaflet;
}

declare module '@googlemaps/react-wrapper' {
  import * as GoogleMapsReactWrapper from '@googlemaps/react-wrapper';
  export = GoogleMapsReactWrapper;
  export as namespace GoogleMapsReactWrapper;
} 