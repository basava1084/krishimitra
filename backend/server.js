require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');
const { socketHandler } = require('./sockets/socketHandler');

// Load Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS — allow both 5173 and 5174
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Security (helmet only — removed xss-clean and mongo-sanitize which crash on Node 22)
app.use(helmet({
  contentSecurityPolicy: false // Allow frontend to connect
}));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static Folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'KrishiMitra API is healthy', time: new Date().toISOString() });
});

// Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Socket.io Setup
const io = socketio(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000
});

// Initialize Socket Handler
socketHandler(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 KrishiMitra Backend Nexus active on port ${PORT}`);
});

// Handle port conflict gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error(`Run this command to fix it:\n`);
    console.error(`  Get-NetTCPConnection -LocalPort ${PORT} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }\n`);
    process.exit(1);
  }
});
