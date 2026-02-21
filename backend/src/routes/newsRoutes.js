const express = require('express');
const router = express.Router();
const { getAllNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { createNewsValidator, updateNewsValidator } = require('../validators/newsValidator');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');


router.get('/', getAllNews);
router.get('/:id', getNewsById);


router.post('/', authenticate, createNewsValidator, validate, createNews);
router.put('/:id', authenticate, updateNewsValidator, validate, updateNews);
router.delete('/:id', authenticate, deleteNews);

module.exports = router;
