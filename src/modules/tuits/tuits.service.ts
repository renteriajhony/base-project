import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { CreateTuitDto, UpdateTuitDto } from './dto';
import { PaginationQueryDto } from '../commons/pagination-query/dto/pagination-query.dto';
import { Tuit } from './entities';
import { User } from '../users/entities';

@Injectable()
export class TuitsService {
  constructor(
    @InjectRepository(Tuit)
    private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ message, user }: CreateTuitDto): Promise<Tuit> {
    const myTuith: Tuit = this.tuitRepository.create({ message, user });
    return await this.tuitRepository.save(myTuith);
  }

  async findAll({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }
  async findOne(id: number): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tuit) throw new NotFoundException('Resource not found');
    return tuit;
  }

  async update(
    id: number,
    updateTuitDto: UpdateTuitDto,
  ): Promise<UpdateResult> {
    const tuit: Tuit = await this.findOne(id);
    if (!tuit) throw new NotFoundException('Resource not found');
    return this.tuitRepository.update(id, updateTuitDto);
  }

  async remove(id: number): Promise<void> {
    const tuit: Tuit = await this.findOne(id);
    if (!tuit) throw new NotFoundException('Resource not found');
    await this.tuitRepository.remove([tuit]);
  }
}
