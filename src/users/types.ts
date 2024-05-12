export enum USER_ROLE {
  INTERN = "INTERN",
  ENGINEER = "ENGINEER",
  ADMIN = "ADMIN",
}

export interface User {
  name: string;
  email: string;
  designation: string;
  role: USER_ROLE;
}
