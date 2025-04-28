const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// الاتصال بـ MongoDB
mongoose.connect('mongodb://localhost/aayaad', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// نموذج المناسبة
const occasionSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  greeting: String,
});
const Occasion = mongoose.model('Occasion', occasionSchema);

// API Routes
// جلب جميع المناسبات
app.get('/api/occasions', async (req, res) => {
  const occasions = await Occasion.find();
  res.json(occasions);
});

// إضافة مناسبة جديدة
app.post('/api/occasions', async (req, res) => {
  const occasion = new Occasion(req.body);
  await occasion.save();
  res.json(occasion);
});

// تعديل مناسبة
app.put('/api/occasions/:id', async (req, res) => {
  const occasion = await Occasion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(occasion);
});

// حذف مناسبة
app.delete('/api/occasions/:id', async (req, res) => {
  await Occasion.findByIdAndDelete(req.params.id);
  res.json({ message: 'Occasion deleted' });
});

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));