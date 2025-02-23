import express from 'express'
import { register, login } from '../controllers/authController.js'

const router = express.Router()

// Register new employee
router.post('/register', register)

// Login
router.post('/login', login)

export default router 