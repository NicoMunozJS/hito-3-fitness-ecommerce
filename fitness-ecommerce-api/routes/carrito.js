const express = require("express");
const router = express.Router();

const pool = require("../db/conexion");
const verificarToken = require("../middleware/auth");

// Obtener carrito del usuario
router.get("/", verificarToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        ci.id,
        ci.producto_id,
        ci.cantidad,
        p.nombre,
        p.categoria,
        p.precio,
        p.descripcion,
        p.imagen
      FROM carrito_items ci
      INNER JOIN productos p
        ON ci.producto_id = p.id
      WHERE ci.usuario_id = $1
      ORDER BY ci.id
      `,
      [req.usuario.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el carrito",
    });
  }
});

// Agregar producto al carrito
router.post("/", verificarToken, async (req, res) => {
  try {
    const { producto_id, cantidad = 1 } = req.body;

    if (!producto_id) {
      return res.status(400).json({
        error: "producto_id es obligatorio",
      });
    }

    if (cantidad < 1) {
      return res.status(400).json({
        error: "La cantidad debe ser mayor a 0",
      });
    }

    // Verificar que el producto exista
    const producto = await pool.query(
      "SELECT id FROM productos WHERE id = $1",
      [producto_id]
    );

    if (producto.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Verificar si ya está en el carrito
    const existente = await pool.query(
      `
      SELECT id, cantidad
      FROM carrito_items
      WHERE usuario_id = $1
      AND producto_id = $2
      `,
      [req.usuario.id, producto_id]
    );

    if (existente.rows.length > 0) {
      const nuevaCantidad =
        existente.rows[0].cantidad + cantidad;

      const result = await pool.query(
        `
        UPDATE carrito_items
        SET cantidad = $1
        WHERE id = $2
        RETURNING *
        `,
        [nuevaCantidad, existente.rows[0].id]
      );

      return res.json({
        message: "Producto actualizado en el carrito",
        item: result.rows[0],
      });
    }

    const result = await pool.query(
      `
      INSERT INTO carrito_items
        (usuario_id, producto_id, cantidad)
      VALUES
        ($1, $2, $3)
      RETURNING *
      `,
      [req.usuario.id, producto_id, cantidad]
    );

    res.status(201).json({
      message: "Producto agregado al carrito",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al agregar producto al carrito",
    });
  }
});

// Cambiar cantidad de un producto
router.put("/:producto_id", verificarToken, async (req, res) => {
  try {
    const { cantidad } = req.body;
    const { producto_id } = req.params;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({
        error: "La cantidad debe ser mayor a 0",
      });
    }

    const result = await pool.query(
      `
      UPDATE carrito_items
      SET cantidad = $1
      WHERE usuario_id = $2
      AND producto_id = $3
      RETURNING *
      `,
      [cantidad, req.usuario.id, producto_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado en el carrito",
      });
    }

    res.json({
      message: "Cantidad actualizada",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el carrito",
    });
  }
});

// Eliminar producto del carrito
router.delete("/:producto_id", verificarToken, async (req, res) => {
  try {
    const { producto_id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM carrito_items
      WHERE usuario_id = $1
      AND producto_id = $2
      RETURNING *
      `,
      [req.usuario.id, producto_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado en el carrito",
      });
    }

    res.json({
      message: "Producto eliminado del carrito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al eliminar producto del carrito",
    });
  }
});

module.exports = router;