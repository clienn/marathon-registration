import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ApolloServerPluginLandingPageLocalDefault } 
  from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      playground: false,   // disable old Playground
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }) // Apollo Sandbox
      ],
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}