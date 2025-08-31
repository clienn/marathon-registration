import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // keep REST if you want both
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersService, UsersResolver],
  controllers: [UsersController], // optional
  exports: [UsersService],
})
export class UsersModule {}