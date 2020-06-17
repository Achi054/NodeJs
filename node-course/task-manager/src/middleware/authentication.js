const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        var token = req.header('Authorization').replace('Bearer ', '');
        var decoded = jwt.verify(token, 'thisismynodeapp');
        var user = User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });

        if (!user)
            throw new Error();

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate yourself.");
    }
};

module.exports = auth;