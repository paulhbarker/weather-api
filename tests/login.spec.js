const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

test('POST /login', async () => {
    const params = { username: 'bobdylan' };

    await request.post('/user').send(params);
    const res = await request.post('/login').send(params);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
});
