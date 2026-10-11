export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  size: string;
  tagline: string;
  description: string;
  heroImage: string;
  secondaryImage: string;
  year: string;
  aspectRatio?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'aether-heights',
    slug: 'aether-heights',
    name: 'Aether Heights',
    location: 'Old Ikoyi, Lagos',
    price: '$3,450,000',
    status: 'Completed',
    propertyType: 'Pavilion Villa',
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    size: '380 m²',
    tagline: 'Linear glass pavilions and cantilevered stone volumes overlooking serene courtyard gardens.',
    description: 'An architectural composition of fair-faced concrete, floor-to-ceiling acoustic glass, and warm travertine. Features double-height atrium living, a sunken conversation pit, and private subterranean gallery parking.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    year: '2025',
  },
  {
    id: 'azure-sanctuary',
    slug: 'azure-sanctuary',
    name: 'Azure Sanctuary',
    location: 'Victoria Island, Lagos',
    price: '$2,225,000',
    status: 'Ongoing',
    propertyType: 'Waterfront Residence',
    bedrooms: 3,
    bathrooms: 4,
    floors: 1,
    size: '320 m²',
    tagline: 'Monolithic infinity pool terrace reflecting minimalist dark-concrete architectural planes.',
    description: 'Conceived as an inhabited sculpture along the lagoon waterfront. Open-concept salon spaces flow uninterrupted into outdoor pool decks with integrated concealed climate and automated louvered screens.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
    year: '2026',
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
    floors: 2,
    size: '460 m²',
    tagline: 'Panoramic floor-to-ceiling glass sanctuary capturing unbroken ocean horizon sunsets.',
    description: 'The pinnacle of coastal modernist living. Features an internal Zen courtyard, bespoke Gaggenau culinary suite, and biometric private reception lobby.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
    year: '2027',
  },
];
