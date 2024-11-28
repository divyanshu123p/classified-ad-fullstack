const http = require('http');
const router = require('./routes');
// const {connectToClient} = require('./db.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const formidable = require('formidable');

const port = process.env.PORT || 5000;

const uri = "mongodb://localhost:27017/classifiedsDB";
const client = new MongoClient(uri)

client.connect((error) => {
  if (error) {
    console.error("connection to db failed", err);
    process.exit(1);
  }
  else console.log("connection to db successful");
});

const server = http.createServer(async (req, res) => {
  //CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
  //
  
  if(req.method == 'POST' && req.url == '/image'){
    const form = new formidable.IncomingForm({
      filename: (name, ext, part, form) => {
        return part.originalFilename; // Will be joined with options.uploadDir.
      }
    });
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, 'mongodata');

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File upload failed' }));
        return;
      }

      const c1 = fields.json; // Array of JSON strings
      const content = {}; // Initialize an empty object

      // Parse each JSON string and merge its keys into `content`
      c1.forEach((jsonString) => {
        const parsedObject = JSON.parse(jsonString); // Parse the JSON string into an object
        Object.assign(content, parsedObject); // Merge parsed object into `content`
      });

      // console.log(content);
      // console.log('Parsed files:', files.image[0].filepath);
      // console.log("Here is the image path");
      
      //image is an array under files, try to console.log(files) for more understanding
      const imagePath = files.image[0].originalFilename ? files.image[0].originalFilename : null; // Path to the uploaded image on disk
      content.imagePath = `${imagePath}`;
      // console.log({imagePath});
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ content, imagePath }));
      
      const db = client.db('classifiedsDB');
      const collection = db.collection('Advertisements');
      
      // Insert the new document
      const result = await collection.insertOne(content);
    });
  }

  else if(req.method == 'POST' && req.url == '/json'){
    let body = '';

    // Collect the request body data
    req.on('data', chunk =>{
      body+=chunk.toString();
    });

    // Handle the end of request
    req.on('end', async ()=>{
      try{
        const {name, value} = JSON.parse(body);
        // Get the database and collection
        const db = client.db('classifiedsDB');
        const collection = db.collection('Advertisements');

        // Insert the new document
        const result = await collection.insertOne({ name, value });

        // Respond with the inserted document
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ Id_Dekho: result.insertedId }));
      }
      catch(error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error saving document' }));
      }
    });

  }
  
  else if (req.method == 'GET' && req.url == '/data') {
    try {
      const db = client.db("classifiedsDB");
      const coll = db.collection("Advertisements");
      const docu = await coll.find({}).toArray();
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(docu, null, 2));
    }
    catch (error) {
      console.error('Ni hora');
    }
  }
  
  
  
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found lol' }));
  }
  
  // console.log('Yha Hu');
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});