const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

test('POST /user', async () => {
    const params = { username: 'bobdylan' };

    const res = await request.post('/user').send(params);

    expect(res.status).toBe(201);
})
