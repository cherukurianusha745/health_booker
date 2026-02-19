const express = require('express');
const router = express.Router();
const adminC = require('../controllers/adminC');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// All routes require authentication and admin privileges
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', adminC.getAllUsers);
router.get('/doctors', adminC.getAllDoctors);
router.get('/appointments', adminC.getAllAppointments);
router.get('/stats', adminC.getDashboardStats);

router.put('/doctors/:id/approve', adminC.approveDoctor);
router.put('/doctors/:id/reject', adminC.rejectDoctor);
router.delete('/users/:id', adminC.deleteUser);
router.delete('/doctors/:id', adminC.deleteDoctor);

module.exports = router;
