const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key'; // Replace with a strong secret key

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/coursesDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and models
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Admin = mongoose.model('Admin', adminSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Helper function to create JWT token
function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

// Admin Routes
app.post('/admin/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/admin/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/admin/courses', async (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const newCourse = new Course({
        title,
        description,
        price,
        imageLink,
        published: true
      });

      await newCourse.save();
      res.json({ message: 'Course created successfully', courseId: newCourse._id });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/courses', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const courses = await Course.find();
      res.json({ courses });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Routes
app.post('/users/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/courses', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const courses = await Course.find();
      res.json({ courses });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users/courses/:courseId', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { courseId } = req.params;

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const course = await Course.findById(courseId);
      if (!course || !course.published) {
        return res.status(404).json({ error: 'Course not found' });
      }

      user.purchasedCourses.push(courseId);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/purchasedCourses', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.id).populate('purchasedCourses');

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      res.json({ purchasedCourses: user.purchasedCourses });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});