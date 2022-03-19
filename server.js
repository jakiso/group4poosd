const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;  
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

const path = require('path');           

// MERN B updates this to no longer use a connection string
require('dotenv').config();
// const url = process.env.MONGODB_URI;
const url = "mongodb+srv://admin:Leineckerg4lp@cluster0.zx86x.mongodb.net/COP4331?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

var api = require('./api.js');
api.setApp( app, client );

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});