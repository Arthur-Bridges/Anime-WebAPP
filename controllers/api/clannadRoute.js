const router = require("express").Router();
const express = require("express");
const path = require("path");
const fs = require("fs");
const withAuth = require("../../utils/auth");
const { Comments, Anime, User } = require("../../models");

router.use(
  "/animeVids",
  express.static(path.join(__dirname, "..", "..", "src", "animeVids"))
);

router.get("/clannad/video", withAuth, async (req, res) => {
  const videoPath = path.join(__dirname, "animeVids", "Clannad.mp4");
  res.sendFile(videoPath);
});

router.get("/clannad/comments", async (req, res) => {
  try {
    const retrievePosts = await Comments.findAll({
      include: [{ model: User }],
    });

    const transformingPost = retrievePosts.map((retrievePosts) =>
      retrievePosts.get({ plain: true })
    );
    res.render("clannad", {
      transformingPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/clannad/:id", async (req, res) => {
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

module.exports = router;
