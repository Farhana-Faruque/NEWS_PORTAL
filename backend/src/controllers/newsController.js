const prisma = require('../config/database');


const getAllNews = async (req, res) => {
  try {
    const { search } = req.query;

    const where = search
      ? { title: { contains: search, mode: 'insensitive' } }
      : {};

    const news = await prisma.news.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { comments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(news);
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    const news = await prisma.news.findUnique({
      where: { id: newsId },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    console.error('Get news by id error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, body } = req.body;

    const news = await prisma.news.create({
      data: {
        title,
        body,
        authorId: req.user.id
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      message: 'News created successfully',
      news
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    const existingNews = await prisma.news.findUnique({
      where: { id: newsId }
    });

    if (!existingNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (existingNews.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own news' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.body = body;

    const news = await prisma.news.update({
      where: { id: newsId },
      data: updateData,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      message: 'News updated successfully',
      news
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const newsId = parseInt(id, 10);
    
    if (isNaN(newsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    const existingNews = await prisma.news.findUnique({
      where: { id: newsId }
    });

    if (!existingNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (existingNews.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own news' });
    }

    await prisma.news.delete({ where: { id: newsId } });

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
