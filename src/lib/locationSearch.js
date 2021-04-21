const { Client } = require("@googlemaps/google-maps-services-js");

class LocationSearch {
    constructor() {
        this.client = new Client({  });
    }

    async geocode(location) {
        const params = {
            key: process.env.GOOGLE_API_KEY,
            components: { postal_code: location }
        };

        const response = await this.client.geocode({ params });

        if (response.data.results[0]) {
            const { location } = response.data.results[0].geometry;
            return `${location.lat},${location.lng}`;
        }

        return '0,0';
    }
}

module.exports = new LocationSearch();
