require('express');
require('mongodb');
var axios = require('axios');
const User = require('./models/newUser.js');
const Folder = require('./models/folder.js');
const Place = require('./models/place.js');
const { getMaxListeners } = require('./models/newUser.js');

exports.setApp = function ( app, client )
{

    // returns array of all the user's places in a folder
    app.post('/placesFromFolder', async (req, res, next) =>
    {
        var token = require('./createJWT.js'); var msg = ''; var error = '';

        const jwToken = req.body.jwToken; const uid = req.body.userId;
        const fid = req.body.folderId;

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        try
        {
            const db = client.db();
            // array of folders matching the userId.
            const result = await db.collection('Folders').aggregate([
                {
                  $match: {
                    "userId": 3,
                    "folderId": 53
                  }
                },
                {
                  "$project": {
                    "placeList": 1,
                    _id: 0
                  }
                }
              ]).toArray();

            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    // edits name of folder.
    app.post('/changeFolderName', async (req, res, next) =>
    {
        var token = require('./createJWT.js'); var msg = ''; var error = '';

        const jwToken = req.body.jwToken; const newFolderName = req.body.newName;
        const fid = req.body.folderId; const uid = req.body.userId;

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        try
        {
            const db = client.db();
            // edits name of folder that matches userId and folderId.
            const result = await db.collection('Folders').updateOne
            (
                {userId: uid, folderId: fid},
                {$set: {"folderName": newFolderName}}
            )
            
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    // saves a place to a folder under the array, placeList, as an object.
    app.post('/savePlace', async (req, res, next) =>
    {

        var token = require('./createJWT.js');
        const jwToken = req.body.jwToken;
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
        var error = '';

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        try
        {
            const db = client.db();
            // adds an object with placeName and placeAddress IF both are not duplicates.
            // if didn't add because of duplicate: message.modifiedCount = 0 and message.matchedCount = 1.
            const result = await db.collection('Folders').updateOne
            (
                {userId: uid, folderId: fid},
                {$addToSet: 
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

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    // deletes a place from folders matching name AND address.
    app.post('/deletePlace', async (req, res, next) =>
    {
        // using the array of places to match a place name, then deleting that places info from the array.
        const placeName = req.body.placeName;
        const folderId = req.body.folderId;
        const placeAddress = req.body.placeAddress;

        var token = require('./createJWT.js');
        const jwToken = req.body.jwToken;
        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg = '';
        var error = '';

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        try
        {
            const db = client.db();
            // $pull removes all matches, even duplicates. to avoid this, prevents duplicates when adding to folder.
            const result = await db.collection('Folders').updateOne({"folderId" : folderId},{
                "$pull" : {"placeList":{"placeName" : placeName, "placeAddress" : placeAddress}}});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    // deletes a folder using folderId.
    app.post('/deleteFolder', async (req, res, next) =>
    {
        // must use folderId since folders might have the same name from different users.
        const thisFolder = req.body.folderId;

        // Used to create a token later
        var token = require('./createJWT.js');
        // Store JWT
        const jwToken = req.body.jwToken;
        // Error field
        var error = '';

        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg = '';

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        // Actual folder deletion
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

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    // deletes user based on their userId and confirmation of password.
    app.post('/deleteUser', async (req, res, next) =>
    {
        // msg for deleteOne() result and error for any errors.
        var msg = ''; var error = ''; var token = require('./createJWT.js');

        // will need userId to delete.
        const thisUserId = req.body.userId;
        const thisUserPass = req.body.password;
        const jwToken = req.body.jwToken;

        // Checks if the JWT is expired
        // Sets the error and returns
        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        try
        {
            const db = client.db();
            const result = await db.collection('Users').deleteOne({userId: thisUserId, password: thisUserPass});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
            msg = e;
        }

        // Now refresh the token to update the amount of time it is active
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {error: error, jwToken: refreshedToken, message: msg};

        res.status(200).json(ret);
    });

    app.post('/nearbySearch', async (req, res, next) => 
    {

        // incoming: address, latitude, longitude, keyword, radius, type, pageToken
        // outgoing: many things

        var lat;
        var lng;
        var searchUrl;
        var ret;
        var isError = 0;
        var errorMsg;

        const { address, latitude, longitude, keyword, radius, type, pageToken} = req.body;
        const jwToken = req.body.jwToken;

        var token = require('./createJWT.js');

        if (jwToken != '')
        {
            try
            {
                if( token.isExpired(jwToken))
                {
                    var r = {error:'The JWT is no longer valid', jwToken:''};
                    res.status(200).json(r);
                    return;
                }
            }
            catch(e)
            {
                console.log(e.message);
                return;
            }
        }
        if (latitude == '' || longitude == '')
        {
            var _address = address.trim();

            // Url for geocoding endpoint. Needed to turn an address into latitude and longitude.
            var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + _address + '&key=' + process.env.GOOGLE_API_KEY;


            // Gets response from geocoding endpoint
            await axios.get(geoUrl)
            .then(function (geoResponse)
            {
                // Store latitude and longtitude of address. Based on the address that Google chooses. 
                // It's possible that a vague address will lead to a different address than the user intended 
                lat = geoResponse.data.results[0].geometry.location.lat;
                lng = geoResponse.data.results[0].geometry.location.lng;
            })
            .catch(function()
            {
                errorMsg= {error:"Invalid Address"};
                isError = 1;
            });
        }
        else
        {
            lat = latitude;
            lng = longitude;
        }
        
        if (isError == 0)
        {
            // Base url of nearby search endpoint.
            var baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

            // If the pageToken is empty, do a normal search based on the input. If pageToken isn't blank, it will attempt to search using said pageToken. 
            if (pageToken == '')
                searchUrl = baseUrl + 'location=' + lat + '%2C' + lng + '&radius=' + radius + '&type=' + type + '&keyword=' + keyword;
            else
                searchUrl = baseUrl + 'pagetoken=' + pageToken;

            // Adding the api key.
            searchUrl = searchUrl + '&key=' + process.env.GOOGLE_API_KEY;

            // Get all the data and return it.
            await axios.get(searchUrl)
            .then(function (response)
            {
                ret = response.data;
            })
            .catch(function()
            {
                errorMsg = {error:"Search Error"};
                isError = 1;
            });
        }

        if (jwToken != '')
        {
            var refreshedToken = null;
            try
            {
                refreshedToken = token.refresh(jwToken);
            }
            catch(e)
            {
                console.log(e.message);
            }

            ret = Object.assign({}, ret, refreshedToken);
        }
        
        if (isError)
            ret = Object.assign({}, ret, errorMsg);

            
        res.status(200).json(ret);

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
                console.log(ret);
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

    // needs jwToken, userId, folderId. 
    app.post('/createFolder', async (req, res, next) =>
    {
        // jwToken holds the token needed to give access to this api.
        const jwToken = req.body.jwToken;
        var error = ''; var msg = '';
        var token = require('./createJWT.js');

        // new folder construction.
        const newFolder = new Folder
        ({
            userId: req.body.userId,
            folderName: req.body.folderName,
        });

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken: ''};
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
            msg = results;
        }
        catch(e)
        {
            console.log(e.message);
        }

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
        
        // the message will also output the new object id.
        var ret = { error: error, jwToken: refreshedToken, message: msg };
        
        res.status(200).json(ret);
    });

    app.post('/retrieveFolders', async (req, res, next) =>
    {

    console.log("CALLED retrieveFolders");

    // These variables are sent from front-end
    // folders is the text that is being added
    const {userId, jwtToken} = req.body;
    var error = '';
    var token = require('./createJWT.js');

    // Checks if the JWT is expired
    // Sets the error and returns
    try
    {
        if( token.isExpired(jwtToken))
        {
            console.log("TOKEN EXPIRED retrieveFolders");
            var r = {error:'The JWT is no longer valid', jwtToken:''};
            res.status(200).json(r);
            return;
        }
    }
    catch(e)
    {
        console.log(e.message);
        return;
    }

    // JWT is not expired so add the Folder to the database
    var results;
    try
    {
        console.log("DOING retrieveFolders");
        const db = client.db();
        results = await db.collection('Folders').find({userId:userId}).toArray();
    }
    catch(e)
    {
        error = e.toString();
    }

    // Now refresh the token to update the amount of time it is active
    var refreshedToken = null;
    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }

    // Sen the user back an error field and their refreshed token
    var ret = { error: error, jwtToken: refreshedToken, folders: results };
    console.log("FINISHED retrieveFolders");
    
    res.status(200).json(ret);
    });

    app.post('/sendtestmail', async (req, res, next) =>
    {   
        require('dotenv').config();
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
        // const { email } = req.body;
        var responseMsg;
    
        const msg = {
            to: 'mohamed.faizel14b@gmail.com', // Change to your recipient
            from: 'group4poosd@gmail.com', // Change to your verified sender
            templateId: 'd-450016c069bb4859bbaabf2742ff6766',
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            responseMsg = "Email successfully sent!";
            var r = {response:responseMsg};
            res.status(200).json(r);
        })
        .catch((error) => {
            console.error(error)
            var r = {error:error};
            res.status(200).json(r);
        })
    });
}
