const LocationSearch = require('../lib/locationSearch');

module.exports = async (req, res) => {
    const postalCode = req.body.postal_code;

    if (!postalCode) {
        return res.status(400).send({ error: 'Invalid ZIP code.' });
    }

    try {
        const location = await LocationSearch.geocode(postalCode);
        return res.status(200).send({ location });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.message });
    }
}
