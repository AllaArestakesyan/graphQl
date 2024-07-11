import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    @InjectRepository(Post) private repoPost: Repository<Post>,
    @InjectRepository(User) private repoUser: Repository<User>
    ) { }
  async create(createpostInput: CreateCommentInput) {
    const { text, postId, userId } = createpostInput;
    const user = await this.repoUser.findOneBy({id:userId})
    const post = await this.repoPost.findOneBy({id:postId})
    if(user && post){
      const comment = this.repo.create({ text, post, user });
      return await this.repo.save(comment);
    }else{
      return { message: "user or post not found " }
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const data = await this.repo.findOneBy({ id })
    return data ? data : { message: "comment not found " }
  }

  async update(id: number, updatecommentInput: UpdateCommentInput) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.update(id, updatecommentInput)
      return await this.repo.findOneBy({ id })
    } else
      return { message: "comment not found " }
  }

  async remove(id: number) {
    const data = await this.repo.findOneBy({ id })
    if (data) {
      await this.repo.delete(id)
      return data;
    } else
      return { message: "comment not found " }
  }
}
