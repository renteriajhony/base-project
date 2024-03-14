import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TuitsService } from './tuits.service';
import { TuitsController } from './tuits.controller';
import { Tuit } from './entities';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Tuit, User])],
  controllers: [TuitsController],
  providers: [TuitsService, Repository],
})
export class TuitsModule {}
