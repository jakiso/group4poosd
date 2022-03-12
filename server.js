const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:Leineckerg4lp@cluster0.zx86x.mongodb.net/COP4331?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();


const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post('/register', async (req, res, next) =>
{
  // incoming: first name, last name, username, email, password
  // outgoing: error
	
  const {firstName, lastName, username, email, password} = req.body;

  const newUser = {firstName:firstName, lastName:lastName, username:username, 
                   email:email, password:password, emailConfirm:-1};

  var error = '';

  try
  {
    const db = client.db();
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});


app.post('/login', async (req, res, next) => 
{
  // incoming: username, password
  // outgoing: id, firstName, lastName, error
	
 var error = '';
 var errMsg;

 const { username, password } = req.body;

 const db = client.db();
 const results = await db.collection('Users').find({username:username,password:password}).toArray();

 var id = -1;
 var fn = '';
 var ln = '';

 if( results.length > 0 )
 {
   id = results[0].userId;
   fn = results[0].firstName;
   ln = results[0].lastName;

   if (results[0].emailConfirm == -1)
   {
       errMsg = 'Please confirm your email before logging in.'
   }
 }

 var ret = { userId:id, firstName:fn, lastName:ln, error:errMsg};
 res.status(200).json(ret);

});

app.listen(5000); // start Node + Express server on port 5000
