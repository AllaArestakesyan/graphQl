import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
  
  @Field()
  name: string

  @Field()
  surname: string
  
  @Field()
  email: string
  
  @Field()
  age: number
}
