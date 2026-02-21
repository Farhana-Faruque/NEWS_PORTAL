const { body } = require('express-validator');

const createNewsValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('body')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 20 }).withMessage('Content must be at least 20 characters')
];

const updateNewsValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
  body('body')
    .optional()
    .trim()
    .notEmpty().withMessage('Content cannot be empty')
    .isLength({ min: 20 }).withMessage('Content must be at least 20 characters')
];

module.exports = { createNewsValidator, updateNewsValidator };
