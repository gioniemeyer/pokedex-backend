/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "../../src/setup";
import faker from "faker";

export default function generateSignUpBody () {
	const password = faker.internet.password();
	return {
		email: faker.internet.email(),
		password,
		confirmPassword: password
	};
}

// const user = generateSignUpBody();
// const signInBody = {
// 	email: user.email,
// 	password: user.password
// };
// const incompleteSignInBody = {
// 	email: user.email
// };
// const wrongSignInBody = {
// 	email: user.email,
// 	password: user.password + "erro"
// };

