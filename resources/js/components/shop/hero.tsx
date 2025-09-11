import { Link } from "@inertiajs/react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308)" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content wrapper */}
      <div className="flex w-full justify-center lg:justify-start">
        <div className="max-w-2xl px-6 text-center lg:text-left lg:pl-32 xl:pl-40 2xl:pl-48 text-white z-10">
          <p className="text-base sm:text-lg mb-8">
            THE #1 INTERIOR DESIGN SERVICE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Designing your
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Dream Home Just
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            Became a reality
          </h1>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-amber-700 px-6 py-3 text-white font-medium hover:bg-amber-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
