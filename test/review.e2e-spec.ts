import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { ReviewDocument } from '../src/review/review.model';
import { REVIEW_NOT_FOUND } from '../src/review/review-constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: 'Тест',
  description: 'Описание',
  title: 'Заголовок',
  rating: 5,
  productId,
};

const loginDto: AuthDto = {
  login: 'test@test.ru',
  password: '1',
};
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    token = res.body.access_token;
  });

  test('/review/create (POST) - success', () => {

    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body, status }: request.Response) => {
        createdId = (body as ReviewDocument)._id.toString();
        expect(createdId).toBeDefined();
      });
  });

  test('/review/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body, status }: request.Response) => {
        console.log(body);
      });
  });

  test('/review/byProduct/:productId (GET) - success', () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect((body as ReviewDocument[]).length).toBe(1);
      });
  });

  test('/review/byProduct/:productId (GET) - fail', () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect((body as ReviewDocument[]).length).toBe(0);
      });
  });

  test('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  test('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(async () => {
    await disconnect();
  });
});
