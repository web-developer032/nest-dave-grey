import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { USER_ROLE } from "src/users/dto/users.dto";

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: USER_ROLE) {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });

    return this.databaseService.employee.findMany({
      where: {
        role,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
