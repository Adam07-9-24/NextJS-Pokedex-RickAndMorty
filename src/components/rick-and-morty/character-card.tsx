import Image from "next/image";
import Link from "next/link";
import { IoChevronForward, IoLocationSharp } from "react-icons/io5";
import type {
  CharacterStatus,
  RickAndMortyCharacter,
} from "@/types/rick-and-morty";

const statusStyles: Record<CharacterStatus, string> = {
  Alive: "bg-emerald-400",
  Dead: "bg-rose-500",
  unknown: "bg-slate-400",
};

export function CharacterCard({
  character,
}: {
  character: RickAndMortyCharacter;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-emerald-300/10 bg-slate-900/80 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35">
      <Link
        href={`/rick-and-morty/${character.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
      >
        <div className="relative aspect-square overflow-hidden bg-slate-800">
          <Image
            src={character.image}
            alt={`Fotografía de ${character.name}`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent p-5 pt-16">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span
                className={`h-2.5 w-2.5 rounded-full ${statusStyles[character.status]}`}
                aria-hidden="true"
              />
              {character.status}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="truncate text-xl font-black text-white">
            {character.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-emerald-200">
            {character.species}
            {character.type ? ` · ${character.type}` : ""}
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-400">
            <IoLocationSharp
              className="mt-1 shrink-0 text-cyan-300"
              aria-hidden="true"
            />
            <span className="line-clamp-2">{character.location.name}</span>
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-white transition group-hover:text-emerald-300">
            Ver expediente
            <IoChevronForward aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
