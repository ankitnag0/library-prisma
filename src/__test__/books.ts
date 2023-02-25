import supertest from 'supertest';
import app from '../app';

export const booksApiTests = () => {
  var bookId: string;
  var token: string;
  describe('Books API', () => {
    beforeAll(async() => {
      const res = await supertest(app)
        .post(`/api/admin/login`)
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        });
      token = res.body.token;
    })
    describe('POST /api/books', () => {
      it('should create a new book', async () => {
        const res = await supertest(app)
          .post('/api/books')
          .set('Authorization', 'Bearer ' + token)
          .send({
            title: 'Book',
            author: 'Author',
            description: 'Description',
            copies: 5
          })
          .expect(201);

        expect(res.body).toHaveProperty('title', 'Book');
        expect(res.body).toHaveProperty('author', 'Author');
        expect(res.body).toHaveProperty('description', 'Description');
        expect(res.body).toHaveProperty('copies', 5);
        bookId = res.body.id;
      });
      it('should throw an error if the required properties are missing', async () => {
        const res = await supertest(app)
          .post('/api/books')
          .set('Authorization', 'Bearer ' + token)
          .send({
            title: 'Book',
            description: 'Description',
          })
          .expect(400);

        expect(res.body).toHaveProperty('message', '\'author\' is required');
      });
    });
    describe(`GET /api/books/${bookId}`, () => {
      it(`should fetch an existing book`, async () => {
        const res = await supertest(app)
          .get(`/api/books/${bookId}`)
          .expect(200);

        expect(res.body).toHaveProperty('title', 'Book');
        expect(res.body).toHaveProperty('author', 'Author');
        expect(res.body).toHaveProperty('description', 'Description');
        expect(res.body).toHaveProperty('copies', 5);
      });
    });
    describe(`PUT /api/books/${bookId}`, () => {
      it(`should update an existing book`, async () => {
        const res = await supertest(app)
          .put(`/api/books/${bookId}`)
          .set('Authorization', 'Bearer ' + token)
          .send({
            title: 'New Book',
            author: 'New Author',
            description: 'New Description',
            copies: 1
          })
          .expect(200);

        expect(res.body).toHaveProperty('title', 'New Book');
        expect(res.body).toHaveProperty('author', 'New Author');
        expect(res.body).toHaveProperty('description', 'New Description');
        expect(res.body).toHaveProperty('copies', 1);
      });
    });
    describe(`DELETE /api/books/${bookId}`, () => {
      it(`should delete an existing book`, async () => {
        const res = await supertest(app)
          .delete(`/api/books/${bookId}`)
          .set('Authorization', 'Bearer ' + token)
          .expect(200);

        expect(res.body).toHaveProperty('title', 'New Book');
        expect(res.body).toHaveProperty('author', 'New Author');
        expect(res.body).toHaveProperty('description', 'New Description');
        expect(res.body).toHaveProperty('copies', 1);
      });
    });
  });
};