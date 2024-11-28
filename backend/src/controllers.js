const { connectDB } = require('./db');
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');

const jsonHandler = (req, res, handler) => {
  let buffer = '';
  const decoder = new StringDecoder('utf-8');
  req.on('data', chunk => {
    buffer += decoder.write(chunk);
  });
  req.on('end', async () => {
    buffer += decoder.end();
    req.body = buffer ? JSON.parse(buffer) : {};
    await handler(req, res);
  });
};

const users = {
  get: async (req, res) => {
    const db = await connectDB();
    const users = await db.collection('Users').find().toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  },
  post: (req, res) => jsonHandler(req, res, async (req, res) => {
    const db = await connectDB();
    const user = req.body;
    await db.collection('Users').insertOne(user);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }),
};

const categories = {
  get: async (req, res) => {
    const db = await connectDB();
    const categories = await db.collection('Categories').find().toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
  },
  post: (req, res) => jsonHandler(req, res, async (req, res) => {
    const db = await connectDB();
    const category = req.body;
    await db.collection('Categories').insertOne(category);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(category));
  }),
};

const cities = {
  get: async (req, res) => {
    const db = await connectDB();
    const cities = await db.collection('Cities').find().toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cities));
  },
  post: (req, res) => jsonHandler(req, res, async (req, res) => {
    const db = await connectDB();
    const city = req.body;
    await db.collection('Cities').insertOne(city);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(city));
  }),
};

const ads = {
  get: async (req, res) => {
    const db = await connectDB();
    const ads = await db.collection('Advertisements').find().toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ads));
  },
  post: (req, res) => jsonHandler(req, res, async (req, res) => {
    const db = await connectDB();
    const ad = req.body;
    await db.collection('Advertisements').insertOne(ad);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ad));
  }),
};

const comments = {
  get: async (req, res) => {
    const db = await connectDB();
    const comments = await db.collection('Comments').find().toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  },
  post: (req, res) => jsonHandler(req, res, async (req, res) => {
    const db = await connectDB();
    const comment = req.body;
    await db.collection('Comments').insertOne(comment);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comment));
  }),
};

module.exports = { users, categories, cities, ads, comments };
