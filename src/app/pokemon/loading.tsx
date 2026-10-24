export default function PokemonLoading() {
  return (
    <main className="mx-auto min-h-[calc(100vh-145px)] max-w-7xl px-5 py-16 sm:px-8">
      <div className="h-10 w-72 animate-pulse rounded-xl bg-white/10" />
      <div className="mt-5 h-6 w-full max-w-xl animate-pulse rounded-lg bg-white/10" />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/[0.06]"
          />
        ))}
      </div>
    </main>
  );
}
