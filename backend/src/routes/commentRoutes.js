const express = require('express');
const router = express.Router({ mergeParams: true });
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const { createCommentValidator } = require('../validators/commentValidator');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

router.get('/', getComments);
router.post('/', authenticate, createCommentValidator, validate, createComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
