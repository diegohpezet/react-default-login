const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => res.render('index.ejs'))
router.post('/register', (req,res) => {
    const { username, email, password } = req.body;

    const user = new User({username, email, password})
    user.save(err => {
        if(err) {
            res.status(500).send('Error');
            console.log(err)
        } else {
            res.status(200).send('Success')
        }
    })
})
router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    User.findOne({username}, (err, user) => {
        if(err) {
            res.status(500).send('User authentication error')
        } else if (!user) {
            res.status(500).send('User does not exist')
        } else {
            user.comparePassword(password, (err, result) => {
                if(err){
                    res.status(500).send('Authentication error')
                } else if (result) {
                    res.status(200).send("User validated properly");
                } else {
                    res.status(500).send('Check the datafields')
                }
            });
        }
    })
})

module.exports = router;