import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { IoFlask, IoGameController, IoHome } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Rick and Morty",
  description:
    "Explora los personajes del multiverso con búsqueda, filtros, SSG, SSR e ISR.",
};

export default function RickAndMortyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06120f] text-white">
      <header className="sticky top-0 z-50 border-b border-emerald-300/10 bg-[#06120f]/90 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
          aria-label="Navegación de Rick and Morty"
        >
          <Link
            href="/rick-and-morty"
            className="flex items-center gap-3 font-black tracking-tight transition hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-xl text-slate-950 shadow-lg shadow-emerald-400/20">
              <IoFlask aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">Multiverse Directory</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <IoHome aria-hidden="true" />
            </Link>
            <Link
              href="/pokemon"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <IoGameController aria-hidden="true" />
              <span className="hidden sm:inline">Pokédex</span>
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-emerald-300/10 px-6 py-8 text-center text-sm text-slate-500">
        Datos oficiales de The Rick and Morty API · Laboratorio 10
      </footer>
    </div>
  );
}
