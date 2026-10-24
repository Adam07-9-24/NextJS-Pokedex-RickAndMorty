import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  IoAlbums,
  IoArrowForward,
  IoPeople,
  IoServer,
} from "react-icons/io5";
import { CharacterCard } from "@/components/rick-and-morty/character-card";
import { CharacterSearch } from "@/components/rick-and-morty/character-search";
import { ServerPagination } from "@/components/rick-and-morty/server-pagination";
import {
  getCharacterOverview,
  getServerCharacterPage,
} from "@/lib/rick-and-morty";

type RickAndMortyPageProps = PageProps<"/rick-and-morty">;

export default async function RickAndMortyPage({
  searchParams,
}: RickAndMortyPageProps) {
  const overview = await getCharacterOverview();

  return (
    <main className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_20%_10%,rgba(52,211,153,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <section className="grid items-center gap-10 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
              Archivo interdimensional
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Personajes de todos los{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                universos
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Consulta expedientes, combina filtros y recorre las dimensiones de
              Rick and Morty con renderizado moderno de Next.js 16.
            </p>
            <a
              href="#busqueda"
              className="mt-9 inline-flex rounded-full bg-emerald-400 px-7 py-4 font-black text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              Abrir buscador
            </a>
          </div>

          <Link
            href="/rick-and-morty/1"
            aria-label="Abrir el expediente de Rick Sánchez"
            className="group relative mx-auto block w-full max-w-md rounded-[2rem] border border-emerald-300/20 bg-slate-900/70 p-4 shadow-2xl shadow-emerald-950/40 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:p-5"
          >
            <div className="pointer-events-none absolute inset-4 rounded-full border-[18px] border-emerald-300/15 shadow-[0_0_80px_rgba(52,211,153,0.32),inset_0_0_55px_rgba(34,211,238,0.2)]" />
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-emerald-300/35 bg-gradient-to-br from-emerald-300/20 via-cyan-300/10 to-slate-950">
              <Image
                src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                alt="Rick Sánchez"
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 88vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-cyan-200/10" />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                  Sujeto #001
                </p>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Rick Sánchez
                </h2>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition group-hover:translate-x-1">
                <IoArrowForward aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>

        <section
          className="my-10 grid gap-4 sm:grid-cols-3"
          aria-label="Estadísticas de la API almacenadas con ISR"
        >
          <StatCard
            icon={<IoPeople aria-hidden="true" />}
            label="Personajes"
            value={overview.count}
          />
          <StatCard
            icon={<IoAlbums aria-hidden="true" />}
            label="Páginas disponibles"
            value={overview.pages}
          />
          <StatCard
            icon={<IoServer aria-hidden="true" />}
            label="Revalidación ISR"
            value="10 días"
          />
        </section>

        <CharacterSearch />

        <section className="mt-16" aria-labelledby="server-list-title">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Listado SSR
              </p>
              <h2
                id="server-list-title"
                className="mt-2 text-3xl font-black sm:text-4xl"
              >
                Transmisión desde el servidor
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Esta sección se obtiene en cada solicitud de página. La cabecera y
              las estadísticas permanecen almacenadas y se revalidan por ISR.
            </p>
          </div>
          <Suspense fallback={<ServerListSkeleton />}>
            <ServerCharacterList searchParams={searchParams} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

async function ServerCharacterList({
  searchParams,
}: Pick<RickAndMortyPageProps, "searchParams">) {
  const params = await searchParams;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const data = await getServerCharacterPage(page);

  if (!data) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed border-white/15 p-10 text-center">
        <h3 className="text-xl font-black">La dimensión no existe</h3>
        <p className="mt-2 text-slate-400">
          La página solicitada está fuera del rango disponible.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <ServerPagination
        currentPage={page}
        totalPages={data.info.pages}
      />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
      <span className="text-2xl text-emerald-300">{icon}</span>
      <p className="mt-5 text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

function ServerListSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="status">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="h-[28rem] animate-pulse rounded-3xl bg-white/[0.06]"
        />
      ))}
      <span className="sr-only">Cargando personajes desde el servidor</span>
    </div>
  );
}
