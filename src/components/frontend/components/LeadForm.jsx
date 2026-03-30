import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { leadsAPI } from '../services/api';
import { motion } from 'framer-motion';

export default function LeadForm({ courseTitle = '', courseType = '', source = 'Home', onSuccess }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        courseInterested: courseTitle || data.courseInterested,
        courseType: courseType || data.courseType,
        leadSource: source
      };

      await leadsAPI.submit(payload);
      setMessage('✅ Form submitted successfully! We will contact you soon.');
      reset();

      setTimeout(() => {
        setMessage('');
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (error) {
      setMessage('❌ Error submitting form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    >
      <h3 className="text-2xl font-bold text-gray-900">Get Free Counselling</h3>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register('firstName', { required: 'First name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Course & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select
            {...register('courseInterested', { required: 'Course is required' })}
            defaultValue={courseTitle}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Select Course</option>
            <option value="MBA">Executive MBA</option>
            <option value="Engineering">Bachelor of Engineering</option>
            <option value="Commerce">Bachelor of Commerce</option>
            <option value="Arts">Bachelor of Arts</option>
          </select>
          {errors.courseInterested && <span className="text-red-500 text-sm">{errors.courseInterested.message}</span>}
        </div>
        <div>
          <select
            {...register('preferredLocation', { required: 'Location is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Select Location</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          {errors.preferredLocation && <span className="text-red-500 text-sm">{errors.preferredLocation.message}</span>}
        </div>
      </div>

      {/* Message */}
      <div>
        <textarea
          placeholder="Additional Message (Optional)"
          rows="3"
          {...register('message')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
        ></textarea>
      </div>

      {/* Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-3 rounded-lg text-center ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {message}
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Get Free Counselling'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your information is secure and will only be used to contact you about your enquiry.
      </p>
    </motion.form>
  );
}