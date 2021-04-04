import {useRouter} from 'next/router';
import {useSession} from 'next-auth/client';
import {useEffect} from 'react';
import {useQueryClient} from 'react-query';

import {Spinner} from '@/f/components/spinner';
import {SIGN_IN_PAGE} from '@/f/constants/pages';

export const LoginRequired: React.FC = ({children}) => {
  const queryClient = useQueryClient();
  const [session, isSessionLoading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && !isSessionLoading) {
      queryClient.clear();
      router.push(SIGN_IN_PAGE);
    }
  }, [session, isSessionLoading, router, queryClient]);

  if (isSessionLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen mt-16 pt-16 space-y-4">
        <Spinner />
        <span className="text-sm text-gray-600">Getting things ready..</span>
      </div>
    );
  }

  // prevent any flicker
  if (!session) {
    return null;
  }

  return <>{children}</>;
};
