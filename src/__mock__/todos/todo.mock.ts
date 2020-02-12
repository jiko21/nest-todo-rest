import { ITodo } from '../../todos/todo.interface';
import { TodoDao } from '../../dao/Todo.dao';

export const TODOS_ARAY: ITodo[] = [
  {
    id: 1,
    title: 'rakuraku',
  },
  {
    id: 2,
    title: 'jest',
  },
];

export const TODOS: TodoDao = {
  title: 'Bitbucket',
};
