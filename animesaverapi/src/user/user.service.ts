// user.service.ts

import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  //Create a new user
  async createUser(
    username: string,
    password: string,
    profilepicture: string,
  ): Promise<Users> {
    if (!username.trim() || !password.trim()) {
      throw new Error('Fields cannot be empty or whitespace-only');
    }
    const userExists = await this.userRepository.findOne({
      where: { username },
    });
    if (userExists) {
      throw new Error(`User with username ${username} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      profilepicture,
    });
    return this.userRepository.save(user);
  }

  //Edit user
  async editUser(
    username: string,
    password: string,
    profilepicture: string,
    @Request() req,
  ): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw new Error(`User with id ${req.user.id} not found`);
    }
    if (username && username.trim()) {
      user.username = username;
    }
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (profilepicture && profilepicture.trim()) {
      user.profilepicture = profilepicture;
    }
    return this.userRepository.save(user);
  }

  //ALl find methods user
  async findByUsername(username: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  //delete user
  async deleteUser(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.remove(user);
  }
}
