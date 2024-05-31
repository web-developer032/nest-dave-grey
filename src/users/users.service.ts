import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";

@Injectable()
export class UsersService {
  private id = 11;
  private users = [
    {
      id: 1,
      name: "Alice Smith",
      designation: "Software Engineer",
      email: "alice.smith@example.com",
      role: "ENGINEER",
    },
    {
      id: 2,
      name: "Bob Johnson",
      designation: "Intern Developer",
      email: "bob.johnson@example.com",
      role: "INTERN",
    },
    {
      id: 3,
      name: "Carol White",
      designation: "Senior Engineer",
      email: "carol.white@example.com",
      role: "ENGINEER",
    },
    {
      id: 4,
      name: "David Brown",
      designation: "System Administrator",
      email: "david.brown@example.com",
      role: "ADMIN",
    },
    {
      id: 5,
      name: "Eve Davis",
      designation: "Junior Developer",
      email: "eve.davis@example.com",
      role: "ENGINEER",
    },
    {
      id: 6,
      name: "Frank Harris",
      designation: "IT Intern",
      email: "frank.harris@example.com",
      role: "INTERN",
    },
    {
      id: 7,
      name: "Grace Clark",
      designation: "Network Engineer",
      email: "grace.clark@example.com",
      role: "ENGINEER",
    },
    {
      id: 8,
      name: "Henry Lewis",
      designation: "Database Administrator",
      email: "henry.lewis@example.com",
      role: "ADMIN",
    },
    {
      id: 9,
      name: "Isla Walker",
      designation: "Frontend Engineer",
      email: "isla.walker@example.com",
      role: "ENGINEER",
    },
    {
      id: 10,
      name: "Jack Hall",
      designation: "Backend Intern",
      email: "jack.hall@example.com",
      role: "INTERN",
    },
  ];

  getAll(role?: string) {
    if (role) return this.users.filter((user) => user.role === role);

    return this.users;
  }

  getOne(id: number) {
    if (!id) throw new Error("Invalid ID!");

    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException("User not found!");

    return user;
  }

  create(user: CreateUserDto) {
    const userToAdd = { ...user, id: this.id };
    this.users.push(userToAdd);
    this.id++;

    return userToAdd;
  }

  update(id: number, user: UpdateUserDto) {
    if (!id) throw new Error("Invalid ID!");

    const index = this.users.findIndex((u) => u.id == id);
    if (index < 0) throw new Error("User not found!");

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  delete(id: number) {
    if (!id) throw new Error("Invalid ID!");

    const index = this.users.findIndex((u) => u.id == id);
    if (index < 0) throw new Error("User not found!");

    const deletedUser = this.users[index];
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
