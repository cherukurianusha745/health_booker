const express = require('express');
const router = express.Router();
const doctorC = require('../controllers/doctorC');
const { authMiddleware, doctorMiddleware } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Doctor profile
router.get('/profile', doctorC.getDoctorProfile);
router.get('/appointments', doctorC.getDoctorAppointments);
router.put('/appointments/:id', doctorC.updateAppointmentStatus);

// Admin only routes
router.get('/all', doctorMiddleware, doctorC.getAllDoctors);
router.put('/approve/:id', doctorMiddleware, doctorC.approveDoctor);
router.put('/reject/:id', doctorMiddleware, doctorC.rejectDoctor);

module.exports = router;
