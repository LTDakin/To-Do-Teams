import { api } from "./httpClient";
import { createTodoDto, updateTodoDto } from "../types";
const todosEndpoint = "todos";

function createTodo(todo: createTodoDto): Promise<any> {
  return api.post(todosEndpoint, todo);
}

function patchTodo(id: number, todo: updateTodoDto): Promise<any> {
  return api.patch(`${todosEndpoint}/${id}`, todo);
}

function deleteTodo(id: number): Promise<any> {
  return api.delete(`${todosEndpoint}/${id}`);
}

function findUsersTodos(userId: number): Promise<any> {
  return api.get(`${todosEndpoint}?userId=${userId}`);
}

export { createTodo, findUsersTodos, patchTodo, deleteTodo };
