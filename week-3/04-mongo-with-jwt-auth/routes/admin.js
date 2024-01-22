const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const result  = await Admin.findOne({username: req.body.username,
    password: req.body.password});

    if(result) {
        res.status(200).json({yourtoken: jwt.sign({username: req.body.username}, JWT_SECRET)});          
    } else {
        res.status(403).json({message: "Invaild user credentials"});
    }

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