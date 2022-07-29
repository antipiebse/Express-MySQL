import { Request, Response } from 'express';
import { Board } from '../entities/Board';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { Comment } from '../entities/Comment';

export class CommentController {
  boardRepository: Repository<Board>;
  userRepository: Repository<User>;
  commentRepository: Repository<Comment>;
  constructor() {
    this.boardRepository = getRepository(Board);
    this.userRepository = getRepository(User);
    this.commentRepository = getRepository(Comment);
  }

  async all(req: Request, res: Response): Promise<Comment[]> {
    const id = req.params.boardId;
    const board = await this.boardRepository.findOne({ id });
    if (!board) {
      throw new Error('BadRequest');
    }
    const comment = await this.commentRepository.query(`SELECT *
    FROM comment
    ORDER BY IF(ISNULL(parrentId), id, parrentId), sequelize;`);
    if (!comment) {
      throw new Error('BadRequest');
    }
    return comment;
  }

  async save(req: Request, res: Response): Promise<Comment> {
    const boardId = req.params;
    const { email, parrentId, ...rest } = req.body;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }
    const board = await this.boardRepository.findOne({
      where: { id: boardId.boardId },
    });

    if (!board) {
      throw new Error('BadRequest');
    }

    let sequelize = 1;
    if (parrentId) {
      sequelize = await this.commentRepository.count({
        where: [{ id: parrentId }, { parrentId }],
      });
    }
    const target = await this.commentRepository.save({
      ...rest,
      parrentId,
      user,
      board,
      sequelize: parrentId ? sequelize + 1 : sequelize,
    });
    const comment = await this.commentRepository.findOne({ id: target.id });
    if (!comment) {
      throw new Error('BadRequest');
    }

    return comment;
  }

  async remove(req: Request, res: Response): Promise<boolean> {
    const { commentId, boardId } = req.params;
    const { email } = req.body;

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new Error('BadRequest');
    }
    const checkedRole = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.board', 'board')
      .where({ id: commentId })
      .andWhere({ user })
      .getOne();

    if (!checkedRole) throw new Error('BadRequest');
    const commentToRemove = await this.commentRepository.findOne({
      id: commentId,
    });
    if (!commentToRemove) throw new Error('BadRequest');

    const result = await this.commentRepository.softRemove(commentToRemove);
    return result.deletedAt ? true : false;
  }

  async update(req: Request, res: Response): Promise<Comment> {
    const { commentId, boardId } = req.params;
    const { email, ...rest } = req.body;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }

    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new Error('BadRequest');
    }
    // 실제로 유저가 작성한 댓글인지 확인
    const CommentToUpdate = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.board', 'board')
      .where({ id: commentId })
      .andWhere({ user })
      .getOne();

    if (!CommentToUpdate) throw new Error('BadRequest');

    const result = await this.commentRepository.save({
      ...CommentToUpdate,
      ...rest,
    });
    return result;
  }
}
