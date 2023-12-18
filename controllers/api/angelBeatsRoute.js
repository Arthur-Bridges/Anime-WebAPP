import express from 'express';
import path from 'path';
import withAuth from '../../utils/auth.js';
import { Comments, Anime, User } from '../../models/index.js'; // Adjust the path as necessary

const router = express.Router();

router.use(
  '/animeVids',
  express.static(path.join(__dirname, '..', '..', 'src', 'animeVids')),
);

router.get('/angelbeats/video', withAuth, async (req, res) => {
  try {
    const videoPath = '/animeVids/AngelBeats.mp4';
    res.render('angelbeats', { videoPath });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/angelbeats/comments', async (req, res) => {
  try {
    const retrievePosts = await Comments.findAll({
      include: [{ model: User }],
    });

    const transformingPost = retrievePosts.map((post) =>
      post.get({ plain: true }),
    );
    res.render('angelbeats', { transformingPost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/angelbeats/:id', async (req, res) => {
  try {
    const message = await Comments.create({
      ...req.body,
      anime_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.json({ message });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
