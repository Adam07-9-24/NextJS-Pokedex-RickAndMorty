import { cacheLife } from "next/cache";
import type {
  Pokemon,
  PokemonListResponse,
  SimplePokemon,
} from "@/types/pokemon";

const POKE_API = "https://pokeapi.co/api/v2";
const REVALIDATE_SECONDS = 60 * 60 * 24;

export async function getPokemonList(): Promise<SimplePokemon[]> {
  "use cache";
  cacheLife({
    stale: 60 * 5,
    revalidate: REVALIDATE_SECONDS,
    expire: REVALIDATE_SECONDS * 7,
  });

  const response = await fetch(`${POKE_API}/pokemon?limit=151`);

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de Pokémon.");
  }

  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon, index) => ({
    name: pokemon.name,
    id: index + 1,
  }));
}

export async function getPokemon(name: string): Promise<Pokemon | null> {
  "use cache";
  cacheLife({
    stale: 60 * 5,
    revalidate: REVALIDATE_SECONDS,
    expire: REVALIDATE_SECONDS * 7,
  });

  const response = await fetch(
    `${POKE_API}/pokemon/${encodeURIComponent(name.toLowerCase())}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`No se pudo cargar el Pokémon ${name}.`);
  }

  return (await response.json()) as Pokemon;
}

export function getPokemonArtwork(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
