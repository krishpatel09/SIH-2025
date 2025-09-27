// Validation middleware for request data
const validateDestination = (req, res, next) => {
  const { name, title, image, rating, category, temperature, best_time, description, highlights } = req.body;

  if (!name || !title || !image || !rating || !category || !temperature || !best_time || !description || !highlights) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'All fields are required: name, title, image, rating, category, temperature, best_time, description, highlights'
    });
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Invalid rating',
      message: 'Rating must be between 0 and 5'
    });
  }

  if (!Array.isArray(highlights)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid highlights',
      message: 'Highlights must be an array'
    });
  }

  next();
};

const validateFeature = (req, res, next) => {
  const { title, description, icon, color } = req.body;

  if (!title || !description || !icon || !color) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'All fields are required: title, description, icon, color'
    });
  }

  next();
};

const validateCulturalElement = (req, res, next) => {
  const { title, description, icon, image, items } = req.body;

  if (!title || !description || !icon || !image || !items) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'All fields are required: title, description, icon, image, items'
    });
  }

  if (!Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid items',
      message: 'Items must be an array'
    });
  }

  next();
};

const validateAnalytics = (req, res, next) => {
  const { total_visitors, monthly_growth, average_rating, total_reviews, positive_sentiment, neutral_sentiment, negative_sentiment } = req.body;

  if (total_visitors === undefined || monthly_growth === undefined || average_rating === undefined || 
      total_reviews === undefined || positive_sentiment === undefined || neutral_sentiment === undefined || 
      negative_sentiment === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'All analytics fields are required'
    });
  }

  if (average_rating < 0 || average_rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Invalid average rating',
      message: 'Average rating must be between 0 and 5'
    });
  }

  if (positive_sentiment + neutral_sentiment + negative_sentiment !== 100) {
    return res.status(400).json({
      success: false,
      error: 'Invalid sentiment values',
      message: 'Sentiment percentages must add up to 100'
    });
  }

  next();
};

const validateMessage = (req, res, next) => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid message',
      message: 'Message is required and must be a non-empty string'
    });
  }

  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid sessionId',
      message: 'SessionId is required and must be a non-empty string'
    });
  }

  // Optional validation for chatHistory
  if (req.body.chatHistory && !Array.isArray(req.body.chatHistory)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid chatHistory',
      message: 'ChatHistory must be an array if provided'
    });
  }

  // Optional validation for userId
  if (req.body.userId && typeof req.body.userId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid userId',
      message: 'UserId must be a string if provided'
    });
  }

  next();
};

module.exports = {
  validateDestination,
  validateFeature,
  validateCulturalElement,
  validateAnalytics,
  validateMessage
};
