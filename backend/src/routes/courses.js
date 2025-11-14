const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const { upload } = require('../utils/fileStorage');

const { createCourse, listCourses, getCourse, enroll } = require('../controllers/courseController');

// public list
router.get('/', listCourses);
router.get('/:slug', getCourse);

// instructor protected

router.post('/', auth, requireRole('instructor'), upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'assets', maxCount: 5 }]), createCourse);

// enroll
router.post('/enroll', auth, enroll);

module.exports = router;
