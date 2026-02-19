import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Common Components
import Home from './components/common/Home';
import Login from './components/common/Login';
import Register from './components/common/Register';
import Notifications from './components/common/Notifications';

// User Components
import UserHome from './components/user/UserHome';
import DoctorList from './components/user/DoctorList';
import ApplyDoctor from './components/user/ApplyDoctor';
import AddDoctor from './components/user/AddDoctor';
import UserAppointments from './components/user/UserAppointments';

// Admin Components
import AdminHome from './components/admin/AdminHome';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminAppointments from './components/admin/AdminAppointments';

// Doctor Components
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorProfile from './components/doctor/DoctorProfile';

// CSS
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">
              <i className="fas fa-hospital-user me-2"></i>
              DocSpot
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {!user ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">Register</a>
                    </li>
                  </>
                ) : (
                  <>
                    {user.isAdmin ? (
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/admin">Dashboard</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/admin/users">Users</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/admin/appointments">Appointments</a>
                        </li>
                      </>
                    ) : user.isDoctor ? (
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/doctor">Dashboard</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/doctor/profile">My Profile</a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/user">Home</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/user/doctors">Find Doctors</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/user/appointments">My Appointments</a>
                        </li>
                      </>
                    )}
                    <li className="nav-item">
                      <button className="btn btn-outline-light ms-2" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          
          {/* User Routes */}
          <Route path="/user" element={user && !user.isAdmin ? <UserHome user={user} /> : <Navigate to="/login" />} />
          <Route path="/user/doctors" element={user && !user.isAdmin ? <DoctorList user={user} /> : <Navigate to="/login" />} />
          <Route path="/user/appointments" element={user && !user.isAdmin ? <UserAppointments user={user} /> : <Navigate to="/login" />} />
          <Route path="/user/apply-doctor" element={user && !user.isAdmin ? <ApplyDoctor user={user} /> : <Navigate to="/login" />} />
          <Route path="/user/add-doctor" element={user && !user.isAdmin ? <AddDoctor user={user} /> : <Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user && user.isAdmin ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin/users" element={user && user.isAdmin ? <AdminUsers user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin/appointments" element={user && user.isAdmin ? <AdminAppointments user={user} /> : <Navigate to="/login" />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor" element={user && user.isDoctor ? <DoctorDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/doctor/profile" element={user && user.isDoctor ? <DoctorProfile user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
