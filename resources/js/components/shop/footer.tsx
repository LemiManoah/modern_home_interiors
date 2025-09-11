import React from 'react';
import { Link } from '@inertiajs/react';
import { Instagram, } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 py-20">
                {/* Footer Top */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                            <svg className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                            </svg>
                            <Link href="#home" className="ml-3 text-xl tracking-tight">Modern Home Interiors</Link>
                        </div>
                        <p className="text-gray-400 font-extralight mb-6 max-w-sm">
                            Empowering teams worldwide with seamless collaboration tools and intelligent workflow solutions.
                        </p>
                        <div className="flex items-center space-x-2">
                            <a href="https://www.instagram.com/modernhomeinteriors6?igsh=cDd3cWJhamZwdjE5" className="text-gray-400 hover:text-black transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="https://wa.me/256775394449" className="text-gray-400 hover:text-black transition-colors">
                                <FaWhatsapp className="h-4 w-4" />
                            </a>
                            <a href="https://www.tiktok.com/@interiorist256?_t=ZM-8yWBvnpTRiy&_r=1" className="text-gray-400 hover:text-black transition-colors">
                                <FaTiktok className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-sm font-normal uppercase text-gray-500 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="#home" className="text-gray-400 hover:text-white transition-colors font-extralight">Home</Link></li>
                            <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors font-extralight">Contact</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Products</Link></li>
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Categories</Link></li>
                            <li><Link href="#works" className="text-gray-400 hover:text-white transition-colors font-extralight">Works</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-normal uppercase text-gray-500 mb-4">Products</h3>
                        <ul className="space-y-3">
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Interior</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Exterior</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Furniture</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Lighting</Link></li>
                            <li><Link href="#products" className="text-gray-400 hover:text-white transition-colors font-extralight">Decor</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-normal uppercase text-gray-500 mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Interior</Link></li>
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Exterior</Link></li>
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Furniture</Link></li>
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Lighting</Link></li>
                            <li><Link href="#categories" className="text-gray-400 hover:text-white transition-colors font-extralight">Decor</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 font-extralight text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Modern Home Interiors. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;