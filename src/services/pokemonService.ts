/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";

export async function getPokemon (userId: number) {

	const pokemons = await getRepository(Pokemon)
		.createQueryBuilder("pokemon")
		.leftJoinAndSelect("pokemon.users", "user", "user.id = :userId", {
			userId: userId,
		  })
		.orderBy("pokemon.id", "ASC")
		.getMany();

	const response = pokemons.map((pokemon: Pokemon) => {
		return {
			id: pokemon.id,
			name: pokemon.name,
			number: pokemon.number,
			image: pokemon.image,
			weight: pokemon.weight,
			height: pokemon.height,
			baseExp: pokemon.baseExp,
			description: pokemon.description,
			inMyPokemons: pokemon.users.length > 0,
		};
	});
	return response;
}

export async function catchOrRemovePokemon (userId: number, pokemonId: number, text: string) {
	const user = await getRepository(User).findOne({
		where: {id: userId}
	});

	const pokemon = await getRepository(Pokemon).findOne({
		where: {id: pokemonId},
		relations: ["users"],
	});

	if(text === "add") {
		pokemon.users.push(user);
		await getRepository(Pokemon).save(pokemon);
	} else {
		pokemon.users = pokemon.users.filter(u => u.id !== userId);
		await getRepository(Pokemon).save(pokemon);
	}

}