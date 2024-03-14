import { Module } from '@nestjs/common';
import { PaginationQueryModule } from './pagination-query/pagination-query.module';

@Module({
  imports: [PaginationQueryModule],
  exports: [PaginationQueryModule],
})
export class CommonsModule {}
