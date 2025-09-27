const express = require('express');
const { body, param, validationResult } = require('express-validator');
const ChatbotController = require('../controllers/ChatbotController');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array(),
      code: 'VALIDATION_ERROR'
    });
  }
  next();
};

const router = express.Router();
const chatbotController = new ChatbotController();

// Validation middleware for chat endpoint
const validateChatMessage = [
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isString()
    .withMessage('Message must be a string')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('sessionId')
    .notEmpty()
    .withMessage('SessionId is required')
    .isString()
    .withMessage('SessionId must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('SessionId must be between 1 and 100 characters'),
  validateRequest
];

// Validation middleware for sessionId parameter
const validateSessionId = [
  param('sessionId')
    .notEmpty()
    .withMessage('SessionId is required')
    .isString()
    .withMessage('SessionId must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage('SessionId must be between 1 and 100 characters'),
  validateRequest
];

// Main chat endpoint - POST /api/chat
router.post('/chat', validateChatMessage, chatbotController.sendMessage.bind(chatbotController));

// Get chat history - GET /api/chat/history/:sessionId
router.get('/chat/history/:sessionId', validateSessionId, chatbotController.getChatHistory.bind(chatbotController));

// Clear chat history - DELETE /api/chat/history/:sessionId
router.delete('/chat/history/:sessionId', validateSessionId, chatbotController.clearChatHistory.bind(chatbotController));

// Get chatbot status - GET /api/chat/status
router.get('/chat/status', chatbotController.getStatus.bind(chatbotController));

module.exports = router;
