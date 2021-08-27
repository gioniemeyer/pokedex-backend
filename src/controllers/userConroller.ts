/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";
import { SignUpInterface, SignInInterface } from "../interfaces/loginInterfaces";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
	try {
		const user: SignUpInterface = req.body;

		const createUser = await userService.signUp(user);

		if(createUser === undefined) return res.sendStatus(400);
		if(createUser === false) return res.sendStatus(409);

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function signIn(req: Request, res: Response) {
	try {
		const user: SignInInterface = req.body;

		const token = await userService.signIn(user);

		if(token === undefined) return res.sendStatus(400);
		if(token === false) return res.sendStatus(401);

		res.status(200).send({ token });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}