import "../../src/setup";
import supertest from "supertest";
import generateSignUpBody from "../factories/userFactory";
import app from "../../src/app";
import { clearDatabase, endConnection, startConnection } from "../utils/database";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase);

describe("POST /sign-up", () => {
	it("should answer with text \"OK!\" and status 201", async () => {

		const user = generateSignUpBody();
		const response = await supertest(app).post("/sign-up").send(user);
		expect(response.status).toBe(201);
	});

	it("should answer with text \"OK!\" and status 400", async () => {

		const user = generateSignUpBody();
		user.email = "email-errado";
		const response = await supertest(app).post("/sign-up").send(user);
		expect(response.status).toBe(400);
	});

	it("should answer with text \"OK!\" and status 409", async () => {

		const user = generateSignUpBody();
		await supertest(app).post("/sign-up").send(user);
		const response = await supertest(app).post("/sign-up").send(user);
		expect(response.status).toBe(409);
	});
});
