import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { examples } from '../../data/examples';

// Group examples by category for better organization
const categories = [
  { name: 'Initial Load', ids: ['render-blocking', 'large-bundle', 'missing-hints'] },
  { name: 'Core Web Vitals', ids: ['lcp', 'unoptimized-images', 'font-loading', 'cls', 'inp', 'long-tasks'] },
  { name: 'Runtime', ids: ['layout-thrashing', 'animation-jank', 'excessive-rerenders', 'scroll-jank'] },
  { name: 'Network', ids: ['waterfall-requests', 'third-party-scripts'] },
  { name: 'Memory & DOM', ids: ['memory-leaks', 'excessive-dom'] },
  { name: 'React', ids: ['inline-functions', 'useeffect-issues', 'suspense-waterfall', 'hydration-mismatch', 'missing-keys'] },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className="w-56 min-w-56 bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col max-md:w-full max-md:min-w-full max-md:border-r-0 max-md:border-b">
      {/* Mobile: Collapsible header */}
      <button
        className="hidden max-md:flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-950"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span>Browse Anti-Patterns ({examples.length})</span>
        <svg
          className={`w-4 h-4 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop: Always visible, scrollable. Mobile: Collapsible */}
      <nav className={`flex-1 overflow-y-auto py-4 max-md:py-0 ${mobileOpen ? 'max-md:block' : 'max-md:hidden'}`}>
        {categories.map((category) => (
          <div key={category.name} className="mb-4 max-md:mb-0">
            <h3 className="px-5 py-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider max-md:bg-gray-200 max-md:dark:bg-gray-800">
              {category.name}
            </h3>
            <ul className="list-none m-0 p-0">
              {category.ids.map((id) => {
                const example = examples.find((e) => e.id === id);
                if (!example) return null;
                return (
                  <li key={example.id}>
                    <NavLink
                      to={example.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-2.5 px-5 text-gray-600 dark:text-gray-400 no-underline text-sm transition-all border-l-[3px] hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 ${
                          isActive
                            ? 'text-primary bg-primary/10 border-l-primary'
                            : 'border-l-transparent'
                        }`
                      }
                    >
                      {example.shortTitle}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
