import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {

  @Field()
  title: string
  @Field()
  price: number
  @Field()
  userId: number

}
