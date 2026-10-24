import Image from "next/image";
import Link from "next/link";
import { IoChevronForward, IoSparkles } from "react-icons/io5";
import { getPokemonArtwork, getPokemonList } from "@/lib/pokemon";

export default async function PokemonListPage() {
  const pokemons = await getPokemonList();

  return (
    <main className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl">
        <section className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-200">
            <IoSparkles aria-hidden="true" />
            151 Pokémon disponibles
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Elige tu próximo compañero
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Descubre la primera generación completa. Selecciona una tarjeta para
            consultar tipos, habilidades y estadísticas.
          </p>
        </section>

        <section
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Listado de Pokémon"
        >
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              prefetch
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-red-300/40 hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/10 blur-2xl transition group-hover:bg-red-400/20" />
              <div className="relative flex items-center gap-5">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
                  <Image
                    src={getPokemonArtwork(pokemon.id)}
                    alt={`Ilustración oficial de ${pokemon.name}`}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-24 w-24 object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold tracking-[0.16em] text-red-300">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </p>
                  <h2 className="mt-2 truncate text-xl font-bold capitalize">
                    {pokemon.name}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-400 transition group-hover:text-white">
                    Ver detalles
                    <IoChevronForward aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
