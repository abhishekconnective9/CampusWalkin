import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { collegesAPI } from '../services/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMapPin, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await collegesAPI.getAll();
      setColleges(response.data.colleges || []);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* ==================== HEADER ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16"
      >
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Top Universities</h1>
          <p className="text-xl text-green-100">Explore 100+ prestigious colleges and universities</p>

          {/* Search Box */}
          <div className="mt-8 max-w-md">
            <input
              type="text"
              placeholder="Search college by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
          </div>
        </div>
      </motion.section>

      <div className="container py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="mt-4 text-gray-600">Loading colleges...</p>
          </div>
        ) : filteredColleges.length > 0 ? (
          <>
            <div className="mb-8 text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredColleges.length}</span> colleges
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college, idx) => (
                <motion.div
                  key={college._id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* College Image/Logo */}
                  <div className="bg-gradient-to-r from-blue-400 to-green-400 h-40 flex items-center justify-center text-5xl rounded-lg mb-4">
                    🏫
                  </div>

                  {/* College Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="mr-2 text-green-600" />
                    <span>{college.city}, {college.state}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b">
                    <div className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-600" />
                      <div className="text-sm">
                        <p className="text-gray-600">Placement</p>
                        <p className="font-bold">{college.placementRate || 90}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiStar className="text-yellow-500" />
                      <div className="text-sm">
                        <p className="text-gray-600">Rating</p>
                        <p className="font-bold">{college.rating || 4.5}/5</p>
                      </div>
                    </div>
                  </div>

                  {/* Courses Offered */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Popular Courses:</p>
                    <div className="flex flex-wrap gap-2">
                      {['B.Tech', 'MBA', 'M.Tech'].map((course, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Recruiters */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Top Recruiters:</p>
                    <div className="flex gap-1 text-lg">
                      {'Google Amazon TCS Microsoft'.split(' ').map((company, i) => (
                        <span key={i} title={company} className="text-xl">
                          {company[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link href={`/colleges/${college._id}`} className="flex-1 btn-primary text-center">
                      View Details
                    </Link>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded-lg transition">
                      Compare
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-2xl text-gray-600">No colleges found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}