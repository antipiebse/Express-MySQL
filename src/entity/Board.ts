import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.boards)
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
