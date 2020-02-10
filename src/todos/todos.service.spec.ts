import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from '../entity/Todo';
import { createConnection, getConnection, getRepository, Repository } from 'typeorm';
import { TODOS, TODOS_ARAY } from '../__mock__/todo.mock';
import { ITodo } from './todo.interface';
import { TodoDao } from '../dao/Todo.dao';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Todo],
      synchronize: true,
      logging: false,
      name: 'test_todo_services',
    });
    repository = getRepository(Todo, 'test_todo_services');
    service = new TodosService(repository);
    await repository.save(TODOS_ARAY);
    return connection;
  });

  afterEach(async () => {
    await getConnection('test_todo_services').close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll success', async () => {
    expect(await service.findAll()).toEqual(TODOS_ARAY);
  });

  it('findById success with valid id', async () => {
    expect(await service.findById(1)).toEqual(TODOS_ARAY[0]);
  });

  it('findById failed with invalid id', async () => {
    expect(await service.findById(3)).toEqual(undefined);
  });

  it('create success', async() => {
    const RST = [
      ...TODOS_ARAY,
      {
        ...TODOS,
        id: 3,
      } as ITodo,
    ] as ITodo[];
    await service.create(TODOS);
    expect(await repository.find()).toEqual(RST);
  });

  it('create failed', async() => {
    try{
      await service.create({name: 'taro'} as any);
    }
    catch(e) {
      expect(await repository.find()).toEqual(TODOS_ARAY);
    }
  });

  it('update success', async() => {
    const RST = [
      TODOS_ARAY[0],
      {
        id: 2,
        title: '最高'
      } as ITodo,
    ] as ITodo[];
    await service.update({title: '最高'}, 2);
    expect(await repository.find()).toEqual(RST);
  });

  it('update failed with invalid params', async() => {
    try{
      await service.update({name: 'taro'} as any, 2);
    }
    catch(e) {
      expect(await repository.find()).toEqual(TODOS_ARAY);
    }
  });

  it('update failed with invalid id', async() => {
    try{
      await service.update({title: 'taro'} as any, 3);
    }
    catch(e) {
      expect(await repository.find()).toEqual(TODOS_ARAY);
    }
  });

  it('delete success', async() => {
    const RST = [
      TODOS_ARAY[0],
    ] as ITodo[];
    await service.delete(2);
    expect(await repository.find()).toEqual(RST);
  });

  it('delete failed', async() => {
    try{
      await service.delete(3);
    }
    catch(e) {
      expect(await repository.find()).toEqual(TODOS_ARAY);
    }
  });
});
