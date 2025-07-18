import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel } from '../auth/auth.model';
import { AuthSchema } from '../auth/dto/auth.dto';
import { ProductModel, ProductModelSchema } from './product.model';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductModel.name,
        schema: ProductModelSchema,
        collection: 'Product',
      },
    ]),
  ],
})
export class ProductModule {}
