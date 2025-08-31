import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserModel])
  users(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 20,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.usersService.list(skip, take, search ?? '');
  }

  @Query(() => Int)
  usersCount(
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.usersService.count(search ?? '');
  }

  @Mutation(() => UserModel)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(() => UserModel)
  updateUser(@Args('input') input: UpdateUserInput) {
    const { id, ...data } = input;
    return this.usersService.update(id, data);
  }
 
  @Mutation(() => UserModel)
  deleteUser(@Args('input') input: DeleteUserInput) {
    const { id } = input;
    return this.usersService.delete(id);
  }

}