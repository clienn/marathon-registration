// src/users/dto/list-users.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class ListUsersInput {
  @Field(() => Int, { defaultValue: 0 }) skip?: number;
  @Field(() => Int, { defaultValue: 20 }) take?: number;
  @Field({ nullable: true }) search?: string;
}