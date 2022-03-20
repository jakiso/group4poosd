require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
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

    const { username, password } = req.body;

    const db = client.db();
    const results = await db.collection('Users').find({username:username,password:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    var errMsg = '';

    if( results.length > 0 )
    {
        id = results[0].userId;
        fn = results[0].firstName;
        ln = results[0].lastName;
        
        if (results[0].emailConfirm == -1)
        {
            errMsg = 'Please confirm your email before logging in.'
        }

        try
        {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, id );
        }
        catch(e)
        {
            
            ret = {error:e.message};
        }
    }
    else
    {
        const token = require("./createJWT.js");
        errMsg = 'Login/Password incorrect';
        ret = token.createToken( fn, ln, id );
    }

    ret = Object.assign(ret, {error:errMsg})
    res.status(200).json( ret );
});

app.post('/createFolder', async (req, res, next) =>
{
    const {userId, jwtToken, name} = req.body;
    var error = '';
    var token = require('./createJWT.js');

    try
    {
        if( token.isExpired(jwtToken))
        {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }

    try
    {
        const db = client.db();
        const results = await db.collection('Folders').insertOne({userId:userId, name:name});
    }
    catch(e)
    {
        error = e.toString();
    }

    var refreshedToken = null;
    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    var ret = { error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
});
}