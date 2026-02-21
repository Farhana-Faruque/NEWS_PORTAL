const prisma = require('../config/database');

// POST /api/news/:newsId/comments
const createComment = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { text } = req.body;
    const parsedNewsId = parseInt(newsId);

    if (isNaN(parsedNewsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    // Check if news exists
    const news = await prisma.news.findUnique({
      where: { id: parsedNewsId }
    });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        newsId: parsedNewsId
      },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/news/:newsId/comments
const getComments = async (req, res) => {
  try {
    const { newsId } = req.params;
    const parsedNewsId = parseInt(newsId);

    if (isNaN(parsedNewsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    const news = await prisma.news.findUnique({
      where: { id: parsedNewsId }
    });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const comments = await prisma.comment.findMany({
      where: { newsId: parsedNewsId },
      include: {
        user: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/news/:newsId/comments/:id
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = parseInt(id);

    if (isNaN(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Only the comment author can delete
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createComment, getComments, deleteComment };
