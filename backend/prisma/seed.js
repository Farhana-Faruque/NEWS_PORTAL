const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.comment.deleteMany();
  await prisma.news.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const sabbir = await prisma.user.create({
    data: {
      name: 'Sabbir',
      email: 'sabbir@example.com',
      password: hashedPassword
    }
  });

  const ahmed = await prisma.user.create({
    data: {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      password: hashedPassword
    }
  });

  const mohsin = await prisma.user.create({
    data: {
      name: 'Mohsin',
      email: 'mohsin@example.com',
      password: hashedPassword
    }
  });

  console.log('Users created:', { sabbir: sabbir.id, ahmed: ahmed.id, mohsin: mohsin.id });

  const news1 = await prisma.news.create({
    data: {
      title: 'Understanding Neural Networks: A Deep Dive into AI',
      body: 'Neural networks are the backbone of modern artificial intelligence. In this comprehensive article, we explore the fundamentals of neural networks, their architecture, and how they revolutionize machine learning. From simple perceptrons to complex deep learning models, neural networks have transformed how computers learn from data. We will discuss convolutional neural networks (CNNs), recurrent neural networks (RNNs), and the latest advances in transformer architectures that power today\'s AI systems. Whether you are a beginner or an experienced developer, this guide will help you understand how these powerful algorithms work and how to implement them effectively.',
      authorId: sabbir.id
    }
  });

  const news2 = await prisma.news.create({
    data: {
      title: 'FIFA World Cup 2026: The Most Anticipated Tournament',
      body: 'The FIFA World Cup 2026 will be held in North America, marking a historic moment as the first World Cup to be hosted by three countries: the United States, Canada, and Mexico. This tournament will feature 48 teams instead of the traditional 32, opening doors for more nations to participate in football\'s greatest spectacle. We discuss the preparations, exciting fixtures, potential favorites, and what fans can expect from this unprecedented World Cup. With expanded participation and unique hosting arrangements, the 2026 World Cup promises to be more inclusive and exciting than ever before. From Argentina\'s title defense to emerging powerhouses, this tournament will showcase the beautiful game at its finest.',
      authorId: ahmed.id
    }
  });

  const news3 = await prisma.news.create({
    data: {
      title: '2024 USA Election: Key Results and Implications',
      body: 'The United States held a pivotal election in 2024 with significant implications for domestic and international policy. This article provides a comprehensive analysis of the election results, including the presidential race, congressional seats, and important ballot measures across various states. We examine the key issues that drove voter behavior, from the economy to healthcare and climate change. The election saw various campaign strategies, debates, and mobilization efforts from both major parties. Understanding the election results helps us comprehend the current political landscape and the direction the nation is heading. We also explore how these results might affect future policy decisions and the political dynamics in Washington.',
      authorId: mohsin.id
    }
  });

  console.log('News created:', { news1: news1.id, news2: news2.id, news3: news3.id });

  await prisma.comment.createMany({
    data: [
      {
        text: 'Excellent explanation of neural networks!',
        userId: ahmed.id,
        newsId: news1.id
      },
      {
        text: 'Looking forward to more AI articles like this.',
        userId: mohsin.id,
        newsId: news1.id
      }
    ]
  });

  console.log('Comments created');
  console.log('Seeding completed successfully!');
  console.log('\nDefault login credentials for all users:');
  console.log('Password: password123');
  console.log('Emails: sabbir@example.com, ahmed@example.com, mohsin@example.com');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
