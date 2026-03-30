import React from 'react';
import Link from 'next/link';
import { FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CourseCard({ course, onEnquire }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="card overflow-hidden"
    >
      {/* Course Image */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-40 flex items-center justify-center text-white text-4xl">
        🎓
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>

        {/* University */}
        <p className="text-gray-600 text-sm mb-3">{course.university?.name || 'University'}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center">
            <FiDollarSign className="mr-2 text-blue-600" />
            <span>₹ {course.fees?.toLocaleString()} {course.duration}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-2 text-blue-600" />
            <span>{course.location}</span>
          </div>
          {course.rating && (
            <div className="flex items-center">
              <FiStar className="mr-2 text-yellow-500" />
              <span>{course.rating} / 5 ({course.reviews?.length || 0} reviews)</span>
            </div>
          )}
        </div>

        {/* Certifications */}
        {course.certifications && course.certifications.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {course.certifications.slice(0, 2).map((cert, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Link href={`/courses/${course._id}`} className="flex-1 btn-primary text-center">
            View Details
          </Link>
          <button
            onClick={() => onEnquire(course)}
            className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded-lg transition"
          >
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  );
}