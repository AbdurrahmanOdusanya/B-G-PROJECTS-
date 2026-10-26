export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  propertyType: string;
  bedrooms: number | string;
  bathrooms?: number;
  typology: 'Detached' | 'Semi-Detached' | 'Semi detached' | string;
  floors: number | string;
  size: string;
  tagline: string;
  description: string;
  heroImage: string;
  secondaryImage: string;
  gallery?: string[];
  year: string;
  aspectRatio?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'graceville',
    slug: 'graceville',
    name: 'GraceVille',
    location: 'Egin Street, Ojodu Berger',
    price: '$650,000',
    status: 'Completed',
    propertyType: 'Semi detached',
    bedrooms: '3 suites + BQ',
    bathrooms: 4,
    typology: 'Semi detached',
    floors: '2 floors',
    size: '210m²',
    tagline: 'Refined semi-detached residence crafted for modern family living with timeless architectural elegance.',
    description: 'GraceVille presents exceptional modern living at Egin Street, Ojodu Berger. Thoughtfully designed across 2 floors with 210m² of optimal architectural space, featuring 3 suites plus dedicated BQ, premium craftsmanship, and effortless comfort.',
    heroImage: '/assets/GraceVille/main.webp',
    secondaryImage: '/assets/GraceVille/1.webp',
    gallery: [
      '/assets/GraceVille/1.webp',
      '/assets/GraceVille/2.webp',
      '/assets/GraceVille/3.webp',
      '/assets/GraceVille/4.webp',
      '/assets/GraceVille/5.webp',
      '/assets/GraceVille/6.webp',
      '/assets/GraceVille/7.webp',
      '/assets/GraceVille/8.webp',
      '/assets/GraceVille/9.webp',
      '/assets/GraceVille/10.webp',
    ],
    year: '2025',
  },
  {
    id: 'graceville-detached',
    slug: 'graceville-detached',
    name: 'GraceVille',
    location: 'Egin Street, Ojodu Berger',
    price: '$920,000',
    status: 'Completed',
    propertyType: 'Fully Detached',
    bedrooms: '5 suites + BQ',
    bathrooms: 6,
    typology: 'Fully Detached',
    floors: '2 floors',
    size: '463m²',
    tagline: 'Expansive fully detached luxury residence featuring grand double-height volumes and private serene compound living.',
    description: 'GraceVille Fully Detached stands as an iconic 463m² sanctuary at Egin Street, Ojodu Berger. Artfully designed across 2 levels of elevated luxury with 5 palatial suites plus dedicated BQ, expansive living salons, bespoke finishes, and secluded private grounds engineered for timeless comfort.',
    heroImage: '/assets/GraceVille%20Detached/main.webp',
    secondaryImage: '/assets/GraceVille%20Detached/1.webp',
    gallery: [
      '/assets/GraceVille%20Detached/main.webp',
      '/assets/GraceVille%20Detached/1.webp',
      '/assets/GraceVille%20Detached/2.webp',
      '/assets/GraceVille%20Detached/3.webp',
      '/assets/GraceVille%20Detached/4.webp',
      '/assets/GraceVille%20Detached/5.webp',
      '/assets/GraceVille%20Detached/6.webp',
      '/assets/GraceVille%20Detached/7.webp',
      '/assets/GraceVille%20Detached/8.webp',
      '/assets/GraceVille%20Detached/9.webp',
    ],
    year: '2025',
  },
  {
    id: 'summit-pavilion',
    slug: 'summit-pavilion',
    name: 'Summit Pavilion',
    location: 'Banana Island, Lagos',
    price: '$5,510,000',
    status: 'Completed',
    propertyType: 'Architectural Triplex',
    bedrooms: 5,
    bathrooms: 6,
    typology: 'Detached',
    floors: 3,
    size: '510 m²',
    tagline: 'Triple-tier geometric residence framed in pure white limestone and dark anodized bronze.',
    description: 'A multi-level private compound offering panoramic vistas, private elevator access to each floor, bespoke Italian Poliform joinery, and an exclusive rooftop contemplation terrace.',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
  },
  {
    id: 'solstice-atrium',
    slug: 'solstice-atrium',
    name: 'Solstice Atrium',
    location: 'Eko Atlantic, Lagos',
    price: '$4,200,000',
    status: 'Upcoming',
    propertyType: 'Coastal Sky Estate',
    bedrooms: 4,
    bathrooms: 5,
    typology: 'Semi-Detached',
    floors: 2,
    size: '460 m²',
    tagline: 'Panoramic floor-to-ceiling glass sanctuary capturing unbroken ocean horizon sunsets.',
    description: 'The pinnacle of coastal modernist living. Features an internal Zen courtyard, bespoke Gaggenau culinary suite, and biometric private reception lobby.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
    year: '2027',
  },
];
