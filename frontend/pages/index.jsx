import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import LeadForm from '../components/LeadForm';
import { coursesAPI } from '../services/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiUsers, FiAward, FiBriefcase } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEnquireForm, setShowEnquireForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      const response = await coursesAPI.getFeatured();
      setFeaturedCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquire = (course) => {
    setSelectedCourse(course);
    setShowEnquireForm(true);
  };

  // Testimonials Data
  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'Executive MBA',
      company: 'Google',
      text: 'CampusWalkin helped me find the perfect MBA program. The counselling was excellent and I got into my dream college!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Arjun Singh',
      course: 'B.Tech Engineering',
      company: 'Amazon',
      text: 'Excellent platform for college comparisons. Got placed within 3 months of graduation. Highly recommended!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Neha Gupta',
      course: 'PG Marketing',
      company: 'Deloitte',
      text: 'The career guidance was invaluable. Explored multiple specializations and chose the perfect fit. Great experience!',
      rating: 5,
      avatar: '👩‍🎓'
    }
  ];

  const recruiters = [
    { name: 'Google', logo: '🔍' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Accenture', logo: '💼' },
    { name: 'TCS', logo: '🏢' },
    { name: 'Infosys', logo: '💻' },
    { name: 'Deloitte', logo: '📊' },
    { name: 'Microsoft', logo: '🪟' },
    { name: 'Goldman Sachs', logo: '💰' }
  ];

  const domains = [
    { name: 'MBA', icon: '📈', color: 'from-blue-400 to-blue-600' },
    { name: 'IT & Engineering', icon: '💻', color: 'from-purple-400 to-purple-600' },
    { name: 'Finance', icon: '💰', color: 'from-green-400 to-green-600' },
    { name: 'Marketing', icon: '📢', color: 'from-pink-400 to-pink-600' },
    { name: 'Healthcare', icon: '⚕️', color: 'from-red-400 to-red-600' },
    { name: 'Design & UX', icon: '🎨', color: 'from-yellow-400 to-yellow-600' }
  ];

  const whyChooseUs = [
    {
      icon: <FiAward className="text-3xl text-blue-600" />,
      title: 'Expert Guidance',
      desc: 'Career counselors with 15+ years of experience'
    },
    {
      icon: <FiTrendingUp className="text-3xl text-green-600" />,
      title: '95% Placement',
      desc: 'Highest placement rate across all courses'
    },
    {
      icon: <FiUsers className="text-3xl text-purple-600" />,
      title: '50,000+ Students',
      desc: 'Trusted by thousands of students'
    },
    {
      icon: <FiBriefcase className="text-3xl text-pink-600" />,
      title: 'Top Recruiters',
      desc: 'Companies like Google, Amazon, TCS recruit'
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <Layout>
      {/* ==================== HERO BANNER ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Perfect Course Awaits 🎓
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get expert career guidance and find the best courses from top universities. Explore 500+ programs and connect with the right college.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-lg">
                  Explore All Courses <FiArrowRight />
                </Link>
                <button
                  onClick={() => setShowEnquireForm(true)}
                  className="border-3 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Free Counselling
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-100">Courses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-blue-100">Universities</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">95%</p>
                  <p className="text-blue-100">Placements</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Animated Illustration */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-9xl">🎓</div>
              <p className="text-2xl mt-4 text-blue-100">Discover Your Career Path</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CampusWalkin?</h2>
            <p className="text-gray-600 text-lg">Join thousands of students who found their perfect course</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="card text-center hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COURSES ==================== */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 text-lg">Handpicked programs from top universities</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin">⏳</div>
              <p className="mt-4 text-gray-600">Loading amazing courses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {featuredCourses.slice(0, 3).map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onEnquire={handleEnquire}
                  />
                ))}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="text-center"
              >
                <Link
                  href="/courses"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  View All Courses (500+) <FiArrowRight />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ==================== IN-DEMAND DOMAINS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">In-Demand Domains</h2>
            <p className="text-gray-600 text-lg">Choose from trending specializations with high placement rates</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {domains.map((domain, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${domain.color} rounded-lg p-6 text-center text-white cursor-pointer transition-all hover:shadow-xl`}
              >
                <div className="text-4xl mb-2">{domain.icon}</div>
                <h3 className="font-bold">{domain.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOP UNIVERSITIES ==================== */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partner Universities</h2>
            <p className="text-gray-600 text-lg">Learn from top-ranked institutions</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {[
              { name: 'IIT Delhi', rating: '⭐⭐⭐⭐⭐' },
              { name: 'Delhi University', rating: '⭐⭐⭐⭐⭐' },
              { name: 'Mumbai University', rating: '⭐⭐⭐⭐⭐' },
              { name: 'BITS Pilani', rating: '⭐⭐⭐⭐⭐' },
              { name: 'NIT Trichy', rating: '⭐⭐⭐⭐' },
              { name: 'JNTU Hyderabad', rating: '⭐⭐⭐⭐' },
              { name: 'Bangalore University', rating: '⭐⭐⭐⭐' },
              { name: 'Symbiosis Pune', rating: '⭐⭐⭐⭐' }
            ].map((uni, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="card text-center hover:border-2 hover:border-blue-600 transition-all"
              >
                <div className="text-5xl mb-3">🏫</div>
                <h3 className="font-bold text-lg">{uni.name}</h3>
                <p className="text-sm mt-2">{uni.rating}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOP RECRUITERS ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Recruiters</h2>
            <p className="text-gray-600 text-lg">Our students are hired by leading companies worldwide</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {recruiters.map((recruiter, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="text-5xl mb-2">{recruiter.logo}</div>
                <p className="font-semibold text-sm text-center">{recruiter.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-gray-600 text-lg">Hear from students who achieved their dreams</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                    <p className="text-xs text-gray-500">{testimonial.course}</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-3">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FORM SECTION ==================== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
              <p className="text-blue-100 text-lg mb-8">
                Get free counselling from our expert career advisors. We'll help you find the perfect course and university matching your goals.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-2xl" />
                  <span>100% Free Counselling</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-2xl" />
                  <span>Expert Guidance from Career Professionals</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-2xl" />
                  <span>Access to 500+ Courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-2xl" />
                  <span>Personalized Course Recommendations</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <LeadForm source="Home" onSuccess={() => setShowEnquireForm(false)} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How do I find the right course for me?',
                a: 'Our career advisors will assess your interests, skills, and career goals to recommend the most suitable courses.'
              },
              {
                q: 'Are the courses online or offline?',
                a: 'We offer both online and offline courses from various universities. You can filter based on your preference.'
              },
              {
                q: 'What is the placement rate?',
                a: 'Our partner universities have an average placement rate of 95% across all programs.'
              },
              {
                q: 'How much does the counselling cost?',
                a: 'Our counselling services are completely free! We aim to help students find their perfect course without any cost.'
              }
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-all"
              >
                <summary className="font-bold text-lg text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span>+</span>
                </summary>
                <p className="mt-4 text-gray-700">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FLOATING CHAT BUTTON ==================== */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
      >
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 text-lg font-bold transition-all"
          onClick={() => window.open('https://wa.me/919876543210', '_blank')}
        >
          💬 Chat
        </button>
      </motion.div>

      {/* ==================== MODAL FORM ==================== */}
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
            className="bg-white rounded-lg max-w-md w-full"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold">Get Free Counselling</h3>
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
                source="Popup"
                onSuccess={() => setShowEnquireForm(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}