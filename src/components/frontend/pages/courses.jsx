import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import LeadForm from '../components/LeadForm';
import { coursesAPI } from '../services/api';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showEnquireForm, setShowEnquireForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter States
  const [filters, setFilters] = useState({
    courseType: '',
    minFees: '',
    maxFees: '',
    location: '',
    specialization: '',
    search: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (filterObj = filters) => {
    setLoading(true);
    try {
      const response = await coursesAPI.getAll(filterObj);
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchCourses(newFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value });
    // Debounce search
    setTimeout(() => {
      fetchCourses({ ...filters, search: value });
    }, 500);
  };

  const resetFilters = () => {
    const emptyFilters = {
      courseType: '',
      minFees: '',
      maxFees: '',
      location: '',
      specialization: '',
      search: ''
    };
    setFilters(emptyFilters);
    fetchCourses(emptyFilters);
  };

  const handleEnquire = (course) => {
    setSelectedCourse(course);
    setShowEnquireForm(true);
  };

  return (
    <Layout>
      {/* ==================== HEADER ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
      >
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-blue-100">Find the perfect course from 500+ programs across top universities</p>
        </div>
      </motion.section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ==================== FILTERS SIDEBAR ==================== */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Course name..."
                    value={filters.search}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Course Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Course Type</label>
                <select
                  value={filters.courseType}
                  onChange={(e) => handleFilterChange('courseType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">All Types</option>
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                  <option value="MBA">Executive MBA</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">All Locations</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Specialization</label>
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">All Specializations</option>
                  <option value="IT">IT & Engineering</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Design">Design & UX</option>
                </select>
              </div>

              {/* Fee Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Fee Range</label>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min Fees"
                    value={filters.minFees}
                    onChange={(e) => handleFilterChange('minFees', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="number"
                    placeholder="Max Fees"
                    value={filters.maxFees}
                    onChange={(e) => handleFilterChange('maxFees', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Apply Button (Mobile) */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full lg:hidden btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>

          {/* ==================== COURSES LIST ==================== */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-3"
          >
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <FiFilter /> Filters
              </button>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Courses Found: <span className="text-blue-600">{courses.length}</span>
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                <option>Sort by Popularity</option>
                <option>Sort by Fee (Low to High)</option>
                <option>Sort by Fee (High to Low)</option>
                <option>Sort by Rating</option>
              </select>
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin text-4xl">⏳</div>
                <p className="mt-4 text-gray-600">Loading courses...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onEnquire={handleEnquire}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-2xl text-gray-600">No courses found matching your criteria</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {courses.length > 0 && (
              <div className="mt-12 flex justify-center gap-4">
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                  ← Previous
                </button>
                <div className="flex gap-2">
                  {[1, 2, 3].map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next →
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ==================== ENQUIRE MODAL ==================== */}
      {showEnquireForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEnquireForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-2xl font-bold">Enquire Now</h3>
              <button
                onClick={() => setShowEnquireForm(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <LeadForm
                courseTitle={selectedCourse?.title}
                courseType={selectedCourse?.courseType}
                source="Course"
                onSuccess={() => setShowEnquireForm(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}