import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import LeadForm from '../../components/LeadForm';
import { coursesAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiDollarSign, FiAward, FiClock, FiUsers } from 'react-icons/fi';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    if (id) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await coursesAPI.getById(id);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="text-2xl text-gray-600">Course not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ==================== HERO ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <FiMapPin /> {course.location}
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign /> ₹ {course.fees?.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <FiClock /> {course.duration}
                </div>
              </div>
            </div>

            {/* Sticky Apply Button */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-lg p-6 text-gray-900 h-fit sticky top-20"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">₹ {course.fees?.toLocaleString()}</div>
              <p className="text-gray-600 mb-6">Duration: {course.duration}</p>

              <button
                onClick={() => setShowApplyForm(true)}
                className="w-full btn-primary mb-3 text-lg"
              >
                Apply Now
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition">
                Download Brochure
              </button>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-blue-600" />
                  <div className="text-sm">
                    <p className="text-gray-600">Placements</p>
                    <p className="font-bold">{course.placementAverage || 95}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-500" />
                  <div className="text-sm">
                    <p className="text-gray-600">Rating</p>
                    <p className="font-bold">{course.rating}/5</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="container py-16">
        {/* ==================== TAB NAVIGATION ==================== */}
        <div className="flex gap-4 mb-12 border-b overflow-x-auto">
          {['overview', 'curriculum', 'placements', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

              {/* Key Highlights */}
              <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <FiAward className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Certification</p>
                    <p className="text-gray-600 text-sm">{course.certifications?.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <FiUsers className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Placement Rate</p>
                    <p className="text-gray-600 text-sm">{course.placementAverage || 95}% average salary</p>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <h3 className="text-2xl font-bold mb-4">Eligibility Criteria</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700">{course.eligibility || 'Bachelor\'s degree in any discipline'}</p>
              </div>

              {/* Top Recruiters */}
              <h3 className="text-2xl font-bold mb-4">Top Recruiters</h3>
              <div className="flex flex-wrap gap-4">
                {(course.topRecruiters || ['Google', 'Amazon', 'TCS', 'Infosys']).map((recruiter, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 px-6 py-3 rounded-lg font-semibold text-gray-900">
                    {recruiter}
                  </div>
                ))}
              </div>
            </div>

            {/* University Info */}
            <div>
              <div className="card sticky top-20">
                <h3 className="text-2xl font-bold mb-4">University</h3>
                <div className="text-5xl mb-4">🏫</div>
                <h4 className="text-xl font-bold mb-2">{course.university?.name}</h4>
                <p className="text-gray-600 mb-6">{course.location}</p>

                <button className="w-full btn-secondary mb-3">View University Profile</button>
                <button className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-2 px-4 rounded-lg transition">
                  Contact University
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== CURRICULUM TAB ==================== */}
        {activeTab === 'curriculum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8">Curriculum</h2>
            <div className="space-y-4">
              {(course.modulesCovered || ['Advanced Programming', 'Data Structures', 'Web Development', 'Cloud Computing']).map((module, idx) => (
                <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-600 transition-all cursor-pointer">
                  <h4 className="font-bold text-lg mb-2">Module {idx + 1}: {module}</h4>
                  <p className="text-gray-600">Comprehensive coverage of {module.toLowerCase()} with hands-on projects</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==================== PLACEMENTS TAB ==================== */}
        {activeTab === 'placements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8">Placement Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{course.placementAverage || 95}%</div>
                <p className="text-gray-600">Placement Rate</p>
              </div>
              <div className="card text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">₹ 15 LPA</div>
                <p className="text-gray-600">Average Salary</p>
              </div>
              <div className="card text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">₹ 45 LPA</div>
                <p className="text-gray-600">Highest Salary</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== REVIEWS TAB ==================== */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8">Student Reviews</h2>
            <div className="space-y-6">
              {(course.reviews || [
                { user: 'John Doe', rating: 5, comment: 'Excellent course with great faculty support!' },
                { user: 'Jane Smith', rating: 5, comment: 'Got placed within 2 months of completion.' }
              ]).map((review, idx) => (
                <div key={idx} className="bg-white rounded-lg border p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{review.user}</p>
                      <p className="text-sm text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ==================== APPLY FORM MODAL ==================== */}
      {showApplyForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowApplyForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-2xl font-bold">Apply Now</h3>
              <button
                onClick={() => setShowApplyForm(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <LeadForm
                courseTitle={course.title}
                courseType={course.courseType}
                source="Course"
                onSuccess={() => setShowApplyForm(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      