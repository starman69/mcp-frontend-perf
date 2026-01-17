import { useState } from 'react';

export default function BadCLSComponent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showAd1, setShowAd1] = useState(false);
  const [showAd2, setShowAd2] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [clsScore, setClsScore] = useState(0);

  const resetDemo = () => {
    setShowBanner(false);
    setShowAd1(false);
    setShowAd2(false);
    setShowImage(false);
    setShowPopup(false);
    setClsScore(0);
  };

  const triggerShifts = () => {
    resetDemo();
    setIsRunning(true);

    // Stagger the layout shifts to create multiple shift events
    setTimeout(() => {
      setShowBanner(true);
      setClsScore(prev => prev + 0.08);
    }, 500);

    setTimeout(() => {
      setShowAd1(true);
      setClsScore(prev => prev + 0.12);
    }, 1000);

    setTimeout(() => {
      setShowImage(true);
      setClsScore(prev => prev + 0.15);
    }, 1500);

    setTimeout(() => {
      setShowAd2(true);
      setClsScore(prev => prev + 0.10);
    }, 2000);

    setTimeout(() => {
      setShowPopup(true);
      setClsScore(prev => prev + 0.05);
      setIsRunning(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to trigger multiple layout shifts. Watch how content jumps around
        as elements inject without reserved space.
      </p>

      <div className="flex gap-3 items-center">
        <button
          onClick={triggerShifts}
          disabled={isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {isRunning ? 'Shifting content...' : 'Trigger Layout Shifts'}
        </button>
        <button
          onClick={resetDemo}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        {clsScore > 0 && (
          <span className={`font-mono text-sm px-2 py-1 rounded ${
            clsScore > 0.25 ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' :
            clsScore > 0.1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
            'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
          }`}>
            CLS: ~{clsScore.toFixed(2)}
          </span>
        )}
      </div>

      {/* Cookie banner - injects at top, pushes everything down */}
      {showBanner && (
        <div className="bg-gray-900 text-white p-4 rounded-lg" style={{ minHeight: '80px' }}>
          <p className="font-semibold">Cookie Consent Banner</p>
          <p className="text-sm text-gray-300">This banner appeared without reserved space, shifting all content below!</p>
        </div>
      )}

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <h3 className="font-semibold mb-2">Article: How Layout Shifts Hurt UX</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Users trying to read this content will be frustrated when it keeps jumping around.
          This commonly happens with late-loading ads, images without dimensions, and dynamic content injection.
        </p>
      </div>

      {/* First ad injection - tall ad pushes content */}
      {showAd1 && (
        <div
          className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 rounded flex items-center justify-center"
          style={{ height: '150px' }}
        >
          <div className="text-center">
            <span className="text-yellow-800 dark:text-yellow-200 font-bold text-lg">ADVERTISEMENT</span>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">Injected after 1s - 150px tall</p>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This paragraph demonstrates content that gets pushed down multiple times
          as various elements load above it without any space reservation.
        </p>
      </div>

      {/* Image without dimensions - large shift */}
      {showImage && (
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white"
          style={{ height: '200px' }}
        >
          <div className="text-center">
            <p className="font-bold text-lg">Hero Image</p>
            <p className="text-sm opacity-80">Loaded without width/height attributes - 200px shift!</p>
          </div>
        </div>
      )}

      {/* Second ad - inline ad */}
      {showAd2 && (
        <div
          className="bg-orange-100 dark:bg-orange-900 border-2 border-orange-400 rounded flex items-center justify-center"
          style={{ height: '120px' }}
        >
          <div className="text-center">
            <span className="text-orange-800 dark:text-orange-200 font-bold">SPONSORED CONTENT</span>
            <p className="text-orange-700 dark:text-orange-300 text-sm">Another late-loading ad - 120px</p>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <h4 className="font-semibold mb-2">More Article Content</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          By now, this content has shifted multiple times. The cumulative effect creates
          a terrible user experience, especially on mobile devices.
        </p>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Final paragraph that has been pushed down by: cookie banner (80px),
          first ad (150px), hero image (200px), and sponsored content (120px).
          Total shift: ~550px!
        </p>
      </div>

      {/* Floating popup - shifts viewport */}
      {showPopup && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
          <p className="font-semibold">Newsletter Popup!</p>
          <p className="text-sm opacity-90">This popup can also contribute to layout shift scores.</p>
        </div>
      )}
    </div>
  );
}
