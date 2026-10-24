"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IoAlertCircle, IoHome, IoRefresh } from "react-icons/io5";

export default function RickAndMortyError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Error en Rick and Morty:", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
      <section className="max-w-xl text-center">
        <IoAlertCircle
          className="mx-auto text-7xl text-emerald-300"
          aria-hidden="true"
        />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
          Interferencia dimensional
        </p>
        <h1 className="mt-3 text-4xl font-black">
          Perdimos la conexión con el multiverso
        </h1>
        <p className="mt-5 leading-7 text-slate-300">
          La API no respondió correctamente. Intenta restablecer la conexión o
          vuelve al inicio.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
          >
            <IoRefresh aria-hidden="true" />
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 font-bold transition hover:bg-white/10"
          >
            <IoHome aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
