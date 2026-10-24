import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import {
  IoArrowBack,
  IoBarbell,
  IoFlash,
  IoResize,
  IoSparkles,
} from "react-icons/io5";
import {
  getPokemon,
  getPokemonArtwork,
  getPokemonList,
} from "@/lib/pokemon";

type PokemonPageProps = PageProps<"/pokemon/[name]">;

export const ensureStatic = "navigation";

const typeStyles: Record<string, string> = {
  bug: "bg-lime-400/20 text-lime-200 border-lime-300/30",
  dragon: "bg-indigo-400/20 text-indigo-200 border-indigo-300/30",
  electric: "bg-yellow-400/20 text-yellow-100 border-yellow-300/30",
  fairy: "bg-pink-400/20 text-pink-200 border-pink-300/30",
  fighting: "bg-orange-500/20 text-orange-200 border-orange-300/30",
  fire: "bg-red-500/20 text-red-200 border-red-300/30",
  flying: "bg-sky-400/20 text-sky-200 border-sky-300/30",
  ghost: "bg-violet-500/20 text-violet-200 border-violet-300/30",
  grass: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
  ground: "bg-amber-500/20 text-amber-200 border-amber-300/30",
  ice: "bg-cyan-300/20 text-cyan-100 border-cyan-200/30",
  normal: "bg-slate-400/20 text-slate-200 border-slate-300/30",
  poison: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-300/30",
  psychic: "bg-rose-400/20 text-rose-200 border-rose-300/30",
  rock: "bg-stone-400/20 text-stone-200 border-stone-300/30",
  steel: "bg-zinc-300/20 text-zinc-100 border-zinc-200/30",
  water: "bg-blue-500/20 text-blue-200 border-blue-300/30",
};

const statLabels: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad",
};

export async function generateStaticParams() {
  const pokemons = await getPokemonList();
  return pokemons.map((pokemon) => ({ name: pokemon.name }));
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    return { title: "Pokémon no encontrado" };
  }

  const displayName = capitalize(pokemon.name);
  return {
    title: displayName,
    description: `Consulta los tipos, habilidades y estadísticas de ${displayName}.`,
  };
}

export default function PokemonDetailPage(props: PokemonPageProps) {
  return (
    <Suspense fallback={<PokemonDetailSkeleton />}>
      <PokemonDetails {...props} />
    </Suspense>
  );
}

async function PokemonDetails({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon || pokemon.id > 151) {
    notFound();
  }

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    getPokemonArtwork(pokemon.id);

  return (
    <main className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/pokemon"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
        >
          <IoArrowBack aria-hidden="true" />
          Volver a la Pokédex
        </Link>

        <article className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-8">
            <span className="absolute left-7 top-6 text-6xl font-black text-white/[0.07] sm:text-8xl">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
            <Image
              src={artwork}
              alt={`Ilustración oficial de ${pokemon.name}`}
              width={475}
              height={475}
              priority
              className="relative h-auto w-full max-w-[26rem] object-contain drop-shadow-2xl"
            />
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">
              Pokémon #{pokemon.id.toString().padStart(3, "0")}
            </p>
            <h1 className="mt-3 text-5xl font-black capitalize tracking-tight sm:text-6xl">
              {pokemon.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3" aria-label="Tipos">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`rounded-full border px-4 py-2 text-sm font-bold capitalize ${typeStyles[type.name] ?? typeStyles.normal}`}
                >
                  {type.name}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <InfoCard
                icon={<IoResize aria-hidden="true" />}
                label="Altura"
                value={`${pokemon.height / 10} m`}
              />
              <InfoCard
                icon={<IoBarbell aria-hidden="true" />}
                label="Peso"
                value={`${pokemon.weight / 10} kg`}
              />
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <IoSparkles className="text-amber-300" aria-hidden="true" />
                Habilidades
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li
                    key={ability.name}
                    className="rounded-xl bg-white/[0.07] px-4 py-3 text-sm font-semibold capitalize text-slate-200"
                  >
                    {ability.name.replaceAll("-", " ")}
                    {is_hidden && (
                      <span className="ml-2 text-xs text-slate-400">oculta</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-9">
          <h2 className="flex items-center gap-2 text-2xl font-black">
            <IoFlash className="text-yellow-300" aria-hidden="true" />
            Estadísticas base
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {pokemon.stats.map(({ base_stat, stat }) => {
              const percentage = Math.min((base_stat / 255) * 100, 100);
              return (
                <div key={stat.name}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-300">
                      {statLabels[stat.name] ?? stat.name}
                    </span>
                    <span className="font-black tabular-nums">{base_stat}</span>
                  </div>
                  <div
                    className="h-2.5 overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-label={statLabels[stat.name] ?? stat.name}
                    aria-valuenow={base_stat}
                    aria-valuemin={0}
                    aria-valuemax={255}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
        <span className="text-red-300">{icon}</span>
        {label}
      </div>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  );
}

function PokemonDetailSkeleton() {
  return (
    <main className="mx-auto min-h-[calc(100vh-145px)] max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid animate-pulse gap-8 lg:grid-cols-2">
        <div className="h-[32rem] rounded-[2rem] bg-white/[0.06]" />
        <div className="h-[32rem] rounded-[2rem] bg-white/[0.06]" />
      </div>
    </main>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
