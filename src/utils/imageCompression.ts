/**
 * Image Compression Utility for Tribe Africa E-commerce
 * Optimized for African fashion product images and gallery displays
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
  maxSizeKB?: number;
  enableProgressive?: boolean;
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  format: string;
}

/**
 * Compression presets optimized for Tribe Africa use cases
 */
export const COMPRESSION_PRESETS = {
  // Product images - high quality for detailed fabric textures
  PRODUCT: {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.85,
    format: 'webp' as const,
    maxSizeKB: 400,
    enableProgressive: true
  },
  // Gallery/collection images - medium quality for browsing
  GALLERY: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 0.80,
    format: 'webp' as const,
    maxSizeKB: 250,
    enableProgressive: true
  },
  // Thumbnails - smaller size for product grids
  THUMBNAIL: {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.75,
    format: 'webp' as const,
    maxSizeKB: 80,
    enableProgressive: false
  },
  // Hero/banner images - larger but optimized
  HERO: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.80,
    format: 'webp' as const,
    maxSizeKB: 600,
    enableProgressive: true
  },
  // Logo and branding - maintain quality
  LOGO: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.90,
    format: 'png' as const,
    maxSizeKB: 150,
    enableProgressive: false
  }
};

/**
 * Check if browser supports WebP format
 */
function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Convert image to canvas with proper scaling
 */
function imageToCanvas(file: File, maxWidth: number, maxHeight: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Use high-quality rendering for fabric textures
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Draw image with anti-aliasing
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert canvas to blob with specified format and quality
 */
function canvasToBlob(canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to blob'));
      }
    }, `image/${format}`, quality);
  });
}

/**
 * Smart compression with quality adjustment for optimal file size
 */
async function compressWithQualityAdjustment(
  file: File,
  options: CompressionOptions
): Promise<File> {
  const { maxWidth = 1200, maxHeight = 1200, maxSizeKB = 400, format = 'webp' } = options;
  let { quality = 0.8 } = options;
  
  const canvas = await imageToCanvas(file, maxWidth, maxHeight);
  
  // First pass with specified quality
  let blob = await canvasToBlob(canvas, format, quality);
  
  // Adjust quality if file is still too large
  let attempts = 0;
  const maxAttempts = 3;
  const targetSizeBytes = maxSizeKB * 1024;
  
  while (blob.size > targetSizeBytes && quality > 0.4 && attempts < maxAttempts) {
    quality = Math.max(0.4, quality - 0.1);
    blob = await canvasToBlob(canvas, format, quality);
    attempts++;
  }
  
  // Create new file with compressed data
  const fileName = file.name.replace(/\.[^/.]+$/, `.${format}`);
  return new File([blob], fileName, { type: `image/${format}` });
}

/**
 * Select optimal format based on browser support and image type
 */
async function selectOptimalFormat(file: File): Promise<'jpeg' | 'webp' | 'png'> {
  const supportsWebPFormat = await supportsWebP();
  
  // Prefer WebP for better compression
  if (supportsWebPFormat) {
    return 'webp';
  }
  
  // Fallback based on original format
  const originalFormat = file.type.split('/')[1].toLowerCase();
  
  if (originalFormat === 'png' || originalFormat === 'gif') {
    return 'png'; // Preserve transparency
  }
  
  return 'jpeg'; // Best for photos
}

/**
 * Main compression function
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const originalSize = file.size;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }
  
  // Select optimal format if not specified
  if (!options.format) {
    options.format = await selectOptimalFormat(file);
  }
  
  // Apply compression
  const compressedFile = await compressWithQualityAdjustment(file, options);
  
  const compressionRatio = originalSize > 0 ? (originalSize - compressedFile.size) / originalSize : 0;
  
  return {
    file: compressedFile,
    originalSize,
    compressedSize: compressedFile.size,
    compressionRatio,
    format: options.format
  };
}

/**
 * Batch compress multiple images
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = {}
): Promise<CompressionResult[]> {
  const results: CompressionResult[] = [];
  
  for (const file of files) {
    try {
      const result = await compressImage(file, options);
      results.push(result);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      // Return original file if compression fails
      results.push({
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 0,
        format: file.type.split('/')[1] || 'unknown'
      });
    }
  }
  
  return results;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get compression stats for display
 */
export function getCompressionStats(result: CompressionResult): string {
  const savedBytes = result.originalSize - result.compressedSize;
  const savedPercentage = Math.round(result.compressionRatio * 100);
  
  return `Saved ${formatFileSize(savedBytes)} (${savedPercentage}%)`;
}

/**
 * Quick compression using preset
 */
export async function compressWithPreset(
  file: File,
  preset: keyof typeof COMPRESSION_PRESETS
): Promise<CompressionResult> {
  return compressImage(file, COMPRESSION_PRESETS[preset]);
} 