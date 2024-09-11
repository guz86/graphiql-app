'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/Button/Button';
import Loader from '@/components/Loader/Loader';
import { Dictionary } from '@/utils/translation/getDictionary';

interface SdlFetcherProps {
  sdlUrl: string;
  headers: Record<string, string>;
  onSdlDataFetch: (data: string) => void;
  onError: (message: string) => void;
  t: Dictionary['graphiql'];
}

const SdlFetcher: React.FC<SdlFetcherProps> = ({
  sdlUrl,
  headers,
  onSdlDataFetch,
  t,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchSdlData = async () => {
    setLoading(true);
    try {
      const response = await fetch(sdlUrl, {
        method: 'GET',
        headers: headers as HeadersInit,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch SDL data');
      }

      const sdlText = await response.text();
      onSdlDataFetch(sdlText);
    } catch (error) {
      toast.error(t.errorMessages.fetchSDL);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <Button onClick={fetchSdlData}>{t.requestSdl}</Button>
    </div>
  );
};

export default SdlFetcher;
