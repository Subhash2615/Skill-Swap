import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className={`container-custom py-8 ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 