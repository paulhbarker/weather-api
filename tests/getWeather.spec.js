const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

test('GET /weather', async () => {
    const authParams = { username: 'bobdylan' };
    await request.post('/user').send(authParams);
    const res = await request.post('/login').send(authParams);

    const token = res.body.token;

    const weatherParams = { location: '-73.98529171943665,40.75872069597532' };
    const weatherResponse = await request.get('/weather').set('Authorization', token).send(weatherParams);

    expect(weatherResponse.body).toHaveLength(7);
})
