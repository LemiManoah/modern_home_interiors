import { Link } from "@inertiajs/react";

export default function NewHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308')" 
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-20">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium tracking-wider">PREMIUM INTERIOR DESIGN</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Transform Your Space Into
              <span className="block font-medium mt-2">Modern Elegance</span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-xl">
              We create beautiful, functional spaces that reflect your unique style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link 
                href="/catalogue" 
                className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition-colors duration-300 text-center"
              >
                Explore
              </Link>
              <Link 
                href="#contact" 
                className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300 text-center"
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
