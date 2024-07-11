import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
@ObjectType()
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  @Field(() => String)
  title:string

  @Column()
  @Field(() => Number)
  price:number

  @ManyToOne(type=>User, user=>user.books)
  @Field(() => User,  { nullable: true })
  user:User
}
