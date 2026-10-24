export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface ApiReference {
  name: string;
  url: string;
}

export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ApiReference;
  location: ApiReference;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickAndMortyPageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RickAndMortyResponse {
  info: RickAndMortyPageInfo;
  results: RickAndMortyCharacter[];
}

export interface CharacterFilters {
  name: string;
  status: "" | CharacterStatus;
  type: string;
  gender: "" | CharacterGender;
  page: number;
}
