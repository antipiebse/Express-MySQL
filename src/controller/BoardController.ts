import { Request, Response } from 'express';
import { Board } from '../entities/Board';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class BoardController {
  boardRepository: Repository<Board>;
  userRepository: Repository<User>;
  constructor() {
    this.boardRepository = getRepository(Board);
    this.userRepository = getRepository(User);
  }

  async all(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async one(req: Request, res: Response): Promise<Board> {
    const id = req.params.id;
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new Error('BadRequest');
    }
    return board;
  }

  async save(req: Request, res: Response): Promise<Board> {
    const { email, ...rest } = req.body;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }
    const target = await this.boardRepository.save({ ...rest, user });
    const board = await this.boardRepository.findOne({
      where: { id: target.id },
    });
    if (!board) {
      throw new Error('BadRequest');
    }
    return board;
  }

  async remove(req: Request, res: Response): Promise<boolean> {
    const id = req.params.id;

    const boardToRemove = await this.boardRepository.findOne({ id });
    if (!boardToRemove) throw new Error('BadRequest');
    const result = await this.boardRepository.softRemove(boardToRemove);
    return result.deletedAt ? true : false;
  }

  async update(req: Request, res: Response): Promise<Board> {
    const { email, ...rest } = req.body;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }
    //실제로 게시글을 만든 유저인지 확인
    const boardToUpdate = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where({ id: req.params.id })
      .andWhere({ user })
      .getOne();

    if (!boardToUpdate) throw new Error('BadRequest');
    const target = await this.boardRepository.save({
      ...boardToUpdate,
      ...rest,
    });
    const result = await this.boardRepository.findOne({ id: target.id });
    if (!result) throw new Error('BadRequest');
    return result;
  }
}
