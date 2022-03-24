require('express');
require('mongodb');
var axios = require('axios');
const User = require('./models/user.js');
const Place = require('./models/place.js');

exports.setApp = function ( app, client )
{
    app.post('/nearbySearch', async (req, res, next) => 
    {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';
    var lat;
    var lng;
    var url;

    const { address, keyword, radius, type, pageToken } = req.body;

    var _address = address.trim();

    // Url for geocoding endpoint. Needed to turn an address into latitude and longitude.
    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + process.env.GOOGLE_API_KEY;

    // Gets response from geocoding endpoint
    axios.get(geoUrl)
    .then(function (geoResponse)
    {
        // Store latitude and longtitude of address. Based on the address that Google chooses. 
        // It's possible that a vague address will lead to a different address than the user intended 
        lat = geoResponse.data.results[0].geometry.location.lat;
        lng = geoResponse.data.results[0].geometry.location.lng;

        // Base url of nearby search endpoint.
        var baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

        // If the pageToken is empty, do a normal search based on the input. If pageToken isn't blank, it will attempt to search using said pageToken. 
        if (pageToken == '')
        url = baseUrl + 'location=' + lat + '%2C' + lng + '&radius=' + radius + '&type=' + type + '&keyword=' + keyword;
        else
        url = baseUrl + 'pagetoken=' + pageToken;

        // Adding the api key.
        url = url + '&key=' + process.env.GOOGLE_API_KEY;


        // Get all the data and return it. Error function's probably don't work correctly.
        axios.get(url)
        .then(function (response)
        {
        res.status(200).json(response.data);
        })
        .catch(function(error)
        {
        console.log(error);
        });
    })
    .catch(function(geoError)
    {
        console.log(error);
    });
});
    app.post('/register', async (req, res, next) =>
    {
        // incoming: first name, last name, username, email, password
        // outgoing: error

        const {firstName, lastName, username, email, password} = req.body;

        const newUser = {firstName:firstName, lastName:lastName, username:username, 
                        email:email, password:password, emailConfirm:-1};

        var error = '';

        // Connect to the database
        const db = client.db();

        // Search the database for the username
        const exist = await db.collection('Users').find({username:username}).toArray();

        // If the returned array is not 0 then user already exists
        if (exist.length != 0)
        {
            // Send an error that the username already exists
            error = "Username already exists";
            var ret = { error: error };
            res.status(200).json(ret);

            // Exit the api call
            return;
        }

        // Insert a new unique username
        try
        {
            // Insert the new user to the database
            const result = await db.collection('Users').insertOne(newUser);
        }
        catch(e)
        {
            error = e.toString();
        }

        // After the user is inserted, find the user to create a JWT
        try
        {
            const retNewUser = await db.collection('Users').find({username:username}).toArray();
            console.log(retNewUser);
            const token = require("./createJWT.js");
            retToken = token.createToken( retNewUser[0].firstName, retNewUser[0].lastName, retNewUser[0].userId );
        }
        catch(e)
        {
            error = e.toString();
        }

        // Everything is successful send empty error
        ret = Object.assign(retToken, {error:error})
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