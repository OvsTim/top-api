import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ProductCharacteristic {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  value: string;
}

@Schema({ timestamps: true })
export class ProductModel {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  oldPrice: number;
  @Prop({ required: true })
  credit: number;
  @Prop({ required: true })
  calculatedRating: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  advantages: string;
  @Prop({ required: true })
  disAdvantages: string;
  @Prop({ type: [String] })
  categories: string[];
  @Prop({ type: [String] })
  tags: string[];
  @Prop({ type: [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}

export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);
