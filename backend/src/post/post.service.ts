import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repo: Repository<Post>,
    @InjectRepository(User) private repoUser: Repository<User>
    ) { }
  async create(createpostInput: CreatePostInput) {
    const { title, body, userId } = createpostInput;
    const user = await this.repoUser.findOneBy({id:userId})
    if(user){
      const post = this.repo.create({ title, body, user });
      return await this.repo.save(post);
    }else{
      return { message: "user not found " }
    }
  }

  async findAll() {
    return await this.repo.find({
      relations:{
        user:{
          comments:true
        },
        comments:{
          user:true
        }
      }
    });
  }

  async findOne(id: number) {
    const data = await this.repo.findOneBy({ id })
    return data ? data : { message: "post not found " }
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.update(id, updatePostInput)
      return await this.repo.findOneBy({ id })
    } else
      return { message: "post not found " }
  }

  async remove(id: number) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.delete(id)
      return data;
    } else
      return { message: "post not found " }
  }
}
