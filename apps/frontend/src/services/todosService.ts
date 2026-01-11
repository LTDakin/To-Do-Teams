import { api } from "./httpClient";
import { createTodoDto, updateTodoDto, shareTodoDto } from "../types";
const todosEndpoint = "todos";

function createTodo(todo: createTodoDto): Promise<any> {
  if (todo.title?.trim() === "") {
    throw new Error("New todo is empty");
  }

  if (todo.ownerId === undefined) {
    throw new Error("User is undefined");
  }

  return api.post(todosEndpoint, todo);
}

function patchTodo(id: number, todo: updateTodoDto): Promise<any> {
  return api.patch(`${todosEndpoint}/${id}`, todo);
}

function deleteTodo(id: number): Promise<any> {
  return api.delete(`${todosEndpoint}/${id}`);
}

function findMyTodos(): Promise<any> {
  return api.get(`${todosEndpoint}/user/me`);
}

function findOneTodo(id: number): Promise<any> {
  return api.get(`${todosEndpoint}/${id}`);
}

function shareTodo(share: shareTodoDto): Promise<any> {
  return api.post(`${todosEndpoint}/share/`, share);
}

export {
  createTodo,
  findMyTodos,
  patchTodo,
  deleteTodo,
  findOneTodo,
  shareTodo,
};
