import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @Field()
  surname: string
  
  @Field()
  email: string
  
  @Field()
  age: number
}
