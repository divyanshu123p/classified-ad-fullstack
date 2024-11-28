//mongodb script

// Connect to the MongoDB server (this line is optional in mongosh)
// use('classifiedsDB')
const db = db.getSiblingDB('classifiedsDB');

// Create Users collection
db.createCollection('Users');
db.Users.createIndex({ email: 1 }, { unique: true });
db.Users.createIndex({ username: 1 }, { unique: true });

// Create Categories collection
db.createCollection('Categories');
db.Categories.createIndex({ name: 1 });

// Create Cities collection
db.createCollection('Cities');
db.Cities.createIndex({ name: 1 });

// Create Advertisements collection
db.createCollection('Advertisements');
db.Advertisements.createIndex({ categoryId: 1 });
db.Advertisements.createIndex({ cityId: 1 });
db.Advertisements.createIndex({ userId: 1 });
db.Advertisements.createIndex({ createdAt: 1 });

// Create Comments collection
db.createCollection('Comments');

// Example insertion script for testing

// Insert sample users
db.Users.insertMany([
  {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "hashed_password",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "hashed_password",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample categories
db.Categories.insertMany([
  {
    name: "Jobs",
    description: "Job listings and opportunities",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "For Sale",
    description: "Items for sale",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample cities
db.Cities.insertMany([
  {
    name: "New York",
    state: "NY",
    country: "USA",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample advertisements
db.Advertisements.insertMany([
  {
    title: "Selling a used bike",
    description: "A gently used mountain bike in great condition.",
    price: 200,
    categoryId: db.Categories.findOne({ name: "For Sale" })._id,
    userId: db.Users.findOne({ username: "john_doe" })._id,
    cityId: db.Cities.findOne({ name: "New York" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Looking for a software developer",
    description: "We are hiring a full-stack software developer.",
    categoryId: db.Categories.findOne({ name: "Jobs" })._id,
    userId: db.Users.findOne({ username: "jane_smith" })._id,
    cityId: db.Cities.findOne({ name: "Los Angeles" })._id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample comments
db.Comments.insertMany([
  {
    adId: db.Advertisements.findOne({ title: "Selling a used bike" })._id,
    userId: db.Users.findOne({ username: "jane_smith" })._id,
    comment: "Is this bike still available?",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    adId: db.Advertisements.findOne({ title: "Looking for a software developer" })._id,
    userId: db.Users.findOne({ username: "john_doe" })._id,
    comment: "I am interested in this position. How can I apply?",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
