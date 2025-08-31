import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;   // will be hashed in service

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

  @Field({ nullable: true })
  isActive?: boolean;
}