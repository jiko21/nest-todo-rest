import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import config from '../ormconfig.json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sqlitedb.db',
      synchronize: true,
      entities: [__dirname + '/entity/*{.ts,.js}'],
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
