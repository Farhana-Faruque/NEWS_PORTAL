const { body } = require('express-validator');

const createCommentValidator = [
  body('text')
    .trim()
    .notEmpty().withMessage('Comment text is required')
    .isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1 and 500 characters')
];

module.exports = { createCommentValidator };
