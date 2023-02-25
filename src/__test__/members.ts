import supertest from 'supertest';
import app from '../app';

export const membersApiTests = () => {
  var memberId: string;
  var token: string;
  describe('Members API', () => {
    beforeAll(async () => {
      const res = await supertest(app)
        .post(`/api/admin/login`)
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        });
      token = res.body.token;
    })
    describe('POST /api/members', () => {
      it('should create a new member', async () => {
        const res = await supertest(app)
          .post('/api/members')
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'New Member',
            email: 'new@member.com',
            address: 'New Member Address',
            phoneNumber: '9878945671'
          })
          .expect(201);

        expect(res.body).toHaveProperty('name', 'New Member');
        expect(res.body).toHaveProperty('email', 'new@member.com');
        expect(res.body).toHaveProperty('address', 'New Member Address');
        expect(res.body).toHaveProperty('phoneNumber', '9878945671');
        memberId = res.body.id;
      });
      it('should throw an error if the required properties are missing', async () => {
        const res = await supertest(app)
          .post('/api/members')
          .set('Authorization', 'Bearer ' + token)
          .send({
            email: 'new@member.com',
            address: 'New Member Address',
          })
          .expect(400);

        expect(res.body).toHaveProperty('message', '\'name\' is required');
      });
    });
    describe(`GET /api/members/${memberId}`, () => {
      it(`should fetch an existing member`, async () => {
        const res = await supertest(app)
          .get(`/api/members/${memberId}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(200);

        expect(res.body).toHaveProperty('name', 'New Member');
        expect(res.body).toHaveProperty('email', 'new@member.com');
        expect(res.body).toHaveProperty('address', 'New Member Address');
        expect(res.body).toHaveProperty('phoneNumber', '9878945671');
      });
    });
    describe(`PUT /api/members/${memberId}`, () => {
      it(`should update an existing member`, async () => {
        const res = await supertest(app)
          .put(`/api/members/${memberId}`)
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'New Member',
            email: 'new@member.com',
            address: 'New Member Address',
            phoneNumber: '9878945671'
          })
          .expect(200);

        expect(res.body).toHaveProperty('name', 'New Member');
        expect(res.body).toHaveProperty('email', 'new@member.com');
        expect(res.body).toHaveProperty('address', 'New Member Address');
        expect(res.body).toHaveProperty('phoneNumber', '9878945671');
      });
    });
    describe(`DELETE /api/members/${memberId}`, () => {
      it(`should delete an existing member`, async () => {
        const res = await supertest(app)
          .delete(`/api/members/${memberId}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(200);

        expect(res.body).toHaveProperty('name', 'New Member');
        expect(res.body).toHaveProperty('email', 'new@member.com');
        expect(res.body).toHaveProperty('address', 'New Member Address');
        expect(res.body).toHaveProperty('phoneNumber', '9878945671');
      });
    });
  });
};