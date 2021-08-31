import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, endConnection, startConnection } from "../utils/database";
import { createUser } from "../factories/userFactory";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase);

describe("GET /pokemons", () => {
	it("should answer with and status 200", async () => {
		const user = await createUser();
		const loggedUser = await supertest(app).post("/sign-in").send({
			email: user.email,
			password: user.password
		});
		const token = loggedUser.body.token;

		const response = await supertest(app).get("/pokemons")
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
	});

});

