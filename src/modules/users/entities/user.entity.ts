import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tuit } from '../../tuits/entities/tuit.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  @IsEmail()
  email: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;
  @OneToMany(() => Tuit, (tuit) => tuit.user)
  tuits: Tuit[];
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
