import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from '../review/review.model';
import { TopPageModel, TopPageModelSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      {
        name: TopPageModel.name,
        schema: TopPageModelSchema,
        collection: 'TopPage',
      },
    ]),
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
