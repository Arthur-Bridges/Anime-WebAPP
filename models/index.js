import Anime from './anime.js';
import Comments from './comments.js';
import User from './user.js';

// Define relationships
Anime.hasMany(Comments, {
  foreignKey: 'anime_id',
});

Comments.belongsTo(Anime, {
  foreignKey: 'anime_id',
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
});

// Favoriting anime work in the future
User.belongsToMany(Anime, {
  foreignKey: 'user_id',
});

Anime.belongsToMany(User, {
  through: 'user_anime',
  foreignKey: 'anime_id',
  otherKey: 'user_id',
});

export { Anime, Comments, User };
