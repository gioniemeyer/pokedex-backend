/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemon (req: Request, res: Response) {
	try {
		const userId = res.locals.userId;

		const pokemons = await pokemonService.getPokemon(userId);

		res.status(200).send(pokemons);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function catchPokemon (req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		const pokemonId = parseInt(req.params.id);
		const text = "add";

		await pokemonService.catchOrRemovePokemon(userId, pokemonId, text);

		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function releasePokemon (req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		const pokemonId = parseInt(req.params.id);
		const text = "remove";

		await pokemonService.catchOrRemovePokemon(userId, pokemonId, text);

		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}