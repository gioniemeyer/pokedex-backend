/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonConroller";
import auth from "./middlewares/auth";
import Pokemon from "./entities/Pokemon";
import { getRepository } from "typeorm";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.get("/pokemons", auth, pokemonController.getPokemon);
app.post("/my-pokemons/:id/add", auth, pokemonController.catchPokemon);
app.post("/my-pokemons/:id/remove", auth, pokemonController.releasePokemon);

app.use("/populate", async (req,res)=>{
 
	for(let i = 1; i < 200; i ++){
	  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
	  const newPokemon = {
			id: result.data.id,
			name: result.data.name,
			number: result.data.order,
			image: result.data.sprites.front_default,
			weight: result.data.weight,
			height: result.data.height,
			baseExp: result.data.base_experience,
			description: ""
	  };
   
	  const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
	  newPokemon.description = speciesResult.data.flavor_text_entries[0].flavor_text.split("\n").join(" ");
	  const pokemon = getRepository(Pokemon).create(newPokemon);
	  const resultquery = await getRepository(Pokemon).save(pokemon);
	}
	res.send("OK");
});
   

export async function init () {
	await connectDatabase();
}

export default app;
