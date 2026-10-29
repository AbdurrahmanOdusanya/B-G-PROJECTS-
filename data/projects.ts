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
  floors?: number | string;
  parking: string;
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
    parking: '2 Cars',
    size: '210m²',
    tagline: 'Refined semi-detached residence crafted for modern family living with timeless architectural elegance.',
    description:
      'A modern semi-detached home showcasing symmetrical contemporary architecture with clean geometric frames, textured stone cladding.\n\nThe interior features three en-suite bedrooms and a dedicated BQ, set across marble-tiled living areas accented by a striking illuminated staircase, layered POP ceilings, and dynamic LED strip lighting.\n\nFinished with a sleek fitted kitchen featuring backlit cabinetry, custom back-lit corner wardrobes, walk-in rain showers, and an upper balcony.',
    heroImage: '/assets/GraceVille/main.webp',
    secondaryImage: '/assets/GraceVille/1.webp',
    gallery: [
      '/assets/GraceVille/main.webp',
      '/assets/GraceVille/1.webp',
      '/assets/GraceVille/2.1.webp',
      '/assets/GraceVille/2.2.webp',
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
    parking: 'Ample',
    size: '463m²',
    tagline: 'Expansive fully detached luxury residence featuring grand double-height volumes and private serene compound living.',
    description:
      'A contemporary detached residence defined by striking charcoal finishes, textured stone cladding, and dramatic architectural lighting.\n\nThe interior offers four en-suite bedrooms, a dedicated private study, and an en-suite BQ, highlighted by high-gloss marble flooring, bespoke geometric POP ceilings, integrated LED ambient lights, and custom illuminated wardrobes.\n\nComplete with a modern island kitchen, a louvered private balcony, and an extensive stamped-concrete compound with ample multi-car parking.',
    heroImage: '/assets/GraceVille%20Detached/main.webp',
    secondaryImage: '/assets/GraceVille%20Detached/1.webp',
    gallery: [
      '/assets/GraceVille%20Detached/main.webp',
      '/assets/GraceVille%20Detached/1.webp',
      '/assets/GraceVille%20Detached/2.1.webp',
      '/assets/GraceVille%20Detached/2.2.webp',
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
];
