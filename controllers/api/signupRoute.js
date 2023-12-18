import express from 'express';
//import { response } from 'express';
import { User } from '../../models/user.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            logged_in: (req.session.logged_in = true),
        });

        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.username = userData.username;
        req.session.email = userData.email;

        req.session.save(() => {
            res.status(200).json({ message: "Successful registration!", userData });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;
