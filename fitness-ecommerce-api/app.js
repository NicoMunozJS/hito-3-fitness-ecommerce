const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productosRoutes = require("./routes/productos");
const authRoutes = require("./routes/auth");
const carritoRoutes = require("./routes/carrito");
const verificarToken = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carrito", carritoRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Fitness Ecommerce funcionando",
  });
});

app.get("/api/auth/protegida", verificarToken, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    usuario: req.usuario,
  });
});

module.exports = app;