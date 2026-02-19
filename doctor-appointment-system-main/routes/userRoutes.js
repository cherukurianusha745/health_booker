const express = require('express');
const router = express.Router();
const userC = require('../controllers/userC');
const { authMiddleware } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Public routes
router.post('/register', userC.register);
router.post('/login', userC.login);
router.get('/doctors', userC.getAllDoctors);
router.get('/doctors/:id', userC.getDoctorById);

// Protected routes
router.get('/profile/:id', authMiddleware, userC.getUserById);
router.post('/appointments', authMiddleware, userC.bookAppointment);
router.get('/appointments', authMiddleware, userC.getUserAppointments);
router.put('/appointments/:id/cancel', authMiddleware, userC.cancelAppointment);
router.post('/apply-doctor', authMiddleware, upload.single('image'), userC.applyForDoctor);

module.exports = router;
