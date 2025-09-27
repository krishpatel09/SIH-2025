const express = require('express');
const DestinationController = require('../controllers/DestinationController');
const { validateDestination } = require('../middleware/validation');

const router = express.Router();
const destinationController = new DestinationController();

// GET all destinations
router.get('/', destinationController.getAllDestinations.bind(destinationController));

// GET destination by ID
router.get('/:id', destinationController.getDestinationById.bind(destinationController));

// GET destinations by category
router.get('/category/:category', destinationController.getDestinationsByCategory.bind(destinationController));

// POST new destination (admin only - add auth middleware later)
router.post('/', validateDestination, destinationController.createDestination.bind(destinationController));

// PUT update destination (admin only - add auth middleware later)
router.put('/:id', validateDestination, destinationController.updateDestination.bind(destinationController));

// DELETE destination (admin only - add auth middleware later)
router.delete('/:id', destinationController.deleteDestination.bind(destinationController));

module.exports = router;

// // Image upload and management routes
// const multer = require('multer');

// // Configure multer for memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     // Check file type
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed'), false);
//     }
//   }
// });

// // POST upload destination image
// router.post('/:id/image', upload.single('image'), destinationController.uploadDestinationImage.bind(destinationController));

// // DELETE destination image
// router.delete('/:id/image', destinationController.deleteDestinationImage.bind(destinationController));

// // GET destination with full image URL
// router.get('/:id/with-image', destinationController.getDestinationWithImageUrl.bind(destinationController));

