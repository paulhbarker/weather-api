const db = require('../db/store');

module.exports = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send({ error: 'Invalid username.'});
    }

    db.users[username] = { username };

    return res.status(200).send();
}
