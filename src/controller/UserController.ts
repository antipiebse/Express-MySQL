import { Request, Response } from 'express';
import { User } from '../entities/User';
import { getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UserController {
  userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async one(req: Request, res: Response): Promise<User> {
    const email = req.params.email;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('BadRequest');
    }
    return user;
  }

  async save(req: Request, res: Response): Promise<User> {
    // 이미 존재하는 이메일인지 확인
    const checkedUser = await this.userRepository.findOne({
      email: req.body.email,
    });
    if (checkedUser) throw new Error('BadRequest');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await this.userRepository.save({ ...req.body, password: hashedPassword });

    const user = await this.userRepository.findOne({ email: req.body.email });
    if (!user) throw new Error('BadRequest');

    return user;
  }

  async remove(req: Request, res: Response): Promise<boolean> {
    const email = req.params.email;

    const userToRemove = await this.userRepository.findOne({ email });
    if (!userToRemove) throw new Error('BadRequest');
    const result = await this.userRepository.softRemove(userToRemove);
    return result.deletedAt ? true : false;
  }

  async update(req: Request, res: Response): Promise<User> {
    const email = req.params.email;
    const userToUpdate = await this.userRepository.findOne({ email });
    if (!userToUpdate) throw new Error('BadRequest');
    const result = await this.userRepository.save({
      ...userToUpdate,
      ...req.body,
    });
    return result;
  }
}
