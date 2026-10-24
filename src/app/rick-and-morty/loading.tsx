export default function RickAndMortyLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-16 sm:px-8">
      <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-white/[0.07]" />
      <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded-xl bg-white/[0.06]" />
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-3xl bg-white/[0.06]"
          />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-[28rem] animate-pulse rounded-3xl bg-white/[0.06]"
          />
        ))}
      </div>
    </main>
  );
}
