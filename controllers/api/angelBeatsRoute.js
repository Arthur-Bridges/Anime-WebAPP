import express from 'express';
import path from 'path';
import withAuth from '../../utils/auth.js';
import { Comments, Anime, User } from '../../models/index.js';

const router = express.Router();

router.use(
  '/animeVids',
  express.static(path.join(process.cwd(), 'src', 'animeVids')),
);

router.get('/angelbeats/video', withAuth, async (req, res) => {
  const videoPath = await path.join(
    process.cwd(),
    'src',
    'animeVids',
    'AngelBeats.mp4',
  );
  res.sendFile(videoPath);
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
    return res.status(500).json(err);
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
