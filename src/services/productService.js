const API_URL = 'http://localhost:3000/api/productos';

export async function getAllProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Producto no encontrado');
  }

  return response.json();
}