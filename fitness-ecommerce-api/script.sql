CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url TEXT
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL,
    descripcion TEXT,
    imagen TEXT
);

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios (id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos (id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 1
);