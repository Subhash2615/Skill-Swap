const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

async function seed() {
  await connectDB();
  await User.deleteMany({}); // Clear existing users for clean test

  const users = [
    {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: 'Password1',
      bio: 'Frontend developer and React enthusiast.',
      skills_to_teach: ['React', 'CSS', 'HTML'],
      skills_to_learn: ['Node.js', 'MongoDB'],
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'Password1',
      bio: 'Backend developer who loves Node.js.',
      skills_to_teach: ['Node.js', 'Express'],
      skills_to_learn: ['React', 'CSS'],
    },
    {
      name: 'Carol Lee',
      email: 'carol@example.com',
      password: 'Password1',
      bio: 'Fullstack dev, always learning.',
      skills_to_teach: ['MongoDB', 'Express'],
      skills_to_learn: ['HTML', 'CSS'],
    },
    {
      name: 'David Kim',
      email: 'david@example.com',
      password: 'Password1',
      bio: 'UI/UX designer and CSS wizard.',
      skills_to_teach: ['CSS', 'Figma'],
      skills_to_learn: ['Node.js', 'MongoDB'],
    },
    {
      name: 'Eva Brown',
      email: 'eva@example.com',
      password: 'Password1',
      bio: 'Database expert and data lover.',
      skills_to_teach: ['MongoDB', 'SQL'],
      skills_to_learn: ['React', 'Figma'],
    },
  ];

  for (const user of users) {
    await User.create(user);
  }

  console.log('Fake users seeded!');
  mongoose.connection.close();
}

seed(); 