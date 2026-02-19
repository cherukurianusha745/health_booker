import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = ({ user }) => {
  return (
    <div className="container py-5 fade-in">
      <div className="text-center mb-5">
        <h1>Welcome, {user?.name}!</h1>
        <p className="text-muted">Manage your healthcare appointments</p>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-search fa-3x text-primary mb-3"></i>
              <h5>Find Doctors</h5>
              <p className="text-muted">Browse and search for doctors</p>
              <Link to="/user/doctors" className="btn btn-primary">
                View Doctors
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-calendar-check fa-3x text-success mb-3"></i>
              <h5>My Appointments</h5>
              <p className="text-muted">View your booked appointments</p>
              <Link to="/user/appointments" className="btn btn-success">
                View Appointments
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-user-md fa-3x text-info mb-3"></i>
              <h5>Become a Doctor</h5>
              <p className="text-muted">Apply to join as a doctor</p>
              <Link to="/user/apply-doctor" className="btn btn-info">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!user?.isDoctor && (
        <div className="mt-4 text-center">
          <Link to="/user/add-doctor" className="btn btn-outline-primary">
            <i className="fas fa-plus me-2"></i>
            Add Doctor Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserHome;
