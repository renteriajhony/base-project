import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { TuitsService } from './tuits.service';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './entities/tuit.entity';
import { PaginationQueryDto } from '../commons/pagination-query/dto/pagination-query.dto';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTuitDto: CreateTuitDto): Promise<Tuit> {
    return this.tuitsService.create(createTuitDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
    return this.tuitsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tuit> {
    return this.tuitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTuitDto: UpdateTuitDto,
  ): Promise<UpdateResult> {
    return this.tuitsService.update(+id, updateTuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tuitsService.remove(+id);
  }
}
