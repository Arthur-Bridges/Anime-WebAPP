import express from 'express';
import { User } from '../../models/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: {username: req.body.name }});

        if(!userData) {
            res.status(400).json({ message: "Invalid username or password, please try again"});
            return;
        }
        const validatePassword = await userData.checkPassword(req.body.password);
        if(!validatePassword) {
            res.status(400).json({ message: "Invalid username or password, please try again"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            req.session.email = userData.email;

            res.json({ user: userData, message: "Successful login!"});
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

export default router;
