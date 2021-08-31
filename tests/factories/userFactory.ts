/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "../../src/setup";
import faker from "faker";
import { getRepository } from "typeorm";
import User from "../../src/entities/User";
import bcrypt from "bcrypt";

export function generateSignUpBody () {
	const password = faker.internet.password();
	return {
		email: faker.internet.email(),
		password,
		confirmPassword: password
	};
}

export function generateSignInBody () {
	const password = faker.internet.password();
	return {
		email: faker.internet.email(),
		password,
	};
}

export async function createUser() {
	const user = generateSignInBody();
	const newUser = await getRepository(User).create({
		email: user.email,
		password: bcrypt.hashSync(user.password,10)
	});
	await getRepository(User).save(newUser);
	return 	user;
}


export default {generateSignUpBody, generateSignInBody, createUser};
