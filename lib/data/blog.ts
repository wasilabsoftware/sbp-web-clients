export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  tags: string[];
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "beneficios-arandanos-salud",
    title: "7 Beneficios de los Arándanos para tu Salud",
    excerpt:
      "Los arándanos son una de las frutas más nutritivas del planeta. Descubre por qué deberías incluirlos en tu dieta diaria.",
    content: `
Los arándanos son considerados un superalimento por su extraordinaria concentración de antioxidantes, vitaminas y minerales. Aquí te contamos los 7 beneficios más importantes:

## 1. Potentes antioxidantes
Los arándanos contienen antocianinas, flavonoides que les dan su color azul característico y actúan como poderosos antioxidantes que protegen tus células del daño oxidativo.

## 2. Mejoran la memoria
Estudios científicos demuestran que el consumo regular de arándanos mejora la función cognitiva y puede retrasar el deterioro mental relacionado con la edad.

## 3. Reducen la presión arterial
El consumo diario de arándanos puede reducir la presión arterial sistólica, beneficiando la salud cardiovascular.

## 4. Ayudan a prevenir infecciones urinarias
Las proantocianidinas presentes en los arándanos impiden que las bacterias se adhieran a las paredes del tracto urinario.

## 5. Reducen el colesterol
Los antioxidantes de los arándanos ayudan a reducir el colesterol LDL (malo), disminuyendo el riesgo de enfermedades cardíacas.

## 6. Controlan el azúcar en sangre
A pesar de ser dulces, los arándanos tienen un índice glucémico bajo y pueden mejorar la sensibilidad a la insulina.

## 7. Son antiinflamatorios
Sus compuestos bioactivos reducen la inflamación crónica, factor de riesgo para enfermedades como diabetes, cáncer y Alzheimer.

## ¿Cómo consumirlos?
- **Frescos:** Como snack, en ensaladas o con yogurt
- **En smoothies:** Combínalos con plátano y leche de almendras
- **Congelados:** Mantienen sus nutrientes y son ideales para batidos

En Super Berries Perú encontrarás arándanos frescos desde S/ 5 con delivery en Lima.
    `.trim(),
    category: "Nutrición",
    author: "Super Berries Perú",
    publishedAt: "2025-12-15",
    updatedAt: "2025-12-15",
    image:
      "https://images.unsplash.com/photo-1758820609344-b01c8c6b3406?w=800&q=80",
    imageAlt: "Arándanos frescos ricos en antioxidantes",
    tags: ["arándanos", "antioxidantes", "salud", "nutrición"],
    readingTime: 5,
  },
  {
    slug: "smoothie-bowls-berries-recetas",
    title: "5 Recetas de Smoothie Bowls con Berries",
    excerpt:
      "Empieza tu día con energía. Te compartimos 5 recetas fáciles y deliciosas de smoothie bowls con berries frescos y congelados.",
    content: `
Los smoothie bowls son la forma perfecta de comenzar el día con energía y nutrición. Usando berries frescos o congelados, puedes crear desayunos espectaculares en minutos.

## 1. Bowl de Açaí con Arándanos

**Ingredientes:**
- 1 taza de berries congelados (mix)
- 1 plátano congelado
- ½ taza de leche de almendras
- Toppings: arándanos frescos, granola, coco rallado

**Preparación:** Licúa los ingredientes congelados con la leche hasta obtener una consistencia espesa. Sirve en un bowl y decora con los toppings.

## 2. Bowl Tropical de Fresas

**Ingredientes:**
- 1 taza de fresas congeladas
- ½ mango congelado
- ½ taza de yogurt griego
- Toppings: fresas frescas, semillas de chía, miel

## 3. Bowl Antioxidante de Moras

**Ingredientes:**
- 1 taza de moras
- ½ taza de frambuesas
- 1 plátano
- Toppings: almendras, arándanos deshidratados, cacao nibs

## 4. Bowl Proteico de Aguaymanto

**Ingredientes:**
- ½ taza de aguaymanto
- 1 scoop de proteína vainilla
- 1 plátano congelado
- ½ taza de leche
- Toppings: aguaymanto fresco, nueces, granola

## 5. Bowl Verde con Berries

**Ingredientes:**
- 1 taza de espinaca
- ½ taza de fresas
- ½ taza de arándanos
- 1 plátano
- Toppings: frambuesas, semillas de hemp, mantequilla de maní

## Tips para el smoothie bowl perfecto
- Usa fruta **congelada** para obtener la textura espesa ideal
- Añade líquido **de a pocos** para no hacerlo muy líquido
- Prepara los toppings antes de licuar

Encuentra todos los berries que necesitas en nuestra tienda online con delivery en Lima.
    `.trim(),
    category: "Recetas",
    author: "Super Berries Perú",
    publishedAt: "2025-11-20",
    updatedAt: "2025-11-20",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    imageAlt: "Smoothie bowl con berries frescos",
    tags: ["recetas", "smoothie bowl", "desayuno", "berries"],
    readingTime: 4,
  },
  {
    slug: "conservar-berries-frescos-mas-tiempo",
    title: "Cómo Conservar tus Berries Frescos por Más Tiempo",
    excerpt:
      "Aprende las mejores técnicas para mantener tus berries frescos, crujientes y deliciosos por más días.",
    content: `
¿Tus berries se malogran antes de tiempo? Con estos consejos podrás disfrutarlos frescos por mucho más tiempo.

## Regla #1: No los laves hasta usarlos

La humedad es el enemigo de los berries. Lávalos justo antes de consumirlos, nunca al guardarlos. Si necesitas lavarlos, sécalos completamente con papel toalla.

## Almacenamiento correcto por tipo

### Fresas
- Guárdalas en un recipiente con papel toalla en el fondo
- No les quites el tallo hasta el momento de consumirlas
- Duración en refrigerador: 5-7 días

### Arándanos
- Son los más resistentes de los berries
- Guárdalos en su envase original o en un recipiente ventilado
- Duración en refrigerador: 7-10 días

### Moras y frambuesas
- Son las más delicadas, consúmelas pronto
- Colócalas en una sola capa sobre papel toalla
- Duración en refrigerador: 2-3 días

### Aguaymanto
- Con cáscara duran más (hasta 2 semanas)
- Sin cáscara, trátalo como otros berries
- Duración en refrigerador: 7-14 días

## El truco del vinagre

Prepara una solución con 1 parte de vinagre blanco y 3 partes de agua. Sumerge los berries por 30 segundos, enjuaga con agua fría y seca bien. Esto elimina esporas de moho y alarga la vida útil hasta el doble.

## Congelación: la mejor opción a largo plazo

1. Lava y seca completamente los berries
2. Colócalos en una bandeja en una sola capa
3. Congélalos por 2 horas
4. Transfiérelos a una bolsa hermética
5. Duran hasta 12 meses en el freezer

Los berries congelados conservan el 95% de sus nutrientes y son perfectos para smoothies y postres.

## ¿Sabías que...?

En Super Berries Perú ofrecemos berries congelados IQF (Individual Quick Frozen) que conservan textura, sabor y nutrientes. Ideales si prefieres tener stock permanente.
    `.trim(),
    category: "Tips",
    author: "Super Berries Perú",
    publishedAt: "2025-10-05",
    updatedAt: "2025-10-05",
    image:
      "https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=800&q=80",
    imageAlt: "Berries frescos almacenados correctamente",
    tags: ["conservación", "tips", "almacenamiento", "berries frescos"],
    readingTime: 4,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
