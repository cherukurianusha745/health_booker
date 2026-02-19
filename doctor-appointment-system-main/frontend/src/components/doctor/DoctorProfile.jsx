import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorProfile = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    specialty: '',
    experience: '',
    fees: '',
    address: '',
    image: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/doctors/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        email: data.email || '',
        specialty: data.specialty || '',
        experience: data.experience || '',
        fees: data.fees || '',
        address: data.address || '',
        image: data.image || ''
      });
    } catch (err) {
      // If profile doesn't exist, allow creating one
      console.log('No profile found, can create new one');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (profile) {
        // Update existing profile
        await axios.put(`/api/doctors/profile/${profile._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new profile
        await axios.post('/api/doctors/profile', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Doctor Profile</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? 'Cancel' : profile ? 'Edit Profile' : 'Add Profile'}
        </button>
      </div>

      {!profile && !isEditMode && (
        <div className="alert alert-info">
          <p className="mb-0">You haven't set up your doctor profile yet. Click "Add Profile" to create one.</p>
        </div>
      )}

      {isEditMode || !profile ? (
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Specialty</label>
                  <select
                    className="form-select"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Specialty</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Experience (years)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Consultation Fees ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center">
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={profile.firstName} 
                    className="img-fluid rounded"
                    style={{ maxHeight: '200px' }}
                  />
                ) : (
                  <div className="bg-secondary text-white p-5 rounded">
                    <i className="fas fa-user-md fa-4x"></i>
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <h3>Dr. {profile.firstName} {profile.lastName}</h3>
                <p className="text-muted">{profile.specialty}</p>
                
                <div className="row mt-4">
                  <div className="col-6">
                    <p><strong>Experience:</strong> {profile.experience} years</p>
                    <p><strong>Fees:</strong> ${profile.fees}</p>
                  </div>
                  <div className="col-6">
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                  </div>
                </div>
                
                <p className="mt-3"><strong>Address:</strong><br />{profile.address}</p>
                
                <p className="mt-3">
                  <strong>Status:</strong>{' '}
                  <span className={`badge bg-${
                    profile.status === 'approved' ? 'success' : 
                    profile.status === 'pending' ? 'warning' : 'danger'
                  }`}>
                    {profile.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
