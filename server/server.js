const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
// app.use(cors(corsOptions));
app.use(cors({
  origin: "https://event-sphere-aplr2tgfm-patel-oms-projects-679f2516.vercel.app",
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
