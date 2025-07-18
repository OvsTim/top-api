import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';
import { AuthSchema } from './dto/auth.dto';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: AuthModel.name, schema: AuthSchema, collection: 'Auth' },
    ]),
  ],
})
export class AuthModule {}
