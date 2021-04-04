import type {NextApiRequest, NextApiResponse} from 'next';

type Handlers = {
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
  PATCH?: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
};

export function createHandlers(handlers: Handlers) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method && req.method in handlers) {
      const handler = handlers[req.method];

      try {
        await handler(req, res);
      } catch (err) {
        res.status(err.status || 500).end(err.message);
      }
    } else {
      res.setHeader('Allow', Object.keys(handlers));
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
}
