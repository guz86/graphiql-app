'use client';
import { useState } from 'react';
import { Header, Header_Height } from '../Header';
import { Footer } from '../Footer';
import { AuthProvider } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';

type LayoutProps = {
  children: React.ReactNode;
  t: Dictionary['auth'];
};

export const Layout = ({ children, t }: LayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState(Header_Height);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Header t={t} setHeaderHeight={setHeaderHeight} />
        <main
          style={{ marginTop: headerHeight }}
          className="flex flex-col items-center justify-between p-12 md:p-24"
        >
          {children}
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};
