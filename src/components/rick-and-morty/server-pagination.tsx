import Link from "next/link";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export function ServerPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav
      className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row"
      aria-label="Paginación del listado del servidor"
    >
      <Link
        href={{ pathname: "/rick-and-morty", query: { page: previousPage } }}
        aria-disabled={currentPage === 1}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
          currentPage === 1
            ? "pointer-events-none text-slate-600"
            : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <IoArrowBack aria-hidden="true" />
        Anterior
      </Link>
      <p className="text-sm text-slate-300">
        Página <strong className="text-white">{currentPage}</strong> de{" "}
        <strong className="text-white">{totalPages}</strong>
      </p>
      <Link
        href={{ pathname: "/rick-and-morty", query: { page: nextPage } }}
        aria-disabled={currentPage === totalPages}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
          currentPage === totalPages
            ? "pointer-events-none text-slate-600"
            : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
        }`}
      >
        Siguiente
        <IoArrowForward aria-hidden="true" />
      </Link>
    </nav>
  );
}
