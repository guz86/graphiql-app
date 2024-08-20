import React from 'react';
import { Metadata } from 'next';
import Signin from '@/components/Signin';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account.',
  icons: {
    icon: '/favicon.png',
  },
};

const SigninPage: React.FC = () => {
  return <Signin />;
};

export default SigninPage;
