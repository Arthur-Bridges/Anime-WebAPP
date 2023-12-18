// All routes below
import express from 'express';
import angelBeatsRoute from './angelBeatsRoute.js';
import clannadRoute from './clannadRoute.js';
import onePieceRoute from './onePieceRoute.js';
import violetRoute from './violetEvergardenRoute.js';
import loginRoute from './loginRoute.js';
import logoutRoute from './logoutRoute.js';
import signupRoute from './signupRoute.js';

const router = express.Router();

// router.use for all below
router.use('/angelbeats', angelBeatsRoute);
router.use('/clannad', clannadRoute);
router.use('/onepiece', onePieceRoute);
router.use('/violetevergarden', violetRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/signup', signupRoute);

export default router;
