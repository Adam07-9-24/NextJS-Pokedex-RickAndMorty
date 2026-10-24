"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IoAlertCircle, IoArrowBack, IoRefresh } from "react-icons/io5";

export default function PokemonError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Error en la Pokédex:", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl text-center">
        <IoAlertCircle
          className="mx-auto text-7xl text-red-400"
          aria-hidden="true"
        />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-red-300">
          Error de conexión
        </p>
        <h1 className="mt-3 text-4xl font-black">No pudimos cargar la Pokédex</h1>
        <p className="mt-5 leading-7 text-slate-300">
          La PokeAPI no respondió como esperábamos. Puedes intentar nuevamente
          o volver al listado principal.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3 font-bold transition hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
          >
            <IoRefresh aria-hidden="true" />
            Reintentar
          </button>
          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <IoArrowBack aria-hidden="true" />
            Volver al listado
          </Link>
        </div>
      </section>
    </main>
  );
}
