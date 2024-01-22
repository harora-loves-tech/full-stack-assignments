const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    Admin.findOne({username: req.body.username})
    .then(function(value) {
        if(value) {
            res.status(400).json({message: "Admin already exists"})
            return;
        }
    });    
    Admin.create({username: req.body.username,
        password: req.body.password,
        name: req.body.name
    });

    res.status(200).json({message: "Admin created successfully"});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    res.status(201).json({message: "Course added succesfully", courseId: newCourse._id});

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({ courses: allCourses });
});

module.exports = router;