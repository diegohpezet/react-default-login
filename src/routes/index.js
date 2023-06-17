const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => res.render('index.ejs', {registerFailed: false}))
router.post('/register', (req,res) => {
    const { username, email, password, repeatpassword } = req.body;

    if (password === repeatpassword) {
        const user = new User({username, email, password})
        user.save(err => {
            if(err) {
                res.render('index', {regMessage: "Username already taken!", registerFailed: true})
                console.log(err)
            } else {
                res.render('main', {data: user})
            }
        })
    } else {
        res.render('index', {regMessage: "Passwords don't match!", registerFailed: true})
    }
    
})
router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    User.findOne({username}, (err, user) => {
        if(err) {
            res.render('index', {loginMessage: "User authentication error"})
            console.log(err);
        } else if (!user) {
            res.render('index', {loginMessage: "User does not exist"})
        } else {
            user.comparePassword(password, (err, result) => {
                if(err){
                    res.render('index', {loginMessage: "Authentication error"})
                } else if (result) {
                    res.render('main', {data: user});
                } else {
                    res.render('index', {loginMessage: "Invalid password"})
                }
            });
        }
    })
})

module.exports = router;