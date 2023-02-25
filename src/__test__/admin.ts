import supertest from 'supertest';
import app from '../app';

export const adminApiTests = () => {
  describe('Admin API', () => {
    describe('POST /api/admin/register', () => {
      it('should create a new admin', async () => {
        const res = await supertest(app)
          .post('/api/admin/register')
          .send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123'
          })
          .expect(201);

        expect(res.body).toHaveProperty('name', 'John Doe');
        expect(res.body).toHaveProperty('email', 'john.doe@example.com');
      });

      it('should return 400 if email already exists', async () => {
        const res = await supertest(app)
          .post('/api/admin/register')
          .send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123'
          })
          .expect(400);

        expect(res.body).toHaveProperty('message', 'Admin already exists');
      });
    });

    describe('POST /api/admin/login', () => {
      it('should return a JWT token on successful login', async () => {
        const res = await supertest(app)
          .post('/api/admin/login')
          .send({
            email: 'john.doe@example.com',
            password: 'password123'
          })
          .expect(200);

        expect(res.body).toHaveProperty('token');
      });

      it('should return 401 if email or password is incorrect', async () => {
        const res = await supertest(app)
          .post('/api/admin/login')
          .send({
            email: 'john.doe@example.com',
            password: 'incorrectpassword'
          })
          .expect(401);

        expect(res.body).toHaveProperty('message', 'Invalid email or password');
      });
    });
  });
};