/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from "typeorm";
import { SignUpSchema } from "../schemas/loginSchemas";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import User from "../entities/User";
import { SignUpInterface, SignInInterface } from "../interfaces/loginInterfaces";
import Session from "../entities/Session";

export async function signUp (user: SignUpInterface) {

	const {error} = SignUpSchema.validate(user);
	if(error) return undefined;

	const { email, password } = user;

	const existingUser = await validateEmail(email);

	if (existingUser) return false;

	const hashedPassword = bcrypt.hashSync(password, 10);

	await getRepository(User).insert({ email, password: hashedPassword });

	return true;
}

async function validateEmail(email: string) {
	const user = await getRepository(User).findOne({
		where: { email },
	});

	return user;
}

export async function signIn(user:SignInInterface) {

	const {error} = SignUpSchema.validate(user);
	if(error) return undefined;

	const { email, password } = user;
	const existingUser = await validateEmail(email);
	if (existingUser && !bcrypt.compareSync(existingUser.password, password)) {
		const token = uuid();
		await getRepository(Session).insert({token, userId: existingUser.id});
		return token;
	}
	return false;
}

export async function authenticate(token: string) {
	const sessionRepository = getRepository(Session);
  
	const session = await sessionRepository.findOne({
	  where: { token },
	  relations: ["user"],
	});
  
	if (session) {
	  return session.user;
	} else {
	  return null;
	}
}
  