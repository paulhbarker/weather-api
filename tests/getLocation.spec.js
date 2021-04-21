const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

test('GET /location', async () => {
    const authParams = { username: 'bobdylan' };
    await request.post('/user').send(authParams);
    const res = await request.post('/login').send(authParams);

    const token = res.body.token;

    const weatherParams = { postal_code: '89123' };
    const res2 = await request.get('/location').set('Authorization', token).send(weatherParams);

    expect(res2.body.location).toBe('36.0357492,-115.1533426')
})
