import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  @Field(() => String)
  title:string
 
  @Column()
  @Field(() => String)
  body:string

  @ManyToOne(type=>User, user=>user.posts)
  @Field(() => User, { nullable: true })
  user:User

  @OneToMany(type=>Comment, comment=>comment.post)
  @Field(() => [Comment], { nullable: true })
  comments:Comment[]
}
