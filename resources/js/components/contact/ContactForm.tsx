import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneAlt, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Instagram } from 'lucide-react';

interface ContactFormProps {
  success?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ success: initialSuccess }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState(initialSuccess);

  useEffect(() => {
    setSuccessMessage(initialSuccess);
    if (initialSuccess) {
      const timer = setTimeout(() => setSuccessMessage(undefined), 5000);
      return () => clearTimeout(timer);
    }
  }, [initialSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact/store', {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
      <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-10">
        Contact <span className="font-normal">Us</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-light tracking-wider">Get in Touch</h2>
            <p className="text-gray-600">
              We're here to transform your spaces into beautiful, functional environments.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <IoLocationOutline className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Our Location</h3>
                <p className="text-gray-600">
                  Mbaguta street at central market building, Mbarara, Uganda
                </p>
                <p className="text-gray-600">
                  Then Makhansing street, opposite Kyosiga house
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MdOutlineEmail className="w-6 h-6 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">Email Us</h3>
                <a 
                  href="mailto:modernhomeinteriorsug@gmail.com" 
                  className="text-blue-600 hover:underline"
                >
                  modernhomeinteriorsug@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">Call Us</h3>
                <a href="tel:+256775394449" className="text-gray-600 hover:text-blue-600">
                  +256 775 394449
                </a>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/modernhomeinteriors6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/256775394449" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@interiorist256" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-light tracking-wider mb-6">
            Send Us a Message
          </h2>
          
          {successMessage && (
            <div className="mb-6 p-3 text-sm text-green-700 bg-green-100 rounded-md">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={processing}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {processing ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
