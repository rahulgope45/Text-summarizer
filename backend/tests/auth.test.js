import request from "supertest";
import app from "../server.js";

describe("Auth Routes", ()=>{
    it("should return 400 if no credentials provided", async() =>{
        const res = await request(app).post("/api/auth/login").send({});
        expect(res.statusCode).toBe(400)
    })
})