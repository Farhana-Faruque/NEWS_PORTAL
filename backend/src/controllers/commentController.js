const prisma = require('../config/database');

const createComment = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { text } = req.body;

    const news = await prisma.news.findUnique({
      where: { id: parseInt(newsId) }
    });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        newsId: parseInt(newsId)
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

const getComments = async (req, res) => {
  try {
    const { newsId } = req.params;

    const news = await prisma.news.findUnique({
      where: { id: parseInt(newsId) }
    });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    const comments = await prisma.comment.findMany({
      where: { newsId: parseInt(newsId) },
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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await prisma.comment.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createComment, getComments, deleteComment };
