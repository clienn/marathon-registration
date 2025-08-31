import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserModel } from '../users/dto/user.model';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-payload.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService, private readonly users: UsersService) {}

  @Mutation(() => AuthPayload)
  login(@Args('input') input: LoginInput) {
    // will call AuthService.login next step
    return this.auth.login(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  me(@CurrentUser() user: { userId: string; email: string }) {
    // if your DB id is Int: return this.users.findOne(+user.userId);
    return this.users.findOne?.(Number(user.userId));
  }
}