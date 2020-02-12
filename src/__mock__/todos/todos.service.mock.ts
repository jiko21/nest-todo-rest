import { TODOS_ARAY } from './todo.mock';
import { TodoDao } from '../../dao/Todo.dao';

export const todoServiceMock = {
  findAll: () => TODOS_ARAY,
  findById: (id: number) => TODOS_ARAY[0],
  create: (todoDao: TodoDao) => todoDao,
};
