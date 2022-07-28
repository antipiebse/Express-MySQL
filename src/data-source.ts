import { User } from './entities/User';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Board } from './entities/Board';
import { Comment } from './entities/Comment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: true,
  logging: false,
  entities: [User, Board, Comment],
});
