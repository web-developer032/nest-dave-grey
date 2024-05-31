import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Prisma } from "@prisma/client";
import { USER_ROLE } from "src/users/dto/users.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() role?: USER_ROLE) {
    return this.employeeService.findAll(role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeService.remove(+id);
  }
}
