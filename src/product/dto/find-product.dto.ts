import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class FindProductDto {
  @Prop({ required: true })
  category:string;
  @Prop({ required: true })
  limit:number;
}