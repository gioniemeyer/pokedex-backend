/* eslint-disable no-mixed-spaces-and-tabs */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingUsersTable1629990347145 implements MigrationInterface {
    name = "CreatingUsersTable1629990347145"

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("DROP TABLE \"users\"");
    }

}
