export interface Image {
    id: string,
    height: number,
    width: number,
    url: string
}

export interface Breed {
    id: string,
    name: string,
    description: string,
    image: Image
    url?: string
}

export interface BreedDetail extends Breed {
    temperament: string,
    life_span: string,
    wikipedia_url: string,
    origin: string,
    adaptability: number,
    affection_level: number,
    child_friendly: number,
    grooming: number,
    intelligence: number,
    health_issues: number,
    social_needs: number,
    stranger_friendly: number,
    cfa_url?: string,
    vetstreet_url?: string,
    vcahospitals_url?: string
}