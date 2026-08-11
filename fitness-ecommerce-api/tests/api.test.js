const request = require("supertest");
const app = require("../server");

describe("API Fitness Ecommerce", () => {

  test("GET /api/productos debe devolver 200", async () => {
    const response = await request(app)
      .get("/api/productos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/productos/9999 debe devolver 404", async () => {
    const response = await request(app)
      .get("/api/productos/9999");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
  });

  test("POST /api/auth/login con credenciales correctas debe devolver 200", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario2@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login exitoso");
    expect(response.body.token).toBeDefined();
  });

  test("POST /api/auth/login con contraseña incorrecta debe devolver 401", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario2@test.com",
        password: "passwordIncorrecta",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Credenciales incorrectas");
  });

});