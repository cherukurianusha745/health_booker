import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorList = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/users/doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(data);
    } catch (err) {
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/users/appointments',
        {
          doctorId: selectedDoctor._id,
          date: bookingData.date,
          time: bookingData.time,
          notes: bookingData.notes
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Appointment booked successfully!');
      setSelectedDoctor(null);
      setBookingData({ date: '', time: '', notes: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="mb-4">Available Doctors</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-md-6 col-lg-4 mb-4">
            <div className="doctor-card">
              <div className="doctor-info">
                {doctor.image ? (
                  <img 
                    src={`http://localhost:5000/${doctor.image}`} 
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className="doctor-image"
                  />
                ) : (
                  <div 
                    className="doctor-image d-flex align-items-center justify-content-center bg-primary text-white"
                    style={{ borderRadius: '50%', width: '100px', height: '100px', margin: '0 auto 15px', fontSize: '2rem' }}
                  >
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </div>
                )}
                <h5>Dr. {doctor.firstName} {doctor.lastName}</h5>
                <span className="specialty-badge">{doctor.specialty}</span>
                <p className="mb-1"><strong>Experience:</strong> {doctor.experience}</p>
                <p className="mb-1"><strong>Fees:</strong> ${doctor.fees}</p>
                <p className="mb-3"><strong>Address:</strong> {doctor.address}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleBookClick(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Book Appointment with Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSelectedDoctor(null)}
                ></button>
              </div>
              <form onSubmit={handleBookingSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="Any symptoms or notes for the doctor..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedDoctor(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
