import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum USER_ROLE {
  INTERN = "INTERN",
  ENGINEER = "ENGINEER",
  ADMIN = "ADMIN",
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  designation: string;

  @IsEnum(USER_ROLE, {
    message: "Valid role is required!",
  })
  role: USER_ROLE;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // id: number;
}
