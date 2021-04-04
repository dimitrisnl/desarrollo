// https://github.com/nextauthjs/next-auth/blob/d81ff98f3b7f500a2ea4279b43f0e9d38fee8639/src/server/pages/error.js

export const verificationErrors = {
  default: {
    title: 'Something went wrong',
    body: "We're taking a look at it.",
  },
  configuration: {
    title: 'Something went wrong',
    body: "We're taking a look at it.",
  },
  accessdenied: {
    title: 'Unauthorized',
    body: 'You do not have permission to sign in.',
  },
  verification: {
    title: 'The sign in link is no longer valid',
    body: 'It may have been used already or it may have expired.',
  },
} as const;
