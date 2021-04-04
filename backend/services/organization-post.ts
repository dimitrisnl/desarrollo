import {Org} from '@prisma/client';
import Joi from 'joi';
import type {NextApiRequest, NextApiResponse} from 'next';

import {OWNER} from '@/b/constants/roles';
import {dbClient} from '@/b/db/db-client';
import {getSessionOrThrow} from '@/b/utils/get-user-session';
import {validateSchema} from '@/b/utils/validate-schema';

const schema = Joi.object({
  orgName: Joi.string().min(2).max(100).trim().required(),
});

export async function postOrganization(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Org | undefined> {
  try {
    const {userEmail} = await getSessionOrThrow(req);
    const data = validateSchema<{orgName: string}>(schema, req.body);

    const user = await dbClient.user.findUnique({
      where: {email: userEmail},
      include: {membership: true},
    });

    if (!user) {
      res.status(401).json({message: 'User not found'});
      return;
    }

    if (user.membership) {
      res.status(400).json({message: 'User already has a membership'});
      return;
    }

    const org = await dbClient.org.create({
      data: {
        name: data.orgName,
        memberships: {
          create: {
            role: {connect: {name: OWNER}},
            user: {connect: {email: userEmail}},
          },
        },
      },
    });

    if (org) {
      res.json(org);
    } else {
      res.status(422).json({message: 'Something went wrong'});
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({message: error.message});
  }
}
