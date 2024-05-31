import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Prisma } from "@prisma/client";
import { USER_ROLE } from "src/users/dto/users.dto";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { MyLoggerService } from "src/my-logger/my-logger.service";

@SkipThrottle() // SKIP THROTTLING FOR ALL REQUESTS
@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new MyLoggerService(EmployeeController.name);

  @Throttle({
    short: {
      ttl: 1000,
      limit: 1,
    },
    long: {
      ttl: 60000,
      limit: 30,
    },
  })
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // DON'T SKIP THROTTLING FOR ALL REQUESTS
  @Get()
  findAll(@Ip() ip: string, @Query("role") role?: USER_ROLE) {
    this.logger.log(`GET ALL EMPLOYEES \t ${ip}`);
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
