import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUN } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteDoc = this.reviewService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUN, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
