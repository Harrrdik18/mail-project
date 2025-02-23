import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { submitResignation, submitExitResponses } from '../controllers/userController.js'

const router = express.Router()

// Submit resignation request
router.post('/resign', authenticateToken, submitResignation)

// Submit exit interview responses
router.post('/responses', authenticateToken, submitExitResponses)

export default router 