import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entity/Todo';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ITodo } from './todo.interface';
import { TodoDao } from '../dao/Todo.dao';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>) {}

  async findAll(): Promise<ITodo[]> {
    return await this.todoRepo.find();
  }

  async findById(id: number): Promise<ITodo> {
    return await this.todoRepo.findOne(id);
  }

  async create(todoDato: TodoDao): Promise<ITodo> {
    return await this.todoRepo.save(todoDato);
  }

  async update(todoDao: TodoDao, id: number): Promise<UpdateResult> {
    return await this.todoRepo.update(id, todoDao);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepo.delete(id);
  }
}
