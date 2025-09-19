import { Link } from "@inertiajs/react";

export default function NewHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: "url('/images/hero.webp')" 
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-20">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium tracking-wider">PREMIUM INTERIOR MATERIALS</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Quality Materials for
              <span className="block font-medium mt-2">Your Dream Home</span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-xl">
              Discover our premium selection of high-quality materials to bring your home renovation and design projects to life.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <Link 
                href="/catalogue" 
                className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition-colors duration-300"
              >
                Explore
              </Link>
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300"
              >
                Reach Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
