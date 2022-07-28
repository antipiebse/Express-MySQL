import {
  Entity,
  Column,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Board } from './Board';
import { PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryColumn()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  nickname!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Board, (board) => board.user)
  boards!: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
