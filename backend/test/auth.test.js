require('dotenv').config();
process.env.JWT_SECRET = 'supersecretkey123';
const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

before(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await mongoose.connection.dropDatabase();
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@test.com', password: '123456' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });

    it('should fail if fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'missing@test.com' });
      expect(res.status).to.equal(500);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '123456' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('should fail with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrongpass' });
      expect(res.status).to.equal(400);
    });
  });
});