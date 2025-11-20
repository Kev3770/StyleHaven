export const products = [
  {
    id: 1,
    name: "Camisa Elegante Blanca",
    price: 49.99,
    category: "camisas",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&fit=crop",
    description: "Camisa de algodón 100% para ocasiones especiales",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Azul claro", "Beige"],
    inStock: true,
    featured: true,
    discount: 0
  },
  {
    id: 2,
    name: "Jeans Slim Fit",
    price: 59.99,
    category: "pantalones",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&fit=crop",
    description: "Jeans modernos con corte slim fit, máxima comodidad",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Azul oscuro", "Negro", "Gris"],
    inStock: true,
    featured: true,
    discount: 10
  },
  {
    id: 3,
    name: "Zapatos Casuales de Cuero",
    price: 79.99,
    category: "zapatos",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&fit=crop",
    description: "Zapatos casuales ideales para el día a día",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Marrón", "Negro", "Azul marino"],
    inStock: true,
    featured: true,
    discount: 0
  },
  {
    id: 4,
    name: "Suéter de Lana",
    price: 65.99,
    category: "sueters",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&fit=crop",
    description: "Suéter cálido y suave para temporada de frío",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Burdeos"],
    inStock: true,
    featured: false,
    discount: 15
  },
  {
    id: 5,
    name: "Vestido Floral Veraniego",
    price: 55.99,
    category: "vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&fit=crop",
    description: "Vestido ligero con estampado floral para el verano",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral", "Azul", "Rosa"],
    inStock: true,
    featured: false,
    discount: 0
  },
  {
    id: 6,
    name: "Chaqueta Denim",
    price: 75.99,
    category: "chaquetas",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&fit=crop",
    description: "Chaqueta estilo denim clásica y versátil",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul claro", "Azul oscuro", "Negro"],
    inStock: false,
    featured: false,
    discount: 20
  },
  {
    id: 7,
    name: "Falda Plisada",
    price: 42.99,
    category: "faldas",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&fit=crop",
    description: "Falda elegante con pliegues para look formal",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Gris", "Burdeos"],
    inStock: true,
    featured: true,
    discount: 0
  },
  {
    id: 8,
    name: "Blazer Moderno",
    price: 89.99,
    category: "blazers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&fit=crop",
    description: "Blazer profesional para ocasiones de negocios",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul marino", "Gris"],
    inStock: true,
    featured: false,
    discount: 5
  },
  {
    id: 9,
    name: "Camiseta Básica Blanca",
    price: 24.99,
    category: "camisas",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&fit=crop",
    description: "Camiseta básica de algodón para uso diario",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris"],
    inStock: true,
    featured: false,
    discount: 0
  },
  {
    id: 10,
    name: "Shorts Deportivos",
    price: 35.99,
    category: "pantalones",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&fit=crop",
    description: "Shorts cómodos para actividades deportivas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul", "Verde"],
    inStock: true,
    featured: false,
    discount: 0
  },
  {
    id: 11,
    name: "Sandalias de Verano",
    price: 45.99,
    category: "zapatos",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&fit=crop",
    description: "Sandalias cómodas y frescas para el verano",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Marrón", "Negro", "Beige"],
    inStock: true,
    featured: false,
    discount: 10
  },
  {
    id: 12,
    name: "Abrigo Invernal",
    price: 120.99,
    category: "chaquetas",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&fit=crop",
    description: "Abrigo cálido para los días más fríos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Azul marino"],
    inStock: true,
    featured: true,
    discount: 15
  }
];

export const categories = [
  { id: "camisas", name: "Camisas", count: 12 },
  { id: "pantalones", name: "Pantalones", count: 8 },
  { id: "zapatos", name: "Zapatos", count: 15 },
  { id: "sueters", name: "Súeters", count: 6 },
  { id: "vestidos", name: "Vestidos", count: 10 },
  { id: "chaquetas", name: "Chaquetas", count: 7 },
  { id: "faldas", name: "Faldas", count: 9 },
  { id: "blazers", name: "Blazers", count: 5 }
];

// Función para obtener productos por categoría
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Función para obtener productos destacados
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Función para buscar productos
export const searchProducts = (query) => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};

// Función para obtener un producto por ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};