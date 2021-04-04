import type {NextApiRequest, NextApiResponse} from 'next';

import {getUser} from '@/b/services/user-get';
import {createHandlers} from '@/b/utils/create-rest-handlers';

export default function me(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}

const handlers = {
  GET: getUser,
};
