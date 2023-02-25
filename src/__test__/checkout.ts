import supertest from 'supertest';
import app from '../app';

export const checkoutApiTests = () => {
  var bookId: string;
  var memberId: string;
  var token: string;
  describe('Members API', () => {
    beforeAll(async () => {
      const tokenRes = await supertest(app)
        .post(`/api/admin/login`)
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        });
      token = tokenRes.body.token;
      const memberRes = await supertest(app)
        .post('/api/members')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'New Member',
          email: 'new@member.com',
          address: 'New Member Address',
          phoneNumber: '9878945671'
        });
      memberId = memberRes.body.id;
      const bookRes = await supertest(app)
        .post('/api/books')
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'Book',
          author: 'Author',
          description: 'Description',
          copies: 5
        });
      bookId = bookRes.body.id;
    })
    describe('POST /api/checkout', () => {
      it('should create a new checkout', async () => {
        const res = await supertest(app)
          .post('/api/checkout')
          .set('Authorization', 'Bearer ' + token)
          .send({
            bookId: bookId,
            memberId: memberId
          })
          .expect(201);

        expect(res.body).toHaveProperty('bookId', bookId);
        expect(res.body).toHaveProperty('memberId', memberId);
      });
      it('should throw an error if the required properties are missing', async () => {
        const res = await supertest(app)
          .post('/api/checkout')
          .set('Authorization', 'Bearer ' + token)
          .send({
            bookId: bookId,
          })
          .expect(400);
        expect(res.body).toHaveProperty('message', '\'memberId\' is required');
      });
    });
    describe('POST /api/checkout/return', () => {
      it('should return a book', async () => {
        const res = await supertest(app)
          .post('/api/checkout/return')
          .set('Authorization', 'Bearer ' + token)
          .send({
            bookId: bookId,
            memberId: memberId
          })
          .expect(200);

        expect(res.body).toHaveProperty('bookId', bookId);
        expect(res.body).toHaveProperty('memberId', memberId);
      });
    });
  });
};