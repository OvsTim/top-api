import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from '../review/review.model';
import { Model, Types } from 'mongoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }
  async findById(id: Types.ObjectId) {
    return this.topPageModel.findById(id).exec();
  }
  async findByAlias(alias: string) {
    return this.topPageModel.find({ alias: alias }).exec();
  }

  async delete(id: Types.ObjectId) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }
  async update(id: Types.ObjectId, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate([
        {
          $match: {
            firstCategory: firstCategory,
          },
        },
        {
          $group: {
            _id: {
              secondCategory: '$secondCategory',
            },
            pages: {
              $push: { alias: '$alias', title: '$title' },
            },
          },
        },
      ])
      .exec();
  }
  async findByText(text: string) {
    return this.topPageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }
}
