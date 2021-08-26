import { Request, Response } from "express";
import { SignUpInterface } from "../interfaces/loginInterfaces";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
	try {
		const user: SignUpInterface = req.body;

		const createUser = await userService.signUp(user);

		if(!createUser) return res.sendStatus(401);

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}
