import {NextApiHandler} from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import {dbClient} from '@/b/db/db-client';
import {sendMagicLink} from '@/b/utils/send-magic-link';
import {
  LOGIN_ERROR_PAGE,
  ONBOARDING_PAGE,
  SIGN_IN_PAGE,
  VERIFY_REQUEST_PAGE,
} from '@/f/constants/pages';

declare let process: {
  env: {
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    SECRET: string;
  };
};

const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: sendMagicLink,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({prisma: dbClient}),
  secret: process.env.SECRET,
  pages: {
    signIn: SIGN_IN_PAGE,
    error: LOGIN_ERROR_PAGE,
    verifyRequest: VERIFY_REQUEST_PAGE,
    newUser: ONBOARDING_PAGE,
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
