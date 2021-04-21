const WeatherAPI = require('../lib/weatherApi');
const db = require('../db/store');

module.exports = async (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).send({ error: 'Invalid location' });
    }

    const user = db.users[req.username];

    user.currentLocation = location;

    if (user.locationHistory) {
        user.locationHistory.push(location);
    } else {
        user.locationHistory = [location];
    }

    const api = new WeatherAPI(location);

    try {
        const weather = await api.getWeather();
        return res.status(200).send(weather);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}
