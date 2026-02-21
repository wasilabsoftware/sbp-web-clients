export interface ProductWeight {
  label: string;
  price: number;
  unit: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryId: string;
  categoryColor: "red" | "green";
  description: string;
  shortDescription: string;
  weights: ProductWeight[];
  defaultWeightIndex: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
  tags: string[];
}

export const products: Product[] = [
  // ---- BERRIES FRESCOS ----
  {
    id: "fresas-premium",
    slug: "fresas-premium",
    name: "Fresas Premium",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red",
    description:
      "Fresas seleccionadas del valle de Cañete. Cosechadas en su punto óptimo de madurez, sin preservantes. Ideales para smoothies, postres, snacks saludables o con yogurt.",
    shortDescription: "Frescas del día",
    weights: [
      { label: "500g (Clamshell)", price: 9, unit: "500g" },
      { label: "1 kg", price: 18, unit: "1kg" },
      { label: "2 kg", price: 35, unit: "2kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1525604155062-d5b01d84ad81?w=800&q=80",
      "https://images.unsplash.com/photo-1569613562636-7492d9f77aed?w=800&q=80",
      "https://images.unsplash.com/photo-1599034596263-63c68c75ef8b?w=800&q=80",
      "https://images.unsplash.com/photo-1645453146680-7d7304b5543b?w=800&q=80",
    ],
    tags: ["popular", "featured"],
  },
  {
    id: "arandanos-frescos",
    slug: "arandanos-frescos",
    name: "Arándanos Frescos",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red",
    description:
      "Arándanos frescos y jugosos, ricos en antioxidantes. Perfectos para smoothies, ensaladas o como snack saludable. Fuente de vitamina C y fibra.",
    shortDescription: "Antioxidantes naturales",
    weights: [
      { label: "125g", price: 5, unit: "125g" },
      { label: "250g", price: 9, unit: "250g" },
      { label: "500g", price: 16, unit: "500g" },
      { label: "1 kg", price: 30, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1758820609344-b01c8c6b3406?w=800&q=80",
    ],
    tags: ["popular", "featured"],
  },
  {
    id: "moras-silvestres",
    slug: "moras-silvestres",
    name: "Moras Silvestres",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red",
    description:
      "Moras silvestres con sabor intenso y dulce natural. Ideales para postres, mermeladas o disfrutar al natural. Ricas en vitamina C y antioxidantes.",
    shortDescription: "Sabor intenso",
    weights: [
      { label: "250g", price: 12, unit: "250g" },
      { label: "500g", price: 22, unit: "500g" },
      { label: "1 kg", price: 40, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1723746546836-85e9857c5d19?w=800&q=80",
    ],
    tags: ["featured"],
  },
  {
    id: "frambuesas",
    slug: "frambuesas",
    name: "Frambuesas",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red",
    description:
      "Frambuesas frescas con aroma delicado y sabor único. Perfectas para repostería, toppings de postres o smoothie bowls.",
    shortDescription: "Delicadas y aromáticas",
    weights: [
      { label: "125g", price: 12, unit: "125g" },
      { label: "250g", price: 22, unit: "250g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.6,
    reviewCount: 34,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=600",
    ],
    tags: [],
  },
  {
    id: "cerezas",
    slug: "cerezas",
    name: "Cerezas",
    category: "Berries",
    categoryId: "berries",
    categoryColor: "red",
    description:
      "Cerezas dulces importadas, firmes y crujientes. Perfectas como snack premium o para decoración de postres.",
    shortDescription: "Importadas premium",
    weights: [
      { label: "250g", price: 18, unit: "250g" },
      { label: "500g", price: 32, unit: "500g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.8,
    reviewCount: 41,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1530176611600-d05a6387d07c?w=600",
    ],
    tags: [],
  },
  // ---- ESPECIALES ----
  {
    id: "aguaymanto",
    slug: "aguaymanto",
    name: "Aguaymanto",
    category: "Especiales",
    categoryId: "especiales",
    categoryColor: "green",
    description:
      "Aguaymanto peruano, superfood andino rico en vitaminas A, B y C. Sabor agridulce único, perfecto como snack o en ensaladas. También conocido como goldenberry.",
    shortDescription: "Superfruta peruana",
    weights: [
      { label: "200g", price: 8, unit: "200g" },
      { label: "500g", price: 18, unit: "500g" },
      { label: "1 kg", price: 32, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.8,
    reviewCount: 72,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1698747789735-011173b068f2?w=800&q=80",
    ],
    tags: ["popular", "featured"],
  },
  // ---- FRUTOS SECOS ----
  {
    id: "pistachos",
    slug: "pistachos",
    name: "Pistachos",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green",
    description:
      "Pistachos tostados con sal. Snack nutritivo rico en proteínas, fibra y grasas saludables. Perfecto para picar entre comidas.",
    shortDescription: "Tostados con sal",
    weights: [
      { label: "150g", price: 15, unit: "150g" },
      { label: "250g", price: 22, unit: "250g" },
      { label: "500g", price: 40, unit: "500g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1721976505728-1d2a5ee8de5f?w=600",
    ],
    tags: [],
  },
  {
    id: "almendras",
    slug: "almendras",
    name: "Almendras",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green",
    description:
      "Almendras naturales, fuente de vitamina E, magnesio y grasas saludables. Ideales para snacking, repostería o granola.",
    shortDescription: "Naturales",
    weights: [
      { label: "200g", price: 14, unit: "200g" },
      { label: "500g", price: 30, unit: "500g" },
      { label: "1 kg", price: 55, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.6,
    reviewCount: 27,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600",
    ],
    tags: [],
  },
  {
    id: "nueces",
    slug: "nueces",
    name: "Nueces",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green",
    description:
      "Nueces de California, ricas en omega-3 y antioxidantes. Perfectas para ensaladas, postres o como snack saludable.",
    shortDescription: "Omega-3 natural",
    weights: [
      { label: "200g", price: 16, unit: "200g" },
      { label: "500g", price: 35, unit: "500g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.5,
    reviewCount: 19,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1563412885-2d9f8a0b7268?w=600",
    ],
    tags: [],
  },
  {
    id: "castanas",
    slug: "castanas",
    name: "Castañas de Brasil",
    category: "Frutos Secos",
    categoryId: "frutos-secos",
    categoryColor: "green",
    description:
      "Castañas de Brasil, fuente natural de selenio y minerales esenciales. De la Amazonía peruana directamente a tu mesa.",
    shortDescription: "De la Amazonía",
    weights: [
      { label: "200g", price: 18, unit: "200g" },
      { label: "500g", price: 40, unit: "500g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600",
    ],
    tags: [],
  },
  // ---- DESHIDRATADOS ----
  {
    id: "arandanos-deshidratados",
    slug: "arandanos-deshidratados",
    name: "Arándanos Deshidratados",
    category: "Deshidratados",
    categoryId: "deshidratados",
    categoryColor: "green",
    description:
      "Arándanos deshidratados, perfectos para granola, trail mix o repostería. Conservan sus antioxidantes y nutrientes.",
    shortDescription: "Para granola y snacking",
    weights: [
      { label: "100g", price: 8, unit: "100g" },
      { label: "250g", price: 18, unit: "250g" },
      { label: "500g", price: 32, unit: "500g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.5,
    reviewCount: 22,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600",
    ],
    tags: [],
  },
  {
    id: "mango-deshidratado",
    slug: "mango-deshidratado",
    name: "Mango Deshidratado",
    category: "Deshidratados",
    categoryId: "deshidratados",
    categoryColor: "green",
    description:
      "Láminas de mango peruano deshidratado. Dulce natural sin azúcar añadida. Snack saludable y energizante.",
    shortDescription: "Sin azúcar añadida",
    weights: [
      { label: "100g", price: 10, unit: "100g" },
      { label: "250g", price: 22, unit: "250g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600",
    ],
    tags: [],
  },
  // ---- CONGELADOS ----
  {
    id: "mix-berries-congelados",
    slug: "mix-berries-congelados",
    name: "Mix de Berries Congelados",
    category: "Congelados",
    categoryId: "congelados",
    categoryColor: "red",
    description:
      "Mezcla de arándanos, fresas, moras y frambuesas congelados IQF. Ideales para smoothies, bowls y postres. Duran hasta 12 meses en freezer.",
    shortDescription: "Para smoothies y bowls",
    weights: [
      { label: "500g", price: 18, unit: "500g" },
      { label: "1 kg", price: 32, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=600",
    ],
    tags: ["popular"],
  },
  {
    id: "fresas-congeladas",
    slug: "fresas-congeladas",
    name: "Fresas Congeladas",
    category: "Congelados",
    categoryId: "congelados",
    categoryColor: "red",
    description:
      "Fresas congeladas IQF, perfectas para smoothies, helados caseros y repostería. Conservan sabor y nutrientes.",
    shortDescription: "IQF para smoothies",
    weights: [
      { label: "500g", price: 12, unit: "500g" },
      { label: "1 kg", price: 22, unit: "1kg" },
    ],
    defaultWeightIndex: 0,
    rating: 4.6,
    reviewCount: 31,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
    ],
    tags: [],
  },
  // ---- SUPER SNACKS ----
  {
    id: "super-snack-gratitud",
    slug: "super-snack-gratitud",
    name: "Súper Snack Gratitud",
    category: "Súper Snacks",
    categoryId: "super-snacks",
    categoryColor: "green",
    description:
      "Mix premium de arándanos, almendras, castañas y cacao nibs. Energía natural para tu día. Perfecto para la oficina o el gym.",
    shortDescription: "Mix energizante",
    weights: [
      { label: "100g", price: 12, unit: "100g" },
      { label: "250g", price: 25, unit: "250g" },
    ],
    defaultWeightIndex: 0,
    rating: 4.9,
    reviewCount: 63,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1583440772344-edd2e043742c?w=600",
    ],
    tags: ["popular"],
  },
  // ---- FRUTAS FRESCAS ----
  {
    id: "pitahaya",
    slug: "pitahaya",
    name: "Pitahaya",
    category: "Frutas Frescas",
    categoryId: "frutas",
    categoryColor: "green",
    description:
      "Pitahaya (fruta del dragón) fresca. Pulpa blanca con semillas negras, dulce y refrescante. Rica en fibra y vitamina C.",
    shortDescription: "Fruta del dragón",
    weights: [
      { label: "1 unidad", price: 12, unit: "unidad" },
      { label: "3 unidades", price: 30, unit: "3 unidades" },
    ],
    defaultWeightIndex: 0,
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1527325678964-54921661f888?w=600",
    ],
    tags: [],
  },
  {
    id: "granadilla",
    slug: "granadilla",
    name: "Granadilla",
    category: "Frutas Frescas",
    categoryId: "frutas",
    categoryColor: "green",
    description:
      "Granadilla dulce peruana. Pulpa gelatinosa con sabor dulce natural. Rica en vitaminas A y C. Excelente para jugos.",
    shortDescription: "Dulce natural",
    weights: [
      { label: "6 unidades", price: 10, unit: "6 unidades" },
      { label: "12 unidades", price: 18, unit: "12 unidades" },
    ],
    defaultWeightIndex: 0,
    rating: 4.5,
    reviewCount: 16,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600",
    ],
    tags: [],
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.tags.includes("featured"));
}

export function getAllCategories() {
  return [
    { id: "todos", name: "Todos" },
    { id: "berries", name: "Berries" },
    { id: "congelados", name: "Congelados" },
    { id: "frutos-secos", name: "Frutos Secos" },
    { id: "super-snacks", name: "Súper Snacks" },
    { id: "deshidratados", name: "Deshidratados" },
    { id: "frutas", name: "Frutas Frescas" },
    { id: "especiales", name: "Especiales" },
  ];
}
