import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h1>Welcome to DocSpot</h1>
              <p>Seamless Appointment Booking for Your Health</p>
              <div className="mt-4">
                <Link to="/register" className="btn btn-light btn-lg me-2">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose DocSpot?</h2>
            <p className="text-muted">The easiest way to book doctor appointments</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-search"></i>
                <h3>Find Doctors</h3>
                <p>Browse through a wide range of doctors and healthcare providers</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-calendar-check"></i>
                <h3>Easy Booking</h3>
                <p>Book appointments instantly with real-time availability</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-bell"></i>
                <h3>Notifications</h3>
                <p>Get instant notifications about your appointment status</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>How It Works</h2>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-user-plus fa-2x"></i>
                </div>
                <h5 className="mt-3">1. Register</h5>
                <p className="text-muted">Create your account</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-search fa-2x"></i>
                </div>
                <h5 className="mt-3">2. Find Doctor</h5>
                <p className="text-muted">Search for doctors</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-calendar-plus fa-2x"></i>
                </div>
                <h5 className="mt-3">3. Book</h5>
                <p className="text-muted">Select date and time</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-check-circle fa-2x"></i>
                </div>
                <h5 className="mt-3">4. Get Care</h5>
                <p className="text-muted">Visit your doctor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 DocSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
