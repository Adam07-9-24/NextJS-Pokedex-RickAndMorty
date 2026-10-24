import Link from "next/link";
import { IoArrowBack, IoSearch } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl text-center">
        <p className="text-8xl font-black text-white/10">404</p>
        <IoSearch className="mx-auto -mt-10 text-6xl text-amber-300" aria-hidden="true" />
        <h1 className="mt-7 text-4xl font-black">Pokémon no encontrado</h1>
        <p className="mt-5 leading-7 text-slate-300">
          El Pokémon que buscas no existe o todavía no forma parte de esta
          Pokédex de primera generación.
        </p>
        <Link
          href="/pokemon"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-bold transition hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
        >
          <IoArrowBack aria-hidden="true" />
          Volver a la Pokédex
        </Link>
      </section>
    </main>
  );
}
