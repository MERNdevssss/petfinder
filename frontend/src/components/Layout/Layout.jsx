import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className='sticky top-0 z-50 bg-white '>
      <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
