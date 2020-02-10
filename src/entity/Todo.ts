import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ITodo } from '../todos/todo.interface';

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
}
