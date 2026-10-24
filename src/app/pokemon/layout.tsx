import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { IoFlask, IoGameController, IoHome } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explora el mundo Pokémon y descubre sus estadísticas.",
};

export default function PokemonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-8"
          aria-label="Navegación principal"
        >
          <Link
            href="/pokemon"
            className="flex shrink-0 items-center gap-2 text-lg font-black tracking-tight transition hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 sm:gap-3 sm:text-xl"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
              <IoGameController aria-hidden="true" />
            </span>
            Pokédex
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm font-bold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 sm:px-4"
            >
              <IoHome aria-hidden="true" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
            <Link
              href="/rick-and-morty"
              aria-label="Ir a Rick and Morty"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 sm:px-4"
            >
              <IoFlask aria-hidden="true" />
              <span className="hidden md:inline">Rick and Morty</span>
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        Datos proporcionados por PokeAPI · Next.js App Router
      </footer>
    </div>
  );
}
