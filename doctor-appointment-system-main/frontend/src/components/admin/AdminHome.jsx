import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = ({ user }) => {
  return (
    <div className="container py-5 fade-in">
      <div className="text-center mb-5">
        <h1>Welcome, Admin!</h1>
        <p className="text-muted">Manage the DocSpot platform</p>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-users fa-3x text-primary mb-3"></i>
              <h5>Manage Users</h5>
              <p className="text-muted">View and manage user accounts</p>
              <Link to="/admin/users" className="btn btn-primary">
                View Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-user-md fa-3x text-success mb-3"></i>
              <h5>Manage Doctors</h5>
              <p className="text-muted">Approve and manage doctor profiles</p>
              <Link to="/admin/doctors" className="btn btn-success">
                View Doctors
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-calendar-check fa-3x text-info mb-3"></i>
              <h5>Appointments</h5>
              <p className="text-muted">View all appointments</p>
              <Link to="/admin/appointments" className="btn btn-info">
                View Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
