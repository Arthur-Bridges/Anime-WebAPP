import express from 'express';
import { User } from '../../models/user.js';

const router = express.Router();

router.post('/logout', (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        req.session = null;
        req.statusCode(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error('Error during logout: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
