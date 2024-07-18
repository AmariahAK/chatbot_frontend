// server.js

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB URI (replace with your MongoDB connection string)
const mongoURI = 'mongodb+srv://amariahabish:LKEoTsHdwUcS88VG@chatbotfrontend.vnotskk.mongodb.net/?retryWrites=true&w=majority&appName=ChatbotFrontend';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// MongoDB schemas and models
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Chat schema
const ChatSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);

// JWT secret (change this to a secure random string)
const JWT_SECRET = 'your_jwt_secret';

// Middleware for JWT authentication
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Attach user object to request
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10) // Hash password before saving
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ user: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

        // Return token and user data (except password)
        const { password: _, ...userWithoutPassword } = newUser;
        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Return token and user data (except password)
        const { password: _, ...userWithoutPassword } = user;
        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile route
app.put('/api/profile', authenticateUser, async (req, res) => {
    const { username, email } = req.body;
    const userId = req.user;

    try {
        // Update user data
        const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return updated user data (except password)
        const { password: _, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout route (optional, depending on session management)
app.post('/api/logout', authenticateUser, (req, res) => {
    // For JWT-based authentication, no action needed to logout client-side
    res.json({ message: 'Logged out successfully' });
});

// Get all users (for example purposes)
app.get('/api/users', authenticateUser, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from response
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get chat history route
app.get('/api/chats', authenticateUser, async (req, res) => {
    try {
        const chats = await Chat.find().populate('userId', 'username'); // Populate user details
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add chat message route
app.post('/api/chats', authenticateUser, async (req, res) => {
    const { message } = req.body;
    const userId = req.user;

    try {
        // Create new chat message
        const newChat = new Chat({
            userId,
            message
        });

        // Save chat message to database
        await newChat.save();

        // Return success message or new chat data
        res.json(newChat);
    } catch (error) {
        console.error('Error adding chat message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Server error' });
});

// Define a port (you can change this as needed)
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
