import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  getAllUsers() {
    return [];
  }

  @Get(":id")
  getUser(@Param("id") id: string) {
    return { id };
  }

  @Post("")
  createUser(@Body() user: {}) {
    return user;
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() user: {}) {
    return {
      id,
      ...user,
    };
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return { id };
  }
}
