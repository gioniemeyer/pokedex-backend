
import supertest from "supertest";
import generateSignUpBody from "../factories/userFactory";
import app from "../../src/app";
import { clearDatabase, endConnection, startConnection } from "../utils/database";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase);

describe("GET /sign-up", () => {
	it("should answer with text \"OK!\" and status 201", async () => {

		const user = generateSignUpBody();
		console.log(user);
		const response = await supertest(app).post("/sign-up").send(user);
		expect(response.status).toBe(201);
	});
});
