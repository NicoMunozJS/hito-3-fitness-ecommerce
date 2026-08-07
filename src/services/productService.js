import products from '../data/products';

// Simula una llamada a una futura API con un pequeño delay.
// En el Hito 3, el contenido de esta función se reemplaza por un fetch real,
// sin necesidad de tocar ProductContext ni ningún componente.
export function getAllProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}

export function getProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === Number(id));
      resolve(product);
    }, 300);
  });
}