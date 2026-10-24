import { cacheLife } from "next/cache";
import type {
  RickAndMortyCharacter,
  RickAndMortyPageInfo,
  RickAndMortyResponse,
} from "@/types/rick-and-morty";

const CHARACTER_API = "https://rickandmortyapi.com/api/character";
const TEN_DAYS = 864_000;
const CACHE_EXPIRATION = TEN_DAYS * 3;
const PAGE_BATCH_SIZE = 1;
const MAX_REQUEST_ATTEMPTS = 4;

function applyTenDayCache() {
  cacheLife({
    stale: 300,
    revalidate: TEN_DAYS,
    expire: CACHE_EXPIRATION,
  });
}

export async function getCharacterOverview(): Promise<RickAndMortyPageInfo> {
  "use cache";
  applyTenDayCache();

  const response = await fetchWithRetry(CHARACTER_API);
  if (!response.ok) {
    throw new Error("No se pudieron cargar las estadísticas de personajes.");
  }

  const data: RickAndMortyResponse = await response.json();
  return data.info;
}

export async function getServerCharacterPage(
  page: number,
): Promise<RickAndMortyResponse | null> {
  const params = new URLSearchParams({ page: String(page) });
  const response = await fetchWithRetry(
    `${CHARACTER_API}?${params.toString()}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("No se pudo cargar el listado de personajes.");
  }

  return (await response.json()) as RickAndMortyResponse;
}

export async function getCharacterById(
  id: string,
): Promise<RickAndMortyCharacter | null> {
  "use cache";
  applyTenDayCache();

  const numericId = Number.parseInt(id, 10);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return null;
  }

  const characters = await getAllCharacters();
  return characters.find((character) => character.id === numericId) ?? null;
}

export async function getAllCharacterIds(): Promise<number[]> {
  const characters = await getAllCharacters();
  return characters.map((character) => character.id);
}

export async function getAllCharacters(): Promise<RickAndMortyCharacter[]> {
  "use cache";
  applyTenDayCache();

  const firstPage = await fetchCharacterPageForBuild(1);
  const remainingPages = Array.from(
    { length: Math.max(firstPage.info.pages - 1, 0) },
    (_, index) => index + 2,
  );

  const responses: RickAndMortyResponse[] = [firstPage];

  for (let index = 0; index < remainingPages.length; index += PAGE_BATCH_SIZE) {
    const batch = remainingPages.slice(index, index + PAGE_BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((page) => fetchCharacterPageForBuild(page)),
    );
    responses.push(...batchResults);
    if (index + PAGE_BATCH_SIZE < remainingPages.length) {
      await wait(450);
    }
  }

  return responses.flatMap((response) => response.results);
}

async function fetchCharacterPageForBuild(
  page: number,
): Promise<RickAndMortyResponse> {
  const params = new URLSearchParams({ page: String(page) });
  const response = await fetchWithRetry(
    `${CHARACTER_API}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `No se pudo consultar la página ${page} durante la generación estática (HTTP ${response.status}).`,
    );
  }

  return (await response.json()) as RickAndMortyResponse;
}

async function fetchWithRetry(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  let lastResponse: Response | null = null;
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const headers = new Headers(init?.headers);
      headers.set("x-lab-request-attempt", String(attempt));
      const response = await fetch(url, { ...init, headers });
      lastResponse = response;

      const isTransient = response.status === 429 || response.status >= 500;
      if (!isTransient || attempt === MAX_REQUEST_ATTEMPTS) {
        return response;
      }
    } catch (reason) {
      lastError = reason;
      if (attempt === MAX_REQUEST_ATTEMPTS) {
        break;
      }
    }

    await wait(350 * attempt * attempt);
  }

  if (lastResponse) {
    return lastResponse;
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("La API no respondió después de varios intentos.");
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
