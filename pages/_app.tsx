import '@/f/styles/global.css';

import {AppProps} from 'next/app';
import {Provider} from 'next-auth/client';
import NextNprogress from 'nextjs-progressbar';
import {Toaster} from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from 'react-query';

const authOptions = {keepAlive: 0, clientMaxAge: 60};
const queryClient = new QueryClient();

function App({Component, pageProps}: AppProps): React.ReactNode {
  return (
    <>
      <NextNprogress
        color="#226ED3"
        height={4}
        options={{showSpinner: false}}
      />
      <QueryClientProvider client={queryClient}>
        <Provider session={pageProps.session} options={authOptions}>
          <Component {...pageProps} />
        </Provider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
