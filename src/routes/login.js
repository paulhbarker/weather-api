const db = require('../db/store');
const uuid = require('uuid').v4;

module.exports = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send({ error: 'Invalid credentials' });
    }

    if (!db.users[username]) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const token = uuid();

    db.tokens[token] = username;

    return res.status(200).send({ token });
};
