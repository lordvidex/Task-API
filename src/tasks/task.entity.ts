import { User } from '../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user: User) => user.tasks, { eager: false })
  @ApiHideProperty()
  user: User;
}
