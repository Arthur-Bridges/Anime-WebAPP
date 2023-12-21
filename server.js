import path from 'path';
import express from 'express';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';

import routes from './controllers';
import sequelize from './config/connection';

const SequelizeStore = connectSessionSequelize(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`
            \nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`),
  );
});
