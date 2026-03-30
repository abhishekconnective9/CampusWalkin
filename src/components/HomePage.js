import React from 'react';
import './HomePage.css'; // Assuming you will create this CSS file for styling

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <h1>Welcome to CampusWalkin</h1>
                <p>Your journey to success starts here.</p>
                <a href="#featured-courses" className="cta-button">Explore Courses</a>
            </section>

            {/* Featured Courses Section */}
            <section id="featured-courses" className="featured-courses">
                <h2>Featured Courses</h2>
                <div className="courses-list">
                    <div className="course">
                        <h3>Course Title 1</h3>
                        <p>Short description of Course 1.</p>
                        <a href="#" className="course-link">Learn More</a>
                    </div>
                    <div className="course">
                        <h3>Course Title 2</h3>
                        <p>Short description of Course 2.</p>
                        <a href="#" className="course-link">Learn More</a>
                    </div>
                    <div className="course">
                        <h3>Course Title 3</h3>
                        <p>Short description of Course 3.</p>
                        <a href="#" className="course-link">Learn More</a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>What Our Students Say</h2>
                <div className="testimonial">
                    <p>"CampusWalkin helped me to achieve my dreams!" - Student 1</p>
                </div>
                <div className="testimonial">
                    <p>"The courses are well-structured and informative." - Student 2</p>
                </div>
                <div className="testimonial">
                    <p>"I landed my dream job after completing a course here." - Student 3</p>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta">
                <h2>Ready to take the next step?</h2>
                <a href="#" className="cta-button">Sign Up Now</a>
            </section>
        </div>
    );
};

export default HomePage;