import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { User, USER_ROLE } from "./types";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@Query("role") role?: USER_ROLE) {
    return this.usersService.getAll(role);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.usersService.getOne(id);
  }

  @Post("")
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() user: User) {
    return this.usersService.update(id, user);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
