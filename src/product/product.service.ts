import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: Types.ObjectId) {
    return this.productModel.findById(id).exec();
  }

  async delete(id: Types.ObjectId) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async update(id: Types.ObjectId, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'review',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' },
            reviews: {
              $function: {
                body: `function (review) {
                  review.sort((a,b)=> new Date(a.createdAt)-new Date(b.createdAt));
                  return review;
                }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec()) as unknown as Promise<
      (ProductModel & {
        review: ReviewModel[];
        reviewCount: number;
        reviewAvg: number;
      })[]
    >;
  }
}
