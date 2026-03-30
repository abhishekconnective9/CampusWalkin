import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            🎓 CampusWalkin
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center hover:text-blue-600 transition">
                Courses <FiChevronDown className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
                <Link href="/courses?type=UG" className="block px-4 py-2 hover:bg-blue-50">
                  Undergraduate
                </Link>
                <Link href="/courses?type=PG" className="block px-4 py-2 hover:bg-blue-50">
                  Postgraduate
                </Link>
                <Link href="/courses?type=MBA" className="block px-4 py-2 hover:bg-blue-50">
                  Executive MBA
                </Link>
              </div>
            </div>

            <Link href="/colleges" className="hover:text-blue-600 transition">
              Colleges
            </Link>
            <Link href="/#contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-50 border-t"
          >
            <div className="container py-4 space-y-4">
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
              <button
                onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                className="block w-full text-left"
              >
                Courses
              </button>
              {isCoursesDropdownOpen && (
                <div className="pl-4 space-y-2">
                  <Link href="/courses?type=UG" className="block hover:text-blue-600">
                    Undergraduate
                  </Link>
                  <Link href="/courses?type=PG" className="block hover:text-blue-600">
                    Postgraduate
                  </Link>
                  <Link href="/courses?type=MBA" className="block hover:text-blue-600">
                    Executive MBA
                  </Link>
                </div>
              )}
              <Link href="/colleges" className="block hover:text-blue-600">
                Colleges
              </Link>
              <Link href="/#contact" className="block hover:text-blue-600">
                Contact
              </Link>
              <Link href="/login" className="block hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="btn-primary block text-center">
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <p className="text-gray-400">
              CampusWalkin helps students and professionals find the perfect course.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/colleges">Colleges</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:support@campuswalkin.com">Email</a></li>
              <li><a href="tel:+919876543210">Call Us</a></li>
              <li><a href="">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 CampusWalkin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}