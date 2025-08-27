const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HijabStyle = require('./models/HijabStyle');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch(err => console.error(err));

const seed = async () => {
  await HijabStyle.deleteMany();

  await HijabStyle.insertMany([
    { name: 'Classic Hijab', imageURL: 'https://i.pinimg.com/736x/13/eb/9c/13eb9c64299bf35c0091d75a23d1d192.jpg', description: 'Elegant and timeless classic hijab style.' },
    { name: 'Modern Turban', imageURL: 'https://i.pinimg.com/736x/49/37/f3/4937f3c74be03d795d42091fd8a1c754.jpg', description: 'Trendy turban wrap for modern look.' },
    { name: 'Layered Hijab', imageURL: 'https://i.pinimg.com/1200x/70/6c/6f/706c6f6f0edba231ba49e81847767e67.jpg', description: 'Stylish layered look perfect for events.' },
    { name: 'Chiffon Draped Hijab', imageURL: 'https://i.pinimg.com/1200x/c1/f0/89/c1f089308de462d5c8d12a2eb4dafbbc.jpg', description: 'Light and flowy chiffon hijab style.' },
    { name: 'Voluminous Wrap', imageURL: 'https://i.pinimg.com/1200x/f9/63/d9/f963d9732b2c3ad21dcd5402c0cabc77.jpg', description: 'Bold and voluminous hijab wrap for special occasions.' },
    { name: 'Casual Everyday Hijab', imageURL: 'https://i.pinimg.com/736x/76/b0/4e/76b04e5394b4a5fd1fa8b56047d86b68.jpg', description: 'Simple and practical hijab style for daily wear.' }
  ]);

  console.log('✅ 6 hijab styles seeded successfully!');
  mongoose.disconnect();
};

seed();
