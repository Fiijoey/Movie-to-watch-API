const request = require('supertest');
const app = require('../server');
const mongodb = require('../data/database'); // import the database connection

beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) {
      done(err); // failure
    } else {
      done(); // success
    }
  });
});

afterAll((done) => {
    const client = mongodb.getDatabase();
    if (client) {
        client.close().then(() => done()).catch((err) => done(err));
    } else {
        done();
    }
});

describe("Get all movies", () => {

    it("should return all movies", async () => {
        const response = await request(app).get("/movies");
        const movie = response.body[0];
        expect(movie).toBeInstanceOf(Object);
        expect(movie).not.toBeNull();
        expect(movie.title).toBe('The Dark Knight');
        expect(response.statusCode).toBe(200);
    });

    it("should return message error", async () => {
        const invalid_id = "invalid_id";
        const response = await request(app).get("/movies/" + invalid_id);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid movie ID format");
        expect(response.statusCode).toBe(400);
    });
});

describe("Get all Users", () => {
    it("should return all movies", async () => {
        const response = await request(app).get("/users");
        const movie = response.body[0];
        expect(movie).toBeInstanceOf(Object);
        expect(movie).not.toBeNull();
        expect(response.statusCode).toBe(200);
    });

    it("should return message error", async () => {
        const invalid_id = "invalid_id";
        const response = await request(app).get("/users/" + invalid_id);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid User ID format");
        expect(response.statusCode).toBe(400);
    });
});

describe("Get all Reviews", () => {
    it("should return all reviews", async () => {
        const response = await request(app).get("/reviews");
        const movie = response.body[0];
        expect(movie).toBeInstanceOf(Object);
        expect(movie).not.toBeNull();
        expect(response.statusCode).toBe(200);
    });

    it("should return message error", async () => {
        const invalid_id = "invalid_id";
        const response = await request(app).get("/reviews/" + invalid_id);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid Review ID format");
        expect(response.statusCode).toBe(400);
    });

    it("should return message validation required when try create review", async () => {
        const invalid_review = {
            title: "",
            reting: "",
        };
        const response = await request(app).post("/reviews").send(invalid_review);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.error).toBe("An error occurred while creating the Review");
        expect(response.statusCode).toBe(500);
    });

    it("should return message validation required when try updated review", async () => {
        const invalid_review = {
            title: "",
            reting: "",
        };
        const invalid_id = "invalid_id";
        const response = await request(app).put("/reviews/" + invalid_id).send(invalid_review);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.error).toBe("An error occurred while updating the Review");
        expect(response.statusCode).toBe(500);
    });
});