import {ADMIN, OWNER, READ_ONLY} from '../backend/constants/roles';
import {dbClient} from '../backend/db/db-client';

const main = async () => {
  await dbClient.role.create({data: {name: OWNER}});
  await dbClient.role.create({data: {name: ADMIN}});
  await dbClient.role.create({data: {name: READ_ONLY}});
};

main()
  .then(async () => {
    console.log('finished');
    await dbClient.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
