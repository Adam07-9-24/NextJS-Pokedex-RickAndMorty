import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoArrowBack,
  IoCalendar,
  IoEarth,
  IoFemale,
  IoFilm,
  IoLink,
  IoLocation,
  IoMale,
  IoPerson,
  IoPulse,
} from "react-icons/io5";
import {
  getAllCharacterIds,
  getCharacterById,
} from "@/lib/rick-and-morty";
import type {
  CharacterStatus,
  RickAndMortyCharacter,
} from "@/types/rick-and-morty";

type CharacterPageProps = PageProps<"/rick-and-morty/[id]">;

export const ensureStatic = "navigation";

const statusStyles: Record<CharacterStatus, string> = {
  Alive: "border-emerald-300/30 bg-emerald-400/15 text-emerald-200",
  Dead: "border-rose-300/30 bg-rose-400/15 text-rose-200",
  unknown: "border-slate-300/20 bg-slate-400/15 text-slate-200",
};

export async function generateStaticParams() {
  const ids = await getAllCharacterIds();
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    return { title: "Personaje no encontrado" };
  }

  return {
    title: character.name,
    description: `Expediente de ${character.name}: estado, especie, origen y episodios.`,
  };
}

export default async function CharacterDetailPage({
  params,
}: CharacterPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const character = await getCharacterById(id);
  if (!character) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/rick-and-morty"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        >
          <IoArrowBack aria-hidden="true" />
          Volver al directorio
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-slate-900/75 shadow-2xl shadow-black/30">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[24rem] bg-slate-800 lg:min-h-[38rem]">
              <Image
                src={character.image}
                alt={`Fotografía de ${character.name}`}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/30" />
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${statusStyles[character.status]}`}
                >
                  {character.status}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
                  ID #{character.id}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                {character.name}
              </h1>
              <p className="mt-4 text-lg font-semibold text-emerald-200">
                {character.species}
                {character.type ? ` · ${character.type}` : " · Tipo no especificado"}
              </p>

              <dl className="mt-9 grid gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={<IoPulse aria-hidden="true" />}
                  label="Estado"
                  value={character.status}
                />
                <DetailItem
                  icon={
                    character.gender === "Female" ? (
                      <IoFemale aria-hidden="true" />
                    ) : (
                      <IoMale aria-hidden="true" />
                    )
                  }
                  label="Género"
                  value={character.gender}
                />
                <DetailItem
                  icon={<IoPerson aria-hidden="true" />}
                  label="Especie"
                  value={character.species}
                />
                <DetailItem
                  icon={<IoPerson aria-hidden="true" />}
                  label="Tipo"
                  value={character.type || "No especificado"}
                />
                <DetailItem
                  icon={<IoEarth aria-hidden="true" />}
                  label="Origen"
                  value={character.origin.name || "Desconocido"}
                  url={character.origin.url}
                />
                <DetailItem
                  icon={<IoLocation aria-hidden="true" />}
                  label="Ubicación actual"
                  value={character.location.name || "Desconocida"}
                  url={character.location.url}
                />
              </dl>
            </div>
          </div>
        </article>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <h2 className="flex items-center gap-3 text-2xl font-black">
            <IoFilm className="text-cyan-300" aria-hidden="true" />
            Apariciones
          </h2>
          <p className="mt-3 text-slate-400">
            Participa en {character.episode.length} episodios.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {character.episode.map((episodeUrl) => {
              const episodeNumber = episodeUrl.split("/").at(-1) ?? "?";
              return (
                <li key={episodeUrl}>
                  <a
                    href={episodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm font-bold text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    Episodio {episodeNumber}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <h2 className="text-2xl font-black">Datos del registro</h2>
          <dl className="mt-6 grid gap-5 md:grid-cols-2">
            <RecordItem
              icon={<IoLink aria-hidden="true" />}
              label="URL del personaje"
              value={character.url}
              url={character.url}
            />
            <RecordItem
              icon={<IoCalendar aria-hidden="true" />}
              label="Fecha de creación"
              value={formatCreatedDate(character)}
            />
          </dl>
        </section>
      </div>
    </main>
  );
}

function DetailItem({
  icon,
  label,
  value,
  url,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  url?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <dt className="flex items-center gap-2 text-sm font-semibold text-slate-400">
        <span className="text-emerald-300">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 font-bold text-white">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-emerald-300"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function RecordItem({
  icon,
  label,
  value,
  url,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  url?: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-sm font-semibold text-slate-400">
        <span className="text-cyan-300">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 break-all font-medium text-slate-200">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-300"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function formatCreatedDate(character: RickAndMortyCharacter): string {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(character.created));
}
