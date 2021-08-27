/* eslint-disable no-mixed-spaces-and-tabs */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingPokemonsUsersRelationalTable1630033186832 implements MigrationInterface {
    name = "CreatingPokemonsUsersRelationalTable1630033186832"

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("CREATE TABLE \"pokemonsUsers\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"pokemonId\" integer NOT NULL, CONSTRAINT \"PK_602e702b0438adc6f010f1e140e\" PRIMARY KEY (\"id\"))");
    	await queryRunner.query("CREATE TABLE \"pokemons_users\" (\"pokemonsId\" integer NOT NULL, \"usersId\" integer NOT NULL, CONSTRAINT \"PK_15184e7b10aabbc5e97c2129c8b\" PRIMARY KEY (\"pokemonsId\", \"usersId\"))");
    	await queryRunner.query("CREATE INDEX \"IDX_703c8f8041ef2c3585514339c1\" ON \"pokemons_users\" (\"pokemonsId\") ");
    	await queryRunner.query("CREATE INDEX \"IDX_7ab03e9faba604ae4b3a0b76fd\" ON \"pokemons_users\" (\"usersId\") ");
    	await queryRunner.query("ALTER TABLE \"pokemonsUsers\" ADD CONSTRAINT \"FK_9950a15a4d2bf490a0df9e7d1ee\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    	await queryRunner.query("ALTER TABLE \"pokemonsUsers\" ADD CONSTRAINT \"FK_597fa92dd8d4ebaede44e316179\" FOREIGN KEY (\"pokemonId\") REFERENCES \"pokemons\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    	await queryRunner.query("ALTER TABLE \"pokemons_users\" ADD CONSTRAINT \"FK_703c8f8041ef2c3585514339c18\" FOREIGN KEY (\"pokemonsId\") REFERENCES \"pokemons\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    	await queryRunner.query("ALTER TABLE \"pokemons_users\" ADD CONSTRAINT \"FK_7ab03e9faba604ae4b3a0b76fd4\" FOREIGN KEY (\"usersId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("ALTER TABLE \"pokemons_users\" DROP CONSTRAINT \"FK_7ab03e9faba604ae4b3a0b76fd4\"");
    	await queryRunner.query("ALTER TABLE \"pokemons_users\" DROP CONSTRAINT \"FK_703c8f8041ef2c3585514339c18\"");
    	await queryRunner.query("ALTER TABLE \"pokemonsUsers\" DROP CONSTRAINT \"FK_597fa92dd8d4ebaede44e316179\"");
    	await queryRunner.query("ALTER TABLE \"pokemonsUsers\" DROP CONSTRAINT \"FK_9950a15a4d2bf490a0df9e7d1ee\"");
    	await queryRunner.query("DROP INDEX \"IDX_7ab03e9faba604ae4b3a0b76fd\"");
    	await queryRunner.query("DROP INDEX \"IDX_703c8f8041ef2c3585514339c1\"");
    	await queryRunner.query("DROP TABLE \"pokemons_users\"");
    	await queryRunner.query("DROP TABLE \"pokemonsUsers\"");
    }

}
