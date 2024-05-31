import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto, USER_ROLE } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@Query("role") role?: USER_ROLE) {
    return this.usersService.getAll(role);
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Post("")
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) user: CreateUserDto,
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
