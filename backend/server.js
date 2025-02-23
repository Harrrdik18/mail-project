import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import User from './models/User.js'

dotenv.config()

const app = express()

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from Vite dev server
  credentials: true
}))

app.use(express.json())

// Create admin user if not exists
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' })
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin',
        role: 'hr'
      })
      await admin.save()
      console.log('Admin user created successfully')
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    createAdminUser() // Create admin user after successful connection
  })
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 