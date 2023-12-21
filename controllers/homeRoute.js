//TODO: add authentication and finish route
import express from 'express';
import path from 'path';
import withAuth from '../../utils/auth.js';
import sequelize from 'sequelize';

const router = express.Router();
//home route
router.get('/', (req, res) => {
  try {
    return res.render('homepage');
  } catch (err) {
    return res.status(404).json(err);
  }
});

router.get('/angelbeats', withAuth, (req, res) => {
  try {
    return res.render('angelbeats');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/clannad', withAuth, (req, res) => {
  try {
    return res.render('clannad');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/onepiece', withAuth, (req, res) => {
  try {
    return res.render('onepiece');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/violetevergarden', withAuth, (req, res) => {
  try {
    return res.render('violetevergarden');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

export default router;
