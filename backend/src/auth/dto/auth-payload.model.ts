import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/dto/user.model';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => UserModel)
  user: UserModel;
}