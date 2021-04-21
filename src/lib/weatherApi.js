const qs = require('querystring');
const axios = require('axios');
const moment = require('moment');

class WeatherAPI {
    constructor(location) {
        this.API_KEY = process.env.WEATHER_API_KEY;
        this.baseUrl = 'https://api.tomorrow.io/v4/timelines';

        this.fields = [
            'precipitationIntensity',
            'precipitationType',
            'windSpeed',
            'windGust',
            'windDirection',
            'temperature',
            'temperatureApparent',
            'cloudCover',
            'cloudBase',
            'cloudCeiling',
            'weatherCode',
        ];

        this.units = 'imperial';
        this.timesteps = ['1d'];
        this.timezone = 'America/New_York';

        this.location = location;
    }

    buildRequest() {
        const now = moment.utc();
        const startTime = moment.utc(now).add(0, "minutes").toISOString();
        const endTime = moment.utc(now).add(6, "days").toISOString();

        const params =  qs.stringify({
            apikey: this.API_KEY,
            location: this.location,
            fields: this.fields,
            units: this.units,
            timesteps: this.timesteps,
            startTime,
            endTime,
            timezone: this.timezone,
        });

        return params;
    }

    async getWeather() {
        const query = this.buildRequest();

        try {
            const response = await axios.get(`${this.baseUrl}?${query}`);
            return response.data.data.timelines[0].intervals;
        } catch (err) {
            console.error(err);
            throw new Error(`An error occurred fetching weather for location ${location}`);
        }
    }
}

module.exports = WeatherAPI;
