import "../../src/setup";
import supertest from "supertest";
import {generateSignUpBody, generateSignInBody, createUser} from "../factories/userFactory";
import app from "../../src/app";
import { clearDatabase, endConnection, startConnection } from "../utils/database";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase);

describe("POST /sign-up", () => {
	it("should answer with and status 201", async () => {

		const user = generateSignUpBody();
		const response = await supertest(app).post("/sign-up").send(user);
		expect(response.status).toBe(201);
	});

	it("should answer with and status 400", async () => {

		const user = generateSignUpBody();
		user.email = "wrong-email";
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


describe("POST /sign-in", () => {
	it("should answer with and status 200", async () => {

		const user = await createUser();
		const response = await supertest(app).post("/sign-in").send(user);
		expect(typeof response.body.token).toBe("string");
		expect(response.status).toBe(200);
	});

	it("should answer with and status 401", async () => {

		const user = await createUser();
		user.password = user.password + "err";
		const response = await supertest(app).post("/sign-in").send(user);
		expect(response.status).toBe(401);
	});

	it("should answer with and status 400", async () => {

		const user = generateSignInBody();
		user.email = "";
		console.log(user);
		const response = await supertest(app).post("/sign-in").send(user);
		expect(response.status).toBe(400);
	});

});
