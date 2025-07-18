import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @Prop({ required: true })
  count: number;
  @Prop({ required: true })
  juniorSalary: number;
  @Prop({ required: true })
  middleSalary: number;
  @Prop({ required: true })
  seniorSalary: number;
}
export class TopPageAdvantage {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
}

@Schema({ timestamps: true })
export class TopPageModel {
  @Prop({ required: true, enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @Prop({ required: true })
  secondCategory: string;
  @Prop({ required: true, unique: true })
  alias: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  category: string;
  @Prop({ type: [HhData] })
  hh?: HhData;
  @Prop({ required: true, type: [TopPageAdvantage] })
  advantages: TopPageAdvantage[];
  @Prop({ required: true })
  seoText: string;
  @Prop({ required: true })
  tagsTitle: string;
  @Prop({ required: true, type: [String] })
  tags: string[];
}

export const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);
