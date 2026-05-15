import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://workwithsurafel:workwithsurafel@portfolio26.jnsnukz.mongodb.net/?appName=portfolio26';
const DB_NAME = process.env.DB_NAME || 'ruby-pictures';

// Collection name prefix
const COLLECTION_PREFIX = 'rp_';

// Helper function to get collection name with prefix
const getCollectionName = (name) => `${COLLECTION_PREFIX}${name}`;

// Helper function to get collection or return mock data
function getCollection(name) {
  if (!db) return null;
  return db.collection(getCollectionName(name));
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dhb7y3wk3',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

let db;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Running with mock data fallback');
    return null;
  }
}

async function seedDatabase() {
  if (!db) return { success: false, message: 'Database not connected' };
  
  const portfolioCount = await db.collection('rp_portfolio').countDocuments();
  if (portfolioCount > 0) {
    return { success: false, message: 'Database already has data' };
  }
  
  console.log('📦 Seeding database with initial data...');
  
  // Seed portfolio - Movies
  await db.collection('rp_portfolio').insertMany([
    {
      title: 'BALEM',
      description: 'A gripping story exploring the depths of human emotion.',
      videoUrl: '',
      coverImage: '',
      category: 'movies',
      priority: 1,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'JOKA 27',
      description: 'An intense drama that challenges perceptions.',
      videoUrl: '',
      coverImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910160/joka_new_poster_rasso3.jpg',
      category: 'movies',
      priority: 2,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'DOBO',
      description: 'A documentary revealing hidden truths.',
      videoUrl: '',
      coverImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg',
      images: [
        'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928350/dobo_1po_jbhe8m.jpg',
        'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771928365/dobo_2po_bhunwe.jpg'
      ],
      category: 'documentaries',
      priority: 1,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Coffee Project',
      description: 'A visual journey through the art of coffee.',
      videoUrl: '',
      coverImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg',
      category: 'documentaries',
      priority: 2,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'TOXIC LOVE',
      description: 'A story of love and danger.',
      videoUrl: 'https://www.youtube.com/watch?v=LI1UDweTrUg',
      coverImage: 'https://img.youtube.com/vi/LI1UDweTrUg/maxresdefault.jpg',
      category: 'music-videos',
      priority: 1,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'SHEGER',
      description: 'City lights and urban rhythms.',
      videoUrl: 'https://www.youtube.com/watch?v=MHRhc0g32Ko',
      coverImage: 'https://img.youtube.com/vi/MHRhc0g32Ko/maxresdefault.jpg',
      category: 'music-videos',
      priority: 2,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'CALL ME',
      description: 'A compelling call to action.',
      videoUrl: 'https://www.youtube.com/watch?v=cEYTjwhcNNc',
      coverImage: 'https://img.youtube.com/vi/cEYTjwhcNNc/maxresdefault.jpg',
      category: 'music-videos',
      priority: 3,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  // Seed photos
  await db.collection('rp_photos').insertMany([
    {
      title: 'Coffee Ceremony',
      description: 'Traditional Ethiopian coffee ceremony',
      imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910850/DSC06114_s1emfc.jpg',
      category: 'lifestyle',
      priority: 1,
      published: true,
    },
    {
      title: 'Coffee Beans',
      description: 'Ethiopian coffee beans',
      imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910845/DSC06232_rsv8sv.jpg',
      category: 'lifestyle',
      priority: 2,
      published: true,
    },
  ]);
  
  // Seed testimonials
  await db.collection('rp_testimonials').insertMany([
    {
      name: 'Qare The Mask',
      quote: 'Introducing the visionary behind the lens!',
      role: 'Artist',
      priority: 1,
      createdAt: new Date(),
    },
    {
      name: 'Mukhtar AKA Mo Fami',
      quote: 'Working with Ruby Pictures was amazing!',
      role: 'Artist',
      priority: 2,
      createdAt: new Date(),
    },
  ]);
  
  // Seed about
  await db.collection('rp_about').insertOne({
    name: 'Surafel Yimam',
    title: 'Film Director & Cinematographer',
    bio: 'Ruby Pictures is a premier film production company based in Addis Ababa, Ethiopia.',
    avatar: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png',
    skills: ['Film Direction', 'Cinematography', 'Video Editing', 'Photography'],
    experience: [],
    education: [],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/ruby.pictures' },
      { platform: 'Telegram', url: 'https://t.me/ruby_pictures' },
      { platform: 'WhatsApp', url: 'https://wa.me/251912345678' }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  // Seed clients
  await db.collection('rp_clients').insertMany([
    { name: 'Drama Deluxe', logo: '', priority: 1 },
  ]);
  
  // Seed hero slides
  await db.collection('rp_heroSlides').insertOne({
    title: 'The Coffee Project',
    subtitle: '',
    description: 'Ethiopia\'s Finest Coffee Journey',
    videoUrl: 'https://res.cloudinary.com/dhb7y3wk3/video/upload/v1770919216/0212_ax1hc5.mp4',
    fallbackImage: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770910845/DSC06232_rsv8sv.jpg',
    priority: 1,
    published: true,
  });
  
  // Seed ruby slides
  await db.collection('rp_rubySlides').insertMany([
    { imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4236_lpvxsk.jpg', priority: 1 },
    { imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4237_wvodrh.jpg', priority: 2 },
    { imageUrl: 'https://res.cloudinary.com/dhb7y3wk3/image/upload/v1772249801/IMG_4240_j1lx30.jpg', priority: 3 },
  ]);
  
  console.log('✅ Database seeded successfully');
  return { success: true, message: 'Database seeded successfully' };
}



// ==================== CLOUDINARY UPLOAD ROUTE ====================

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload to Cloudinary using stream
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          {
            folder: 'ruby-pictures',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();
    
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ==================== AUTH ROUTES ====================

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Check environment credentials first
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rubypictures.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'RubyPictures2024!';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ 
      success: true, 
      user: { email: ADMIN_EMAIL, name: 'Admin' } 
    });
  }

  // Check MongoDB
  const collection = getCollection('admins');
  if (collection) {
    const admin = await collection.findOne({ email, password });
    if (admin) {
      return res.json({ 
        success: true, 
        user: { email: admin.email, name: admin.name } 
      });
    }
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

app.delete('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// ==================== SEED ROUTE ====================

app.post('/api/seed', async (req, res) => {
  const result = await seedDatabase();
  res.json(result);
});

// ==================== PORTFOLIO ROUTES ====================

app.get('/api/portfolio', async (req, res) => {
  const collection = getCollection('portfolio');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.get('/api/portfolio/:id', async (req, res) => {
  const collection = getCollection('portfolio');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let item;
  try {
    item = await collection.findOne({ _id: new ObjectId(req.params.id) });
  } catch {
    item = await collection.findOne({ _id: req.params.id });
  }
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/portfolio', async (req, res) => {
  const collection = getCollection('portfolio');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/portfolio/:id', async (req, res) => {
  const collection = getCollection('portfolio');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/portfolio/:id', async (req, res) => {
  const collection = getCollection('portfolio');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== PHOTOS ROUTES ====================

app.get('/api/photos', async (req, res) => {
  const collection = getCollection('photos');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.get('/api/photos/:id', async (req, res) => {
  const collection = getCollection('photos');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let item;
  try {
    item = await collection.findOne({ _id: new ObjectId(req.params.id) });
  } catch {
    item = await collection.findOne({ _id: req.params.id });
  }
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/photos', async (req, res) => {
  const collection = getCollection('photos');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/photos/:id', async (req, res) => {
  const collection = getCollection('photos');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/photos/:id', async (req, res) => {
  const collection = getCollection('photos');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== TESTIMONIALS ROUTES ====================

app.get('/api/testimonials', async (req, res) => {
  const collection = getCollection('testimonials');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.post('/api/testimonials', async (req, res) => {
  const collection = getCollection('testimonials');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/testimonials/:id', async (req, res) => {
  const collection = getCollection('testimonials');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/testimonials/:id', async (req, res) => {
  const collection = getCollection('testimonials');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== ABOUT ROUTES ====================

app.get('/api/about', async (req, res) => {
  const collection = getCollection('about');
  if (!collection) {
    return res.json({});
  }
  const profile = await collection.findOne({});
  res.json(profile || {});
});

app.put('/api/about', async (req, res) => {
  const collection = getCollection('about');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const result = await collection.findOneAndUpdate(
    {},
    { $set: { ...req.body, updatedAt: new Date() } },
    { returnDocument: 'after', upsert: true }
  );
  res.json(result);
});

// ==================== CLIENTS ROUTES ====================

app.get('/api/clients', async (req, res) => {
  const collection = getCollection('clients');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.post('/api/clients', async (req, res) => {
  const collection = getCollection('clients');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.delete('/api/clients/:id', async (req, res) => {
  const collection = getCollection('clients');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== HERO SLIDES ROUTES ====================

app.get('/api/hero-slides', async (req, res) => {
  const collection = getCollection('heroSlides');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.post('/api/hero-slides', async (req, res) => {
  const collection = getCollection('heroSlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/hero-slides/:id', async (req, res) => {
  const collection = getCollection('heroSlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/hero-slides/:id', async (req, res) => {
  const collection = getCollection('heroSlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== RUBY SLIDES ROUTES ====================

app.get('/api/ruby-slides', async (req, res) => {
  const collection = getCollection('rubySlides');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.post('/api/ruby-slides', async (req, res) => {
  const collection = getCollection('rubySlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/ruby-slides/:id', async (req, res) => {
  const collection = getCollection('rubySlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/ruby-slides/:id', async (req, res) => {
  const collection = getCollection('rubySlides');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== FEATURED SECTION ROUTES ====================

app.get('/api/featured', async (req, res) => {
  const collection = getCollection('featured');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ priority: 1 }).toArray();
  res.json(items);
});

app.post('/api/featured', async (req, res) => {
  const collection = getCollection('featured');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = { ...req.body, createdAt: new Date() };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/featured/:id', async (req, res) => {
  const collection = getCollection('featured');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/featured/:id', async (req, res) => {
  const collection = getCollection('featured');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// ==================== ABOUT PAGE CONTENT ROUTES ====================

app.get('/api/about-page', async (req, res) => {
  const collection = getCollection('aboutPage');
  if (!collection) {
    return res.json({});
  }
  const content = await collection.findOne({});
  res.json(content || {});
});

app.put('/api/about-page', async (req, res) => {
  const collection = getCollection('aboutPage');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const result = await collection.findOneAndUpdate(
    {},
    { $set: { ...req.body, updatedAt: new Date() } },
    { returnDocument: 'after', upsert: true }
  );
  res.json(result);
});

// ==================== MESSAGES ROUTES (Contact Form Submissions) ====================

app.get('/api/messages', async (req, res) => {
  const collection = getCollection('messages');
  if (!collection) {
    return res.json([]);
  }
  const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
  res.json(items);
});

app.post('/api/messages', async (req, res) => {
  const collection = getCollection('messages');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  const newItem = {
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    message: req.body.message,
    read: false,
    createdAt: new Date(),
  };
  const result = await collection.insertOne(newItem);
  res.status(201).json({ ...newItem, _id: result.insertedId.toString() });
});

app.put('/api/messages/:id', async (req, res) => {
  const collection = getCollection('messages');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  let result;
  try {
    result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body } },
      { returnDocument: 'after' }
    );
  } catch {
    result = await collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { returnDocument: 'after' }
    );
  }
  res.json(result);
});

app.delete('/api/messages/:id', async (req, res) => {
  const collection = getCollection('messages');
  if (!collection) return res.status(500).json({ error: 'Database not connected' });
  
  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  } catch {
    await collection.deleteOne({ _id: req.params.id });
  }
  res.json({ success: true });
});

// Start server and connect to database
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
