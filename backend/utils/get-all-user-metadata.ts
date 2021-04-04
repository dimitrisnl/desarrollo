import {Membership, Org, User} from '@prisma/client';

import {dbClient} from '@/b/db/db-client';

type UserPersonalData = User & {
  membership: Membership & {
    org: Org;
  };
};

export async function getUserMetadata(
  email: string
): Promise<UserPersonalData> {
  const user = await dbClient.user.findUnique({
    where: {email},
    include: {membership: {include: {org: true}}},
  });

  if (!user) {
    throw new Error('No user found');
  }

  if (!user.membership) {
    throw new Error('No membership found');
  }

  if (!user.membership.org) {
    throw new Error('No org found');
  }

  return user as UserPersonalData;
}
