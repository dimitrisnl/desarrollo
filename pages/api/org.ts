import type {NextApiRequest, NextApiResponse} from 'next';

import {postOrganization} from '@/b/services/organization-post';
import {createHandlers} from '@/b/utils/create-rest-handlers';

export default function org(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}

const handlers = {
  POST: postOrganization,
};
