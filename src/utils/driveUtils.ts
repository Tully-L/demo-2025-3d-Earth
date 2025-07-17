import { MediaFile } from '../types';

export async function fetchGalleryContents(): Promise<MediaFile[]> {
  // Get all files from the public/gallery directory (img000.jpg to img129.jpg)
  const imageFiles = Array.from({ length: 130 }, (_, i) => {
    const paddedIndex = i.toString().padStart(3, '0');
    const imageUrl = `/gallery/img${paddedIndex}.jpg`;
    
    return {
      id: `img${paddedIndex}`,
      name: `Image ${i + 1}`,
      type: 'image' as const,
      url: imageUrl
    };
  });

  // Add video files (video000.mp4 to video002.mp4)
  const videoFiles = Array.from({ length: 3 }, (_, i) => {
    const paddedIndex = i.toString().padStart(3, '0');
    const videoUrl = `/gallery/video${paddedIndex}.mp4`;
    
    return {
      id: `video${paddedIndex}`,
      name: `Video ${i + 1}`,
      type: 'video' as const,
      url: videoUrl
    };
  });

  // Combine all files
  const allFiles = [...imageFiles, ...videoFiles];
  
  return allFiles;
}

// 获取完整的URL
export function getFullUrl(relativePath: string): string {
  return relativePath;
} 