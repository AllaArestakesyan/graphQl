import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>,
    @InjectRepository(User) private repoUser: Repository<User>
    ) { }
  async create(createBookInput: CreateBookInput) {
    const { title, price, userId } = createBookInput;
    const user = await this.repoUser.findOneBy({id:userId})
    if(user){
      const book = this.repo.create({ title, price, user });
      return await this.repo.save(book);
    }else{
      return { message: "user not found " }
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const data = await this.repo.findOneBy({ id })
    return data ? data : { message: "book not found " }
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.update(id, updateBookInput)
      return await this.repo.findOneBy({ id })
    } else
      return { message: "book not found " }
  }

  async remove(id: number) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.delete(id)
      return data;
    } else
      return { message: "book not found " }
  }
}
