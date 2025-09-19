// components/Footer.tsx
"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 relative">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        {/* Quick Links */}
        <div className="animate-fadeInUp">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="animate-fadeInUp delay-200">
          <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
          <ul className="space-y-2">
            <li><Link href="/services/web" className="hover:text-blue-400">Web Development</Link></li>
            <li><Link href="/services/mobile" className="hover:text-blue-400">Mobile Apps</Link></li>
            <li><Link href="/services/data" className="hover:text-blue-400">Data Analytics</Link></li>
            <li><Link href="/services/cloud" className="hover:text-blue-400">Cloud Solutions</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="animate-fadeInUp delay-400">
          <h3 className="text-lg font-semibold mb-4 text-white">Connect With Me</h3>
          <p className="mb-2">📧 malleshbitm460@gmai.com</p>
          <p className="mb-4">📞 9901946647</p>

          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
          </div>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
  type="email"
  placeholder="Your Email"
  aria-label="Email for newsletter"
  className="px-3 py-2 rounded w-full text-white border border-white "
/>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center relative">
        <p>&copy; {new Date().getFullYear()} Mallesh Portfolio. All rights reserved.</p>

        {/* Back to top */}
        <a
          href="#"
          className="absolute right-6 top-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition animate-bounce"
          aria-label="Back to top"
        >
          <FaChevronUp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
