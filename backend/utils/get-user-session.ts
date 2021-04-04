import type {NextApiRequest} from 'next';
import {getSession} from 'next-auth/client';

type GetSessionOrThrowProps = {userEmail: string};

export async function getSessionOrThrow(
  req: NextApiRequest
): Promise<GetSessionOrThrowProps> {
  const session = await getSession({req});
  const userEmail = session?.user?.email;

  // Throw if invalid
  if (!userEmail) {
    throw new Error('Not authenticated');
  }

  return {userEmail};
}
