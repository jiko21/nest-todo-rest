import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { ITodo } from './todo.interface';
import { TodoDao } from '../dao/Todo.dao';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos(): Promise<ITodo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  getTodo(@Param('id', new ParseIntPipe()) id: number): Promise<ITodo> {
    return this.todosService.findById(id);
  }

  @Post('')
  createTodo(@Body() todoDao: TodoDao): Promise<ITodo> {
    return this.todosService.create(todoDao)
  }

  @Put(':id')
  updateTodo(@Body() todoDao: TodoDao, @Param('id', new ParseIntPipe()) id: number): Promise<UpdateResult> {
    return this.todosService.update(todoDao, id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.todosService.delete(id);
  }
}
