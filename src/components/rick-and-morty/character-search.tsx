"use client";

import { useEffect, useState } from "react";
import { IoClose, IoSearch, IoSparkles } from "react-icons/io5";
import { CharacterCard } from "@/components/rick-and-morty/character-card";
import type {
  CharacterFilters,
  CharacterGender,
  CharacterStatus,
  RickAndMortyResponse,
} from "@/types/rick-and-morty";

const API_URL = "https://rickandmortyapi.com/api/character";

const initialFilters: CharacterFilters = {
  name: "",
  status: "",
  type: "",
  gender: "",
  page: 1,
};

export function CharacterSearch() {
  const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
  const [data, setData] = useState<RickAndMortyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hasActiveFilters = Boolean(
    filters.name || filters.status || filters.type || filters.gender
  );

  useEffect(() => {
    if (!hasActiveFilters) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams();
      if (filters.name.trim()) params.set("name", filters.name.trim());
      if (filters.status) params.set("status", filters.status);
      if (filters.type.trim()) params.set("type", filters.type.trim());
      if (filters.gender) params.set("gender", filters.gender);
      params.set("page", String(filters.page));

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setData({
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
          });
          return;
        }

        if (!response.ok) {
          throw new Error("La API no pudo completar la búsqueda.");
        }

        setData((await response.json()) as RickAndMortyResponse);
      } catch (reason) {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return;
        }
        setData(null);
        setError(
          reason instanceof Error
            ? reason.message
            : "Ocurrió un error inesperado durante la búsqueda."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [filters, hasActiveFilters]);

  function updateTextFilter(field: "name" | "type", value: string) {
    setData(null);
    setError("");
    setIsLoading(true);
    setFilters((current) => ({ ...current, [field]: value, page: 1 }));
  }

  function updateStatus(value: "" | CharacterStatus) {
    setData(null);
    setError("");
    setIsLoading(true);
    setFilters((current) => ({ ...current, status: value, page: 1 }));
  }

  function updateGender(value: "" | CharacterGender) {
    setData(null);
    setError("");
    setIsLoading(true);
    setFilters((current) => ({ ...current, gender: value, page: 1 }));
  }

  function clearFilters() {
    setData(null);
    setError("");
    setIsLoading(false);
    setFilters(initialFilters);
  }

  function changePage(page: number) {
    setData(null);
    setError("");
    setIsLoading(true);
    setFilters((current) => ({ ...current, page }));
  }

  return (
    <section
      id="busqueda"
      className="rounded-[2rem] border border-emerald-300/15 bg-slate-900/75 p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            <IoSparkles aria-hidden="true" />
            Búsqueda CSR
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Encuentra cualquier personaje
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Combina filtros para consultar todos los resultados coincidentes sin
            recargar la página.
          </p>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <IoClose aria-hidden="true" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm font-semibold text-slate-300">
          Nombre
          <span className="relative mt-2 block">
            <IoSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.name}
              onChange={(event) => updateTextFilter("name", event.target.value)}
              placeholder="Ej. Rick"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/15"
            />
          </span>
        </label>

        <label className="text-sm font-semibold text-slate-300">
          Estado
          <select
            value={filters.status}
            onChange={(event) =>
              updateStatus(event.target.value as "" | CharacterStatus)
            }
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/15"
          >
            <option value="">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-slate-300">
          Tipo o subespecie
          <input
            type="search"
            value={filters.type}
            onChange={(event) => updateTextFilter("type", event.target.value)}
            placeholder="Ej. Parasite"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/15"
          />
        </label>

        <label className="text-sm font-semibold text-slate-300">
          Género
          <select
            value={filters.gender}
            onChange={(event) =>
              updateGender(event.target.value as "" | CharacterGender)
            }
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/15"
          >
            <option value="">Todos</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
        </label>
      </div>

      {hasActiveFilters && isLoading && <SearchLoading />}

      {hasActiveFilters && !isLoading && error && (
        <p
          className="mt-8 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5 text-rose-200"
          role="alert"
        >
          {error}
        </p>
      )}

      {hasActiveFilters &&
        !isLoading &&
        !error &&
        data &&
        data.results.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-8 text-center">
            <p className="text-lg font-bold text-white">
              No encontramos personajes
            </p>
            <p className="mt-2 text-slate-400">
              Prueba con otros valores o limpia los filtros.
            </p>
          </div>
        )}

      {hasActiveFilters &&
        !isLoading &&
        !error &&
        data &&
        data.results.length > 0 && (
          <>
            <div className="mt-9 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-300" aria-live="polite">
                <strong className="text-white">{data.info.count}</strong>{" "}
                coincidencias · página {filters.page} de {data.info.pages}
              </p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={!data.info.prev}
                onClick={() => changePage(Math.max(filters.page - 1, 1))}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Anterior
              </button>
              <span className="text-sm font-bold text-emerald-300">
                {filters.page} / {data.info.pages}
              </span>
              <button
                type="button"
                disabled={!data.info.next}
                onClick={() =>
                  changePage(Math.min(filters.page + 1, data.info.pages))
                }
                className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Siguiente
              </button>
            </div>
          </>
        )}

      {!hasActiveFilters && (
        <p className="mt-7 rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-slate-500">
          Escribe un nombre, un tipo o selecciona un filtro para comenzar.
        </p>
      )}
    </section>
  );
}

function SearchLoading() {
  return (
    <div className="mt-8" role="status" aria-live="polite">
      <p className="mb-4 text-sm font-semibold text-emerald-300">
        Buscando en el multiverso...
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-3xl bg-white/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}
