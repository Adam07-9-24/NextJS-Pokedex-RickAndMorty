import Link from "next/link";
import { IoArrowBack, IoPlanet } from "react-icons/io5";

export default function RickAndMortyNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-145px)] items-center justify-center px-6 py-16">
      <section className="max-w-xl text-center">
        <p className="text-8xl font-black text-white/[0.07]">404</p>
        <IoPlanet
          className="mx-auto -mt-10 text-7xl text-emerald-300"
          aria-hidden="true"
        />
        <h1 className="mt-8 text-4xl font-black">Dimensión no encontrada</h1>
        <p className="mt-5 leading-7 text-slate-300">
          El personaje o la ruta solicitada no existe en nuestros registros
          interdimensionales.
        </p>
        <Link
          href="/rick-and-morty"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
        >
          <IoArrowBack aria-hidden="true" />
          Volver al directorio
        </Link>
      </section>
    </main>
  );
}
