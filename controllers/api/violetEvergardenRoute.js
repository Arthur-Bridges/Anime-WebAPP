import express from 'express';
import path from 'path';
import withAuth from '../../utils/auth.js';
import { Comments, Anime, User } from '../../models/index.js';

const router = express.Router();

router.use(
  '/animeVids',
  express.static(path.join(process.cwd(), 'src', 'animeVids')),
);

router.get('/violetevergarden/video', withAuth, async (req, res) => {
  const videoPath = path.join(
    process.cwd(),
    'src',
    'animeVids',
    'VioletEverGarden.mp4',
  );
  res.sendFile(videoPath);
});

router.get('/violetevergarden/comments', async (req, res) => {
  try {
    const retrievePosts = await Comments.findAll({
      include: [{ model: User }],
    });

    const transformingPost = retrievePosts.map((post) =>
      post.get({ plain: true }),
    );
    res.render('violetevergarden', { transformingPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/violetevergarden/:id', async (req, res) => {
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
