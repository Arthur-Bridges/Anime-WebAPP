import express from 'express';
const router = express.Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

export default router;
