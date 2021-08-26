/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRepository } from "typeorm";

import User from "../../src/entities/User";

export async function clearDatabase () {
	await getRepository(User).delete({});
}
