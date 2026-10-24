import Link from "next/link";
import {
  IoArrowForward,
  IoFlask,
  IoGameController,
  IoLayers,
} from "react-icons/io5";

const applications = [
  {
    href: "/pokemon",
    title: "Pokédex",
    description:
      "Los 151 Pokémon originales con rutas estáticas, detalles e ISR diario.",
    eyebrow: "Ejercicio 1",
    icon: <IoGameController aria-hidden="true" />,
    accent:
      "border-red-300/20 hover:border-red-300/50 from-red-500/15 to-transparent",
    button: "bg-red-500 hover:bg-red-400",
  },
  {
    href: "/rick-and-morty",
    title: "Rick and Morty",
    description:
      "Directorio interdimensional con SSR, SSG, búsqueda CSR e ISR de 10 días.",
    eyebrow: "Tarea final",
    icon: <IoFlask aria-hidden="true" />,
    accent:
      "border-emerald-300/20 hover:border-emerald-300/50 from-emerald-400/15 to-transparent",
    button: "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.16),transparent_38%)]" />
      <div className="relative mx-auto max-w-6xl">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl">
            <IoLayers aria-hidden="true" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
            Laboratorio 10
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">
            Aplicaciones con Next.js
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Selecciona una experiencia para explorar generación estática,
            renderizado en servidor, componentes cliente e ISR.
          </p>
        </section>

        <section
          className="mt-14 grid gap-6 md:grid-cols-2"
          aria-label="Aplicaciones del laboratorio"
        >
          {applications.map((application) => (
            <article
              key={application.href}
              className={`group rounded-[2rem] border bg-gradient-to-br p-7 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 sm:p-9 ${application.accent}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                {application.icon}
              </div>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                {application.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-black">{application.title}</h2>
              <p className="mt-4 min-h-14 leading-7 text-slate-300">
                {application.description}
              </p>
              <Link
                href={application.href}
                className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-black transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${application.button}`}
              >
                Abrir aplicación
                <IoArrowForward aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
