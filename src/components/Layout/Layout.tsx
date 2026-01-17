import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />
      <div className="flex flex-1 max-md:flex-col">
        <Sidebar />
        <main className="flex-1 p-8 max-md:p-4 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
