import React from 'react';
import Header from './Header';
import Footer from './Footer';
import StickyChatButton from '@/components/StickyChatButton';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
      <StickyChatButton />
    </div>
  );
};

export default Layout;