import {MigrationInterface, QueryRunner} from "typeorm";

export class todo1581144878935 implements MigrationInterface {
    name = 'todo1581144878935'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "todo"`, undefined);
    }

}
