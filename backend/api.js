require('express');
require('mongodb');
var axios = require('axios');
const User = require('./models/newUser.js');
const Folder = require('./models/folder.js');
const Place = require('./models/place.js');

exports.setApp = function ( app, client )
{
    app.post('/savePlace', async (req, res, next) =>
    {
        // req = {folderId, userId, placeName, placeAddress}

        // as of right now this will just save address and name of location to a folder in the placeList array.
        // in the future we could have an array of users stored for each place in the places collection. 
        // basically an array of userId's associated with each place.

        // no need for folder schema since we are just inserting into an existing folder. 
        const fid = req.body.folderId;
        const uid = req.body.userId;

        // using place schema.
        const newPlace = new Place
        ({
            placeName: req.body.placeName,
            placeAddress: req.body.placeAddress
        });

        var msg = '';

        try
        {
            const db = client.db();
            const result = await db.collection('Folders').updateOne
            (
                {userId: uid, folderId: fid},
                { $push: 
                    {placeList: 
                        {
                            placeName: newPlace.placeName,
                            placeAddress: newPlace.placeAddress
                        }
                    }
                }
            )
            
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        res.status(200).json(msg);
    });

    // it will be good to delete places from the database so if no user has it on their list, it wont take up space.
    app.post('/deletePlace', async (req, res, next) =>
    {
        // must use placesId since folders might have the same name from different users.
        const thisPlace = req.body.placesId;
        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg = '';

        try
        {
            const db = client.db();
            const result = await db.collection('Places').deleteOne({placesId: thisPlace});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        res.status(200).json(msg);
    });

    app.post('/deleteFolder', async (req, res, next) =>
    {
        // must use folderId since folders might have the same name from different users.
        const thisFolder = req.body.folderId;
        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg = '';

        try
        {
            const db = client.db();
            const result = await db.collection('Folders').deleteOne({folderId: thisFolder});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
            msg = e;
        }

        res.status(200).json(msg);
    });

    // you might be able to do /delete/:id.
    app.post('/deleteUser', async (req, res, next) =>
    {
        // will need userId to delete.
        const thisUser = req.body.userId;
        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg;

        try
        {
            const db = client.db();
            const result = await db.collection('Users').deleteOne({userId: thisUser});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
            msg = e;
        }

        res.status(200).json(msg);
    });

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

        const newUser = new User
        ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // const {firstName, lastName, username, email, password} = req.body;

        // const newUser = {firstName:firstName, lastName:lastName, username:username, 
        //                 email:email, password:password, emailConfirm:-1};

        var error = '';

        // Connect to the database
        const db = client.db();

        // Search the database for the username
        const exist = await db.collection('Users').find({username:newUser.username}).toArray();

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
            console.log(result);
        }
        catch(e)
        {
            error = e.toString();
        }

        // After the user is inserted, find the user to create a JWT
        try
        {
            // only returns the first instance of the username as a single user instead of array.
            const retNewUser = await db.collection('Users').findOne
            (
                {
                    $or: [
                        {'username' : newUser.username}
                    ]
                }
            )
            console.log(retNewUser);
            const token = require("./createJWT.js");
            retToken = token.createToken( retNewUser.firstName, retNewUser.lastName, retNewUser.userId );
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

        const jwtToken = req.body.jwToken;
        var error = '';
        var token = require('./createJWT.js');

        const newFolder = new Folder
        ({
            userId: req.body.userId,
            folderName:req.body.folderName,
            placeList:new Array()
        });

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
            const results = await db.collection('Folders').insertOne({userId:newFolder.userId, folderName:newFolder.folderName});
        }
        catch(e)
        {
            console.log(e.message);
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
        
        var ret = { error: error, jwToken: refreshedToken };
        
        res.status(200).json(ret);
    });
}
