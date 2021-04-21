const db = require('../db/store');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    const username = db.tokens[token];

    if (!username) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    req.username = username;

    return next();
};
