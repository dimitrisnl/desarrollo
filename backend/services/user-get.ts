import type {NextApiRequest, NextApiResponse} from 'next';

import {dbClient} from '@/b/db/db-client';
import {getSessionOrThrow} from '@/b/utils/get-user-session';

export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {userEmail} = await getSessionOrThrow(req);

    const user = await dbClient.user.findUnique({
      where: {email: userEmail},
      include: {membership: true},
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json({message: error.message});
  }
}
