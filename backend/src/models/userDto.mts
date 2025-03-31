import { todoDto } from "./todoDto.mjs";

export type UserDto = {
  username: string;
  email: string;
  todos: todoDto[];
};
