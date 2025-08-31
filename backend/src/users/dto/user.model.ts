import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType()
export class UserModel {
  @Field(() => GraphQLBigInt)
  id: bigint;   // Prisma uses BigInt for id

  @Field()
  email: string;

  // 🚨 Don’t expose raw passwords in GraphQL!
  // @HideField() keeps it out of the schema
  @Field({ nullable: true })
  passwordHash?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  middlename?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  birthdate?: Date;

  @Field({ nullable: true })
  sex?: string;

  @Field({ nullable: true })
  emergencyContactName?: string;

  @Field({ nullable: true })
  emergencyContactPhone?: string;

  @Field({ nullable: true })
  medicalNotes?: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}