import { useEffect, useState, useRef } from 'react';

export default function BadLCPComponent() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lcpTime, setLcpTime] = useState(0);
  const [imageLoadStart, setImageLoadStart] = useState(0);
  const mountTimeRef = useRef(performance.now());

  // Large image URL that will be slow to load (3MB+ image)
  // Using a high-resolution image that takes time to download
  const slowImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=4000&q=100';

  useEffect(() => {
    mountTimeRef.current = performance.now();

    // Simulate additional delay before even starting to load the image
    // This represents chained API calls that must complete first
    const chainedDelays = setTimeout(() => {
      setImageLoadStart(performance.now());
    }, 2000); // 2 second delay before image even starts loading

    return () => clearTimeout(chainedDelays);
  }, []);

  const handleImageLoad = () => {
    const loadTime = performance.now() - mountTimeRef.current;
    setLcpTime(Math.round(loadTime));
    setImageLoaded(true);
  };

  const getLCPRating = (time: number) => {
    if (time <= 2500) return { label: 'Good', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' };
    if (time <= 4000) return { label: 'Needs Improvement', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' };
    return { label: 'Poor', color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' };
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This demo shows a delayed hero image - the LCP element. The image loading is delayed
        by 2 seconds of simulated API calls, then loads a large 4K image. Reload to see the full effect.
      </p>

      <div className="flex gap-3 items-center flex-wrap">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Reload to Test LCP
        </button>
        {lcpTime > 0 && (
          <span className={`font-mono text-sm px-2 py-1 rounded ${getLCPRating(lcpTime).color}`}>
            LCP: {(lcpTime / 1000).toFixed(2)}s ({getLCPRating(lcpTime).label})
          </span>
        )}
      </div>

      {/* Delay visualization */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-3 text-sm">LCP Delay Chain</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${imageLoadStart > 0 ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
            <span>API chain delay (2s)</span>
            <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded">
              blocks image load
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${imageLoaded ? 'bg-green-500' : imageLoadStart > 0 ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`} />
            <span>Hero image download (4K, ~1-3s)</span>
            <span className="text-xs px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded">
              network dependent
            </span>
          </div>
        </div>
      </div>

      {/* Hero image - this is the LCP element */}
      <div className="relative rounded-lg overflow-hidden" style={{ height: '350px' }}>
        {imageLoadStart > 0 && (
          <img
            src={slowImageUrl}
            alt="Hero mountain landscape"
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ height: '350px' }}
          />
        )}

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm">
                {imageLoadStart === 0 ? 'Waiting for API chain...' : 'Loading hero image...'}
              </p>
            </div>
          </div>
        )}

        {imageLoaded && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-semibold">Hero Image (LCP Element)</p>
            <p className="text-white/80 text-sm">Loaded in {(lcpTime / 1000).toFixed(1)}s</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded text-sm space-y-2">
        <p className="text-red-800 dark:text-red-300">
          <strong>Problems demonstrated:</strong>
        </p>
        <ul className="list-disc list-inside text-red-700 dark:text-red-400 space-y-1">
          <li>Chained API calls delay image load start by 2+ seconds</li>
          <li>Large unoptimized image (4K resolution) takes time to download</li>
          <li>No preloading or resource hints for the hero image</li>
          <li>Image is not in the initial HTML (loaded via JavaScript)</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm space-y-2">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 space-y-1">
          <li>Use <code>&lt;link rel="preload"&gt;</code> for hero image</li>
          <li>Optimize image size and use modern formats (WebP, AVIF)</li>
          <li>Inline critical image or use SSR</li>
          <li>Parallelize API calls instead of chaining</li>
          <li>Use responsive images with srcset</li>
        </ul>
      </div>
    </div>
  );
}
