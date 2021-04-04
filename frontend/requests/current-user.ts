import {Prisma} from '@prisma/client';
import {useQuery} from 'react-query';

import {client} from '@/f/utils/api-client';
import {getCancelToken} from '@/f/utils/cancel-token';

export const CURRENT_USER_ENDPOINT = `/me`;
export const CURRENT_USER_KEY = 'current-user';

type UserPersonalData = Prisma.UserGetPayload<{
  include: {membership: true};
}>;

type useUserProps = {
  user?: UserPersonalData | null;
  isLoading: boolean;
};

export const getCurrentUser = (): Promise<UserPersonalData> => {
  return client.request({
    method: 'GET',
    url: CURRENT_USER_ENDPOINT,
    cancelToken: getCancelToken('getCurrentUser'),
  });
};

export function useCurrentUser(): useUserProps {
  const {data, isLoading} = useQuery<UserPersonalData>({
    queryKey: CURRENT_USER_KEY,
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return {user: data, isLoading};
}
