/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getConnection, getManager } from "typeorm";
import { init } from "../../src/app";

export async function startConnection(){
	await init();
}
export async function endConnection(){
	await getConnection().close();
}

export async function clearDatabase () {
	await getManager().query("TRUNCATE users RESTART IDENTITY CASCADE");
	await getManager().query("TRUNCATE sessions RESTART IDENTITY CASCADE");
	await getManager().query("TRUNCATE pokemons_users_users RESTART IDENTITY CASCADE");
}

