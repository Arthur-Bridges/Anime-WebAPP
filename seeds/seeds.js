import sequelize from '../config/connection';
import seedAnime from './anime-seeds';
import seedUsers from './user-seeds';
import seedComments from './comments-seeds';

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('DATABASE SYNCED');

  await seedUsers();
  console.log('USERS SEEDED');

  await seedAnime();
  console.log('ANIME SEEDED');

  await seedComments();
  console.log('COMMENTS SEEDED');

  process.exit(0);
};

seedAll();
