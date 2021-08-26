import { getRepository } from "typeorm";
import { SignUpSchema } from "../schemas/loginSchemas";

import User from "../entities/User";
import { SignUpInterface } from "../interfaces/loginInterfaces";

export async function signUp (user: SignUpInterface) {


	const {error} = SignUpSchema.validate(user);

	if(error) return false;
	const users = await getRepository(User).find({
		select: ["id", "email"]
	});
  
	return users;
}
