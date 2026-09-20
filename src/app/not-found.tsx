import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-gold">404</p>
      <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Nothing at this address
      </h1>
      <p className="mt-3 max-w-sm text-cream/60">
        The page you were after has moved or never existed. The shop is still open, though.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className="rounded-full bg-gold px-6 py-3 font-semibold text-midnight transition hover:bg-gold-light"
        >
          Go to the shop
        </Link>
        <Link
          href="/"
          className="rounded-full border border-steel/50 px-6 py-3 font-semibold text-cream transition hover:border-steel/80"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
