import { Controller, Get, Param } from "@nestjs/common";

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
}
