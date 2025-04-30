import dbConnection from "server/db-connection.js";
import supertest from "supertest";
import express from "express";
import dotenv from "dotenv";
import { getSpices } from "../spicesController";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/spices", getSpices);

const request = supertest(app);

beforeAll(async () => {
  await dbConnection.connect();
});

describe("GET /spices", () => {
  test("should successfully reach GET request and check first spice", async () => {
    const res = await request
      .get("/spices") // the URL the test will go to to run the getSpices function
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined(); //confirm spices are not undefined
    expect(res.body[0]).toHaveProperty("name");
  });
});
