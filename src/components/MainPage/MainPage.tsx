'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';

type MainPageProps = {
  t: Pick<Dictionary, 'main' | 'auth'>;
};

const MainPage = ({ t }: MainPageProps) => {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-4">
      {isSignedIn && user ? (
        <>
          <p>{t.main.title}</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 mt-8">
            <Link
              href="/rest-client"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              {t.main.links.rest}
            </Link>
            <Link
              href="/graphiql"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              {t.main.links.graphiQL}
            </Link>
            <Link
              href="/history"
              className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
            >
              {t.main.links.history}
            </Link>
          </div>
        </>
      ) : (
        <p>{t.auth.messages.notAuth}</p>
      )}
    </div>
  );
};

export default MainPage;
