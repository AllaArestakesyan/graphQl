import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }
  async create(createUserInput: CreateUserInput) {
    const { name, surname, age, email } = createUserInput;
    return await this.repo.save({ name, surname, age, email });
  }

  async findAll() {
    return await this.repo.find({
      relations:{
        books:{
          user:{
            posts:{
              comments:true
            },
            comments:true,
          }
        },
        posts:{
          user:true
        },
        comments:{
          post:true,
          user:true,
        }
      }
    });
  }

  async findOne(id: number) {
    const data = await this.repo.findOneBy({ id })
    return data ? data : { message: "user not found " }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.update(id, updateUserInput)
      return await this.repo.findOneBy({ id })
    } else
      return { message: "user not found " }
  }

  async remove(id: number) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.delete(id)
      return data;
    } else
      return { message: "user not found " }
  }
}
