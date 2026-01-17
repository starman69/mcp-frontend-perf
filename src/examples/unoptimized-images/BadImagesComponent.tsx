import { useState } from 'react';

export default function BadImagesComponent() {
  const [, setLoaded] = useState<Record<string, boolean>>({});

  // Simulated bad image scenarios
  const images = [
    {
      id: 'oversized',
      title: 'Oversized Image',
      problem: '4000x3000 PNG served for 400x300 display',
      displaySize: '400x300',
      actualSize: '4000x3000',
      fileSize: '8.2 MB',
      // Use a placeholder that simulates a large image
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e74c3c" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="white" text-anchor="middle" dy=".3em" font-size="20"%3E8.2 MB PNG%3C/text%3E%3C/svg%3E',
    },
    {
      id: 'wrong-format',
      title: 'Wrong Format',
      problem: 'Photo saved as PNG instead of JPEG/WebP',
      displaySize: '400x300',
      actualSize: '400x300',
      fileSize: '2.1 MB',
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e67e22" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="white" text-anchor="middle" dy=".3em" font-size="20"%3EPNG instead of WebP%3C/text%3E%3C/svg%3E',
    },
    {
      id: 'no-lazy',
      title: 'No Lazy Loading',
      problem: 'Below-fold image loaded immediately',
      displaySize: '400x300',
      actualSize: '400x300',
      fileSize: '500 KB',
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%239b59b6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="white" text-anchor="middle" dy=".3em" font-size="20"%3ENo loading="lazy"%3C/text%3E%3C/svg%3E',
    },
    {
      id: 'no-dimensions',
      title: 'No Dimensions',
      problem: 'Image without width/height causes CLS',
      displaySize: '???',
      actualSize: '400x300',
      fileSize: '200 KB',
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%233498db" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="white" text-anchor="middle" dy=".3em" font-size="20"%3EMissing width/height%3C/text%3E%3C/svg%3E',
    },
  ];

  const totalSize = images.reduce((sum, img) => sum + parseFloat(img.fileSize), 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        These examples show common image optimization issues. Each anti-pattern
        wastes bandwidth and slows down page load.
      </p>

      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
        <p className="text-red-800 dark:text-red-300">
          <strong>Total image weight:</strong> {totalSize.toFixed(1)} MB
          <span className="text-sm ml-2">(should be ~200 KB with proper optimization)</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-700">
              <h4 className="font-semibold text-red-600 dark:text-red-400">{img.title}</h4>
              <p className="text-xs text-gray-500">{img.problem}</p>
            </div>
            {/* BAD: No lazy loading, no srcset, no dimensions on some */}
            <img
              src={img.src}
              alt={img.title}
              onLoad={() => setLoaded(prev => ({ ...prev, [img.id]: true }))}
              className="w-full"
            />
            <div className="p-2 text-xs bg-gray-50 dark:bg-gray-800 space-y-1">
              <div className="flex justify-between">
                <span>Display:</span>
                <span>{img.displaySize}</span>
              </div>
              <div className="flex justify-between">
                <span>Actual:</span>
                <span>{img.actualSize}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400 font-semibold">
                <span>File size:</span>
                <span>{img.fileSize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use responsive images with srcset, serve WebP/AVIF formats,
          add loading="lazy" for below-fold images, always specify width/height to prevent CLS,
          use image CDN for automatic optimization.
        </p>
      </div>
    </div>
  );
}
