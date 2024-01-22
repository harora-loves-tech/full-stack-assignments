const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    User.create({ username: req.body.username,
        password: req.body.password,
        name: req.body.name 
     });

     res.status(201).json({message: "User created successfully"});
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({ courses: allCourses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const value = await User.updateOne({username : username},
        {"$push": {purchasedCourses: courseId}});

    res.status(200).json({message: "Purchase complete"});    

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({username: ReadableStreamBYOBRequest.headers.username});
    const courses = await Course.find({
        _id: { "$in": user.purchasedCourses}
    });
    res.status(200).json(courses);
});

module.exports = router