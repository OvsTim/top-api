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
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';



const loginDto: AuthDto = {
  login: 'test@test.ru',
  password: '1',
};
const wrongPassDto: AuthDto = {
  login: 'test@test.ru',
  password: '12',
};
const wrongEmailDto: AuthDto = {
  login: 'test2@test.ru',
  password: '1',
};
describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  test('/auth/login (POST) - success', () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body, status }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  test('/auth/login (POST) - fail email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(wrongEmailDto)
      .expect(401)
      .then(({ body, status }: request.Response) => {
        console.log(body);
        expect(body.message).toEqual(USER_NOT_FOUND_ERROR);
      });
  });

  test('/auth/login (POST) - fail pass', () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send(wrongPassDto)
      .expect(401)
      .then(({ body }: request.Response) => {
        console.log(body);
        expect(body.message).toEqual(WRONG_PASSWORD_ERROR);
      });
  });

  afterAll(async () => {
    await disconnect();
  });
});
