import {MigrationInterface, QueryRunner} from "typeorm";

export class createEvent1641779793461 implements MigrationInterface {
    name = 'createEvent1641779793461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "start" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "start" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "name", "start", "userId") SELECT "id", "name", "start", "userId" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "start" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "event"("id", "name", "start", "userId") SELECT "id", "name", "start", "userId" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
