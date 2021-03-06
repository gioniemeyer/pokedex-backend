/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("dotenv").config();

module.exports = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	migrationsTableName: "migrations",
	entities: ["dist/entities/*.js"],
	migrations: ["dist/migrations/*.js"],
	ssl: {
		rejectUnauthorized: false,
	  },
	cli: {
		migrationsDir: "src/migrations",
		entitiesDir: "dist/entities/*.js"
	}
};