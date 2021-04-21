# Weather API

This service pulls weather data from Google Maps and tomoorow.io. Locations may be searched by postal code.

#### Requirements
This app requires a `.env` file with the following entries:
 - `GOOGLE_API_KEY`: An API key with access to the Google Maps Services API (billing must be enabled)
 - `WEATHER_API_KEY`: An API key for tomorrow.io

#### Why tomorrow.io
Tomorrow.io had incredible documentation on how to query its API and made using it very simple and straightforward, much more so than other APIs investigated. The ease and simplicity of its integration made it an easy target and will put a relatively small cognitive load on future developers. It also supports queries for daily weather forecasting, which was the main target of the application.

## Endpoints

### POST /user

Create a new user.

**Parameters**

| Param        | Type   | Description       |
| ------------ | ------ |  ----------------- |
| username | String | Unique username identifier for user. |

**Sample Request:**

```
POST http://localhost:3000/user
{
    "username": "johnDoe1",
}
```

**Sample Response:**

```
Status Code: 201
```
---
### POST /login

Login and generate a token for a user.

**Parameters**

| Param        | Type  | Description       |
| --------- | ------ |  ----------------- |
| username | String | Unique username identifier for user. |

**Sample Request:**

```
POST http://localhost:3000/user
{
    "username": "johnDoe1",
}
```

**Sample Response:**

```
Status Code: 200
{
    "token": "0b0471ca-ff96-445e-b65c-14be1fc69aae"
}
```
---
### GET /location

Get the latitude and longitude of a postal code.

**Parameters**

| Param        | Type   | Description       |
| ------------ | ------ |  ----------------- |
| header: Authorization | String | Authorization token requested at login |
| postal_code | String | ZIP / postal code. |

**Sample Request:**

```
GET http://localhost:3000/location
{
    "Authorization": "0b0471ca-ff96-445e-b65c-14be1fc69aae"
}
{
    "postal_code": "89123",
}
```

**Sample Response:**

```
Status Code: 200
{
    "location": "36.0357492,-115.1533426"
}
```
---
### GET /weather

Get the weather for the entire week. The endpoint stores the location value and all subsequent location values for the user.

**Parameters**

| Param        | Type   | Description       |
| ------------ | ------ |  ----------------- |
| header: Authorization | String | Authorization token requested at login |
| location | String | Latitude and longitude values, separated by comma |

**Sample Request:**

```
GET http://localhost:3000/weather
{
    "Authorization": "0b0471ca-ff96-445e-b65c-14be1fc69aae"
}
{
    "location": "36.0357492,-115.1533426",
}
```

**Sample Response:**

```
Status Code: 200
{
    [
        {
            "startTime": "2021-04-19T23:00:00-04:00",
            "values": {
                "precipitationIntensity": 0,
                "precipitationType": 2,
                "windSpeed": 21.74,
                "windGust": 28.86,
                "windDirection": 128.47,
                "temperature": -69.65,
                "temperatureApparent": -110.44,
                "cloudCover": 100,
                "cloudBase": 0,
                "cloudCeiling": 0,
                "weatherCode": 1102
            }
        },
        {
            "startTime": "2021-04-20T23:00:00-04:00",
            "values": {
                "precipitationIntensity": 0,
                "precipitationType": 2,
                "windSpeed": 20.95,
                "windGust": 27.71,
                "windDirection": 122.64,
                "temperature": -69.39,
                "temperatureApparent": -112.95,
                "cloudCover": 100,
                "cloudBase": 0.01,
                "cloudCeiling": 0.02,
                "weatherCode": 1001
            }
        },
        ...
    ]
}
```
