import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-800 text-white pt-12 pb-8 mt-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Brand/Logo */}
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h3.375a.375.375 0 00.375-.375V16.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.125c0 .207.168.375.375.375h3.375c.621 0 1.125-.504 1.125-1.125V9.75M8.25 22.5h7.5" />
          </svg>
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">NextProperty</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">Your one-stop solution for finding the perfect property. Let us guide you home.</p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-semibold text-base text-gray-100 tracking-wider uppercase mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">Home</Link></li>
          <li><Link to="/properties" className="text-gray-400 hover:text-orange-400 transition-colors">Properties</Link></li>
          <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-semibold text-base text-gray-100 tracking-wider uppercase mb-4">Contact Us</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><span className="font-semibold text-gray-200">Email:</span> info@nextproperty.com</li>
          <li><span className="font-semibold text-gray-200">Phone:</span> +91 98765 43210</li>
          <li><span className="font-semibold text-gray-200">Address:</span> 123 Main St, Delhi, India</li>
        </ul>
      </div>

      {/* Stay Updated */}
      <div>
        <h3 className="font-semibold text-base text-gray-100 tracking-wider uppercase mb-4">Stay Updated</h3>
        <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter for the latest properties and news.</p>
        <form className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
          >
            Go
          </button>
        </form>
        <div className="flex gap-4 mt-4">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg></a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.633 7.997c.013.176.013.353.013.53 0 5.39-4.104 11.61-11.61 11.61-2.307 0-4.454-.676-6.263-1.845.322.038.63.05.965.05 1.92 0 3.684-.654 5.096-1.757-1.797-.037-3.316-1.22-3.84-2.85.25.037.5.062.765.062.366 0 .73-.05 1.07-.142-1.877-.378-3.29-2.037-3.29-4.032v-.05c.553.308 1.19.495 1.87.517a4.07 4.07 0 01-1.81-3.39c0-.75.202-1.45.553-2.055 2.01 2.47 5.02 4.09 8.42 4.26-.07-.3-.11-.61-.11-.93 0-2.25 1.83-4.08 4.08-4.08 1.17 0 2.23.495 2.97 1.29.92-.18 1.78-.517 2.56-.98-.3.93-.93 1.71-1.75 2.2.82-.1 1.6-.32 2.33-.65-.54.81-1.22 1.52-2 2.09z" /></svg></a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.279 6.068 2.267 6.477 2.267 12c0 5.523.012 5.932.071 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967.967 1.239-2.14 1.297-3.418.059-1.28.071-1.689.071-7.212 0-5.523-.012-5.932-.071-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg></a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} NextProperty. All Rights Reserved.
    </div>
  </footer>
);

export default Footer; 