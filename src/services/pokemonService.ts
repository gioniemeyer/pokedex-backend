/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

export async function getPokemon (userId: number) {

	const pokemons = await getRepository(Pokemon)
		.createQueryBuilder("pokemon")
		// .leftJoinAndSelect("pokemon.users", "users")
		.getMany();

	console.log(userId);

	console.log(pokemons);
	return pokemons;
}