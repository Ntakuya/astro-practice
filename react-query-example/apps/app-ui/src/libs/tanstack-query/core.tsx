import {
  QueryClient,
  QueryClientProvider as QueryClientCoreProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';
import { queryCache } from './query-cache';

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: false,
    },
  },
});

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientCoreProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientCoreProvider>
  );
};
