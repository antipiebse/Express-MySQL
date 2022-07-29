import { User } from './User';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  parrentId!: string;

  @Column()
  sequelize!: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board!: Board;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
