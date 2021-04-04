import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {ONBOARDING_PAGE} from '@/f/constants/pages';
import {useCurrentUser} from '@/f/requests/current-user';

export const MembershipRequired: React.FC = ({children}) => {
  const {user} = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.membership) {
      router.push(ONBOARDING_PAGE);
    }
  }, [user, router]);

  return <>{children}</>;
};
