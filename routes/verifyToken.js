const JWT = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access-Denied');

    try {
        const verfied = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verfied;
        next();
    }catch(err) {
        res.status(400).send('Invalid User')
    }
}