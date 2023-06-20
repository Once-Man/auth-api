const express = require('express');
const router = express.Router();

const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json(

        {

        post: {
            title: 'My first post',
            description: 'My first description .......'
        },

    }

    );
});

module.exports = router;