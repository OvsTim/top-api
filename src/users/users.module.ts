import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { ReviewModel, ReviewSchema } from '../review/review.model';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
})
export class UsersModule {}
