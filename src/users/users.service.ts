import { Injectable } from "@nestjs/common";
import { User } from "./types";

@Injectable()
export class UsersService {
  private id = 11;
  private users = [
    {
      id: "1",
      name: "John Doe",
      designation: "Software Engineer",
      email: "johndoe@example.com",
      role: "Developer",
    },

    {
      id: "2",
      name: "Jane Smith",
      designation: "Marketing Manager",
      email: "janesmith@example.com",
      role: "Manager",
    },

    {
      id: "3",
      name: "Michael Johnson",
      designation: "Sales Representative",
      email: "michaeljohnson@example.com",
      role: "Sales",
    },

    {
      id: "4",
      name: "Emily Brown",
      designation: "HR Coordinator",
      email: "emilybrown@example.com",
      role: "Human Resources",
    },

    {
      id: "5",
      name: "David Lee",
      designation: "Financial Analyst",
      email: "davidlee@example.com",
      role: "Finance",
    },

    {
      id: "6",
      name: "Sarah Williams",
      designation: "Customer Support Specialist",
      email: "sarahwilliams@example.com",
      role: "Support",
    },
    {
      id: "7",
      name: "Christopher Martinez",
      designation: "Project Manager",
      email: "christophermartinez@example.com",
      role: "Project Management",
    },

    {
      id: "8",
      name: "Amanda Taylor",
      designation: "Operations Manager",
      email: "amandataylor@example.com",
      role: "Operations",
    },

    {
      id: "9",
      name: "Kevin Adams",
      designation: "Quality Assurance Engineer",
      email: "kevinadams@example.com",
      role: "Quality Assurance",
    },

    {
      id: "10",
      name: "Jennifer Wilson",
      designation: "Product Designer",
      email: "jenniferwilson@example.com",
      role: "Design",
    },
  ];

  getAll(role?: string) {
    if (role) return this.users.filter((user) => user.role === role);

    return this.users;
  }

  getOne(id: string) {
    if (!id) throw new Error("Invalid ID!");

    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    designation: string;
    role: string;
  }) {
    const userToAdd = { ...user, id: String(this.id) };
    this.users.push(userToAdd);
    this.id++;

    return userToAdd;
  }

  update(id: string, user: User) {
    if (!id) throw new Error("Invalid ID!");

    const index = this.users.findIndex((u) => u.id == id);
    if (index < 0) throw new Error("User not found!");

    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  delete(id: string) {
    if (!id) throw new Error("Invalid ID!");

    const index = this.users.findIndex((u) => u.id == id);
    if (index < 0) throw new Error("User not found!");

    const deletedUser = this.users[index];
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
