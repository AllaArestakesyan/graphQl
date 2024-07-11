import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Book } from 'src/book/entities/book.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  @Field(() => String)
  name:string

  @Column()
  @Field(() => String)
  surname:string

  @Column()
  @Field(() => String)
  email:string

  @Column()
  @Field(() => Number)
  age:number


  @OneToMany(type=>Book, book=>book.user)
  @Field(() => [Book], { nullable: true })
  books:Book[]

  @OneToMany(type=>Post, post=>post.user)
  @Field(() => [Post], { nullable: true })
  posts:Post[]

  @OneToMany(type=>Comment, comment=>comment.user)
  @Field(() => [Comment], { nullable: true })
  comments:Comment[]


}
