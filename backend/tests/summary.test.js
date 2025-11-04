import request from 'supertest';
import express from 'express';
import { connectDB } from '../src/config/db.js';
import { summarizedText } from '../src/controllers/summary.controller.js';

// Create a test app without the protected middleware
const testApp = express();
testApp.use(express.json());

// Add mock user to request
testApp.use((req, res, next) => {
    req.user = { _id: "6905f2b03e7fc47b998dbd8f" };
    next();
});

testApp.post("/api/summary", summarizedText);

beforeAll(async () => {
    await connectDB(); 
});

afterAll(async () => {
    const mongoose = await import('mongoose');
    await mongoose.default.connection.close();
});

describe("Summary Route", () => {
    it("should return 400 if no text is provided", async () => {
        const res = await request(testApp)
            .post("/api/summary")
            .send({ wordLimit: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Text is required");
    });

    it("should return 400 if userId is missing when no req.user", async () => {
        const appWithoutUser = express();
        appWithoutUser.use(express.json());
        appWithoutUser.post("/api/summary", summarizedText);

        const res = await request(appWithoutUser)
            .post("/api/summary")
            .send({ text: "Sample text", wordLimit: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("User Id is missing");
    });
});