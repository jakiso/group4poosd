require('express');
require('mongodb');
var axios = require('axios');
const User = require('./models/newUser.js');
const Folder = require('./models/folder.js');
const Place = require('./models/place.js');
const { getMaxListeners, db } = require('./models/newUser.js');
const { response } = require('express');

// wait function to prevent needed info from getting grabbed by next query before its ready
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.setApp = function ( app, client )
{
    // retrieves single folder with folderId.
    app.post('/retrieveFolder', async (req, res, next) =>
    {
        var token = require('./createJWT.js'); var msg = ''; var error = '';

        const jwToken = req.body.jwToken;
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
            const db = await client.db();

            // grabs folder based on folderId.
            const result = await db.collection('Folders').findOne
            (
                {folderId: fid}
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
        console.log(ret);
        res.status(200).json(ret);
    });

    // returns array of all the user's places in a folder
    app.post('/placesFromFolder', async (req, res, next) =>
    {
        var token = require('./createJWT.js'); var msg = ''; var error = '';

        const jwToken = req.body.jwToken; 
        const uid = req.body.userId;
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
            const db = await client.db();
            // array of folders matching the userId.
            const result = await db.collection('Folders').findOne(
                {userId: uid, folderId: fid}, {placeList: 1}
              );
            console.log(result)
            msg = result.placeList;
        }
        catch(e)
        {
            console.log(e.message + ':/placesFromFolder endpoint.');
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
        
        const jwToken = req.body.jwToken;
        const newFolderName = req.body.newFolderName;
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
            const db = await client.db();

            // edits name of folder that matches userId and folderId.
            const result = await db.collection('Folders').updateOne
            (
                {folderId: fid},
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

        // to grab first keyword given by google and replacing the underscore.
        const fid = req.body.folderId;
        let splitter = req.body.placeDescription.split(', ');
        let firstKeyword = splitter[0];
        let secondKeyword = splitter[1];

        // using place schema.
        const newPlace = new Place
        ({
            placeName: req.body.placeName,
            placeAddress: req.body.placeAddress,
            placePhone: req.body.placePhone, 
            placeRating: req.body.placeRating,
            placeWebsite: req.body.placeWebsite,
            placeImg: req.body.placeImg,
            placeDescription: '• ' + firstKeyword + '\n' + '• ' + secondKeyword,
            folderId: fid
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
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        const db = await client.db();
        try
        {

            // adds an object with placeName and placeAddress IF both are not duplicates.
            // if didn't add because of duplicate: message.modifiedCount = 0 and message.matchedCount = 1.
            const result = await db.collection('Folders').updateOne
            (
                {folderId: fid},
                {$addToSet: 
                    {placeList: 
                        {
                            placeName: newPlace.placeName,
                            placeAddress: newPlace.placeAddress,
                            placePhone: newPlace.placePhone, 
                            placeRating: newPlace.placeRating,
                            placeWebsite: newPlace.placeWebsite,
                            placeImg: newPlace.placeImg,
                            folderId: newPlace.folderId,
                            placeDescription: newPlace.placeDescription
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
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        const db = await client.db();
        try
        {
            
            // $pull removes all matches, even duplicates. to avoid this, prevents duplicates when adding to folder.
            const result = await db.collection('Folders').updateOne({"folderId" : folderId},{
                "$pull" : {"placeList":{"placeName" : placeName, "placeAddress" : placeAddress}}});
            msg = result;
        }
        catch(e)
        {
            console.log(e.message);
        }

        if (msg.modifiedCount === 0)
        {
            // Send an error that the userId doesn't exist
            error = "Place doesn't exist";
            ret = { error: error };
            res.status(500).json(ret);

            // Exit the api call
            return;
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

    app.post('/addFriend', async (req, res, next) =>
    {
        var token = require('./createJWT.js');
        const {userId, name, phone, address, email, notes, jwToken} = req.body;

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        try {
            const db = await client.db();

            const insertFriend = await db.collection('Friends').insertOne({userId:userId, name:name, phone:phone, address:address, email:email, notes:notes});
            var newFriend = await db.collection('Friends').findOne({userId: userId, name: name, email:email}, {friendId: 1})
            
        } catch(e)
        {
            console.log(e)
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
        var friendId = newFriend.friendId;
        var accessToken = refreshedToken.accessToken;
        
        var ret = Object.assign({}, {friendId, accessToken});
        
        res.status(200).json(ret);

    })

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

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        const db = await client.db();
        const folderExist = await db.collection('Folders').find({folderId:thisFolder}).toArray();
      

        if (folderExist.length === 0)
        {
            // Send an error that the userId doesn't exist
            error = "folder doesn't exist";
            ret = { error: error };
            res.status(500).json(ret);

            // Exit the api call
            return;
        }
        // Actual folder deletion
        try
        {
           
            const result = await db.collection('Folders').deleteOne({folderId: thisFolder});
            msg = result;
        }
        catch(e)
        {
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

    app.post('/deleteFriend', async (req, res, next) =>
    {
        const thisFriend = req.body.friendId;

        // Used to create a token later
        var token = require('./createJWT.js');
        // Store JWT
        const jwToken = req.body.jwToken;
        // Error field
        var error = '';

        // even if nothing is deleted, the result in the try block will have a deletedCount of 0.
        var msg = '';

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        const db = await client.db();
        const friendExist = await db.collection('Friends').find({friendId:thisFriend}).toArray();
      

        // if (friendExist.length === 0)
        // {
        //     // Send an error that the friend doesn't exist
        //     error = "friend doesn't exist";
        //     ret = { error: error };
        //     res.status(500).json(ret);

        //     // Exit the api call
        //     return;
        // }
        // Actual friend deletion
        try
        {
           
            const result = await db.collection('Friends').deleteOne({friendId: thisFriend});
            msg = result;
        }
        catch(e)
        {
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

    app.post('/searchFriends', async (req, res, next) =>
    {
        const search = req.body.search;
        const userId = req.body.userId;

        // Used to create a token later
        var token = require('./createJWT.js');
        // Store JWT
        const jwToken = req.body.jwToken;
        // Error field
        var error = '';

        var msg = '';

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken:''};
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }
        const db = await client.db();
    
        if (search === '')
        {
            const result = await db.collection('Friends').find({}).toArray();
            msg = result;
        }
        else
        {
            try
            {
               
                const result = await db.collection('Friends').find({$and: [{userId:userId},{$text : {$search : search}}]}).toArray();
                msg = result;
            }
            catch(e)
            {
                msg = e;
            }
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
            const db = await client.db();
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

    app.post('/changeUserSettings', async (req, res, next) =>
    {
        var ret = '';
        const { userId, newPassword, newFirstName, newLastName, newUsername, jwToken} = req.body
        var token = require('./createJWT.js');

        try
        {
            if( token.isExpired(jwToken))
            {
                var err = {error:'The JWT is no longer valid', jwToken:''};
                res.status(500).json(err);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
            return;
        }

        const db = await client.db();

        // Search the database for the username and email
        const usernameExist = await db.collection('Users').find({username:newUsername}).toArray();

        // If the returned array is not 0 then user already exists
        if (usernameExist.length != 0)
        {
            // Send an error that the username already exists
            error = "Username already exists";
            ret = { error: error };
            res.status(500).json(ret);

            // Exit the api call
            return;
        }

        const result = await db.collection('Users').updateOne({userId : userId}, {$set : {firstName: newFirstName, lastName : newLastName, password : newPassword, username: newUsername}});

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

        ret = Object.assign({}, refreshedToken);
        
        res.status(200).json(ret);
    });

    app.post('/nearbyFoodSearch', async (req, res, next) => 
    {

        // incoming: address, latitude, longitude, keyword, radius, type, pageToken
        // outgoing: many things

        var lat;
        var lng;
        var searchUrl;
        var ret;
        var isError = 0;
        var errorMsg;

        const { address, latitude, longitude, keyword, radius, pageToken, jwToken} = req.body;

        var token = require('./createJWT.js');

        if (jwToken != '')
        {
            try
            {
                if( token.isExpired(jwToken))
                {
                    var r = {error:'The JWT is no longer valid', jwToken:''};
                    res.status(500).json(r);
                    return;
                }
            }
            catch(e)
            {
                console.log(e.message);
                return;
            }
        }
        if ((latitude == '' || longitude == '') && pageToken == '')
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
            var photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?';

            // If the pageToken is empty, do a normal search based on the input. If pageToken isn't blank, it will attempt to search using said pageToken. 
            if (pageToken == '')
                searchUrl = baseUrl + 'location=' + lat + '%2C' + lng + '&radius=' + radius + '&type=restaurant&keyword=' + keyword + '&key=' + process.env.GOOGLE_API_KEY;
            else
                searchUrl = baseUrl + 'pagetoken=' + pageToken + '&key=' + process.env.GOOGLE_API_KEY;
                
            // Get all the data and return it.
            await axios.get(searchUrl)
            .then(function (response)
            {
                ret = response.data;
                
                if(ret.status != "OK")
                {
                    isError = 1;
                    errorMsg = {error: ret.status};
                }
            })
            .catch(function()
            {
                errorMsg = {error:"Search Error"};
                isError = 1;
            });
            
            
            for (let i = 0; i < ret.results.length; i++)
            {
                var placeDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + ret.results[i].place_id + '&fields=website%2Cphotos%2Cformatted_phone_number%2Creviews%2Copening_hours&key=' + process.env.GOOGLE_API_KEY;
                await axios.get(placeDetailsUrl)
                .then(function (placeDetailsRes)
                {
                    ret.results[i]["opening_hours"] = placeDetailsRes.data.result.opening_hours;
                    ret.results[i]["website"] = placeDetailsRes.data.result.website;
                    ret.results[i]["reviews"] = placeDetailsRes.data.result.reviews;
                    ret.results[i]["formatted_phone_number"] = placeDetailsRes.data.result.formatted_phone_number;
                    if (placeDetailsRes.data.result.hasOwnProperty('photos') && ret.results[i].hasOwnProperty('photos'))
                        placeDetailsRes.data.result.photos.unshift(ret.results[i].photos[0]);
                    ret.results[i]["photos"] = placeDetailsRes.data.result.photos;
                    
                })
                .catch(function()
                {
                    console.log("place details error");
                    errorMsg = {error:"place details Error"};
                }); 
            }
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
        {
            ret = Object.assign({}, ret, errorMsg);
            res.status(500).json(ret);
        }
        else
            res.status(200).json(ret);
        
    });

    app.post('/nearbyActivitySearch', async (req, res, next) => 
    {

        // incoming: address, latitude, longitude, keyword, radius, type, pageToken
        // outgoing: many things

        var lat;
        var lng;
        var searchUrl;
        var ret;
        var isError = 0;
        var errorMsg;

        const { address, latitude, longitude, radius, jwToken} = req.body;

        var keyword = req.body.keyword;

        if (keyword === '')
        {
            keyword = 'activities';
        }

        var token = require('./createJWT.js');

        if (jwToken != '')
        {
            try
            {
                if( token.isExpired(jwToken))
                {
                    var r = {error:'The JWT is no longer valid', jwToken:''};
                    res.status(500).json(r);
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

  
            searchUrl = baseUrl + 'location=' + lat + '%2C' + lng + '&radius=' + radius + '&type=establishment&keyword=' + keyword + '&key=' + process.env.GOOGLE_API_KEY;
    

            // Get all the data
            await axios.get(searchUrl)
            .then(function (searchResponse)
            {
                ret = searchResponse.data;
                if(ret.status != "OK")
                {
                    isError = 1;
                    errorMsg = {error: ret.status};
                }
            })
            .catch(function()
            {
                console.log("1");
                errorMsg = {error:"Search Error"};
                isError = 1;
            });

            for (let i = 0; i < ret.results.length; i++)
            {
                var placeDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + ret.results[i].place_id + '&fields=website%2Cphotos%2Cformatted_phone_number%2Creviews%2Copening_hours&key=' + process.env.GOOGLE_API_KEY;
                await axios.get(placeDetailsUrl)
                .then(function (placeDetailsRes)
                {
                    ret.results[i]["opening_hours"] = placeDetailsRes.data.result.opening_hours;
                    ret.results[i]["website"] = placeDetailsRes.data.result.website;
                    ret.results[i]["reviews"] = placeDetailsRes.data.result.reviews;
                    ret.results[i]["formatted_phone_number"] = placeDetailsRes.data.result.formatted_phone_number;
                    if (placeDetailsRes.data.result.hasOwnProperty('photos') && ret.results[i].hasOwnProperty('photos'))
                        placeDetailsRes.data.result.photos.unshift(ret.results[i].photos[0]);
                    ret.results[i]["photos"] = placeDetailsRes.data.result.photos;
                    
                })
                .catch(function()
                {
                    console.log("place details error");
                    errorMsg = {error:"place details Error"};
                }); 
            }
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
        {
            ret = Object.assign({}, ret, errorMsg);
            res.status(500).json(ret);
        }
        else
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
        var ret;

        // Connect to the database
        const db = await client.db();

        // Search the database for the username and email
        const userExist = await db.collection('Users').find({username:newUser.username}).toArray();
        const emailExist = await db.collection('Users').find({email:newUser.email}).toArray();

        // If the returned array is not 0 then user already exists
        if (userExist.length != 0)
        {
            // Send an error that the username already exists
            error = "Username already exists";
            ret = { error: error };
            res.status(500).json(ret);

            // Exit the api call
            return;
        }

        if (emailExist.length != 0)
        {
            // Send an error that the email already exists
            error = "Email already exists";
            ret = { error: error };
            res.status(500).json(ret);

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
            await delay(300);
            // only returns the first instance of the username as a single user instead of array.
            const retNewUser = await db.collection('Users').findOne
            (
                {
                    $or: [
                        {'username' : newUser.username}
                    ]
                }
            )
            console.log("New User");
            console.log(retNewUser);
            const token = require("./createJWT.js");
            retToken = token.createToken( retNewUser.firstName, retNewUser.lastName, retNewUser.userId );
        }

        catch(e)
        {
            error = e.toString();
        }

        // Everything is successful send empty error
        ret = Object.assign(retToken, {error:error});
        res.status(200).json(ret);

        function delay(milliseconds)
        {
            return new Promise(resolve=> 
                {
                    setTimeout(resolve, milliseconds);
                });
        }
    });

    app.post('/login', async (req, res, next) => 
    {
        // incoming: username, password
        // outgoing: id, firstName, lastName, error

        const { username, password } = req.body;

        const db = await client.db();
        const results = await db.collection('Users').findOne({username:username,password:password});

        var id = -1;
        var fn = '';
        var ln = '';

        var errMsg = '';

        if( results )
        {
            id = results.userId;
            fn = results.firstName;
            ln = results.lastName;
            
            if (results.emailConfirm == -1)
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

            ret = Object.assign(ret, {error:errMsg})
            res.status(200).json( ret );
        }
        else
        {
            const token = require("./createJWT.js");
            errMsg = 'Login/Password incorrect';
            ret = token.createToken( fn, ln, id );
            ret = Object.assign(ret, {error:errMsg})
            res.status(500).json( ret );
        }
    });

    // needs jwToken, userId, folderId. 
    app.post('/createFolder', async (req, res, next) =>
    {
        // jwToken holds the token needed to give access to this api.
        const jwToken = req.body.jwToken;
        var error = ''; var msg = ''; var ret;
        var token = require('./createJWT.js');

        // new folder construction.
        const newFolder = new Folder
        ({
            userId: req.body.userId,
            folderType: req.body.folderType.toLowerCase(),
            folderName: req.body.folderName,
            placeList: [{
                placeName: 'Sample Place',
                placeAddress: '123 Real Address',
                placeRating: '5.0',
                placePhone: '(999) 999-9999',
                placeWebsite: '',
                placeDescription: 'Keywords',
                folderId: 0
            }]
        });

        try
        {
            if( token.isExpired(jwToken))
            {
                var r = {error:'The JWT is no longer valid', jwToken: ''};
                res.status(500).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }
        const db = await client.db();
        const userIdExist = await db.collection('Users').find({userId:newFolder.userId}).toArray();
      

        if (userIdExist.length === 0)
        {
            // Send an error that the userId doesn't exist
            error = "userId doesn't exist";
            ret = { error: error };
            res.status(500).json(ret);

            // Exit the api call
            return;
        }

        

        try
        {
            const results = await db.collection('Folders').insertOne(newFolder);
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

    app.post('/sendtestmail', async (req, res, next) =>
    {   
        console.log("GET A EMAIL REQUEST");
        // Sendgrid setup
        require('dotenv').config();
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Token for checking and refreshing
        var token = require('./createJWT.js');
    
        // Error message to be sent
        var error = '';

        // Response of email status
        var responseMsg = '';

        // Show what gets sent from front-end
        console.log(req.body);

        // Variable to store the response to be sent back to front-end
        const r = 
        {
            error: error,
            jwToken: req.body.jwToken,
            response: responseMsg
        };

        // Check if token is expired
        try
        {
            if( token.isExpired(req.body.jwToken))
            {
                r.error = 'The JWT is no longer valid';
                r.jwToken = '';
                r.response = responseMsg;

                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log("token expired catch");
            console.log(e.message);

        }

        // Make a new token and store it in the message to be sent back
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(r.jwToken);
            r.jwToken = refreshedToken;
        }
        catch(e)
        {
            console.log("token refresh catch");
            console.log(e.message);
        }
        


        // SEND EMAIL STUFF

        // Get usedId from front-end
        const userId = req.body.userId;

        // Connect to the database
        const db = await client.db();
        // Search the database for the userId
        const userEmail = await db.collection('Users').findOne({userId:userId});

        console.log("User to send email to");
        console.log(userEmail);

        // Check if user has already been verified
        if( userEmail.emailConfirm == 1)
        {
            responseMsg = "Email is Confirmed";
        }
        else 
        {
            // Create token for confirmation
            const hash = token.createConfirmToken(userEmail.email);
            console.log("email token");
            console.log(hash.accessToken);

            const placeToken = await db.collection('Users').updateOne({userId: userEmail.userId}, {$set: {confirmToken: hash.accessToken}});

            const msg = {
                to: userEmail.email, // Change to your recipient
                from: 'group4poosd@gmail.com', // Change to your verified sender
                substitutionWrappers: ['{{', '}}'],
                dynamicTemplateData: {
                    first_name: `${userEmail.firstName}`,
                    url: encodeURI(`http://${req.headers.host}/confirmEmail?token=${hash.accessToken}&email=${userEmail.email}&redirect=${req.headers.origin}`)
                },
                templateId: 'd-450016c069bb4859bbaabf2742ff6766',
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                responseMsg = "Email successfully sent!";

                // Edit responses
                r.error = error;
                r.response = responseMsg;

                // Show response before sent
                console.log(r);

                // Send the response
                res.status(200).json(r);
            })
            .catch((error) => {
                console.error(error)

                // Edit response
                r.error = error;

                // Show response
                console.log(r)
            });
        }
            // Send response
            res.status(200).json(r);
    });

    app.get('/confirmEmail', async (req, res, next) =>
    {   
        // Token for checking and refreshing
        var token = require('./createJWT.js');
    
        // Error message to be sent
        var error = '';

        // Get userId from sent
        const receivedToken = req.query.token;

        // Check if token is expired
        try
        {
            if( token.isExpired(receivedToken))
            {
                console.log('The JWT is no longer valid');
                res.status(400);
                return;
            }
        }
        catch(e)
        {
            console.log("token expired catch");
            console.log(e.message);
            return;
        }

        console.log("request");
        console.log(req.query);

        // Connect to the database
        const db = await client.db();
        const checkedUser = await db.collection('Users').findOne({email: req.query.email});
        const confirmUser = await db.collection('Users').updateOne({userId: checkedUser.userId}, {$set: {emailConfirm: 1}, $unset: {confirmToken: ''}});
        console.log(confirmUser);

 
        // NEEDS TO REDIRECT TO REACT SERVER
        res.redirect(`${req.query.redirect}/Verify`);
        //////
        return;
    });

    app.post('/checkConfirm', async (req, res, next) =>
    {   
        // Token for checking and refreshing
        var token = require('./createJWT.js');
    
        // Error message to be sent
        var error = '';

        // Variable to store the response to be sent back to front-end
        const r = 
        {
            error: error,
            jwToken: req.body.jwToken,
        };

        // Check if token is expired
        try
        {
            if( token.isExpired(req.body.jwToken))
            {
                r.error = 'The JWT is no longer valid';
                r.jwToken = '';

                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log("token expired catch");
            console.log(e.message);
        }

        // Make a new token and store it in the message to be sent back
        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(r.jwToken);
            r.jwToken = refreshedToken;
        }
        catch(e)
        {
            console.log("token refresh catch");
            console.log(e.message);
        }
        
        // Get usedId from front-end
        const userId = req.body.userId;

        try
        {
            // Connect to the database
            const db = await client.db();
            // Search the database for the userId
            const userConfirm = await db.collection('Users').findOne({userId:userId});

            // Check if user has already been verified
            if( userConfirm.emailConfirm == 1)
            {
                error = "Email is Confirmed";
                r.error = error;
            }
            else 
            {
                error = "Email not Confirmed";
                r.error = error;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        // Send response
        res.status(200).json(r);
    });

    app.post('/sendResetEmail', async (req, res, next) =>
    {   
        // Sendgrid setup
        require('dotenv').config();
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Token for checking and updating
        var token = require('./createJWT');

        // Error message to be sent
        var error = '';

        // Response of email status
        var responseMsg = '';

        // Show what gets sent from front-end
        // console.log("req body:");
        // console.log(req.body);

        // Variable to store the response to be sent back to front-end
        const r = 
        {
            error: error,
            response: responseMsg,
            jwToken: null
        };

        // SEND EMAIL STUFF

        // Connect to the database
        const db = await client.db();
        // Search the database for the account tied to the email
        const resetUser = await db.collection('Users').findOne({email:req.body.email});
        console.log("reset user:");
        console.log(resetUser);

        // Make a new token and store it in the message to be sent back
        var emailToken = null;
        try
        {
            emailToken = token.createToken( resetUser.id, resetUser.email );
            r.jwToken = emailToken;
        }
        catch(e)
        {
            console.log("token generation catch");
            console.log(e.message);
            console.log(r);
        }
        
        // checks if account of email exists before sending email
        if(resetUser == null) {
            
            responseMsg = "An account with that email does not exist.";
            r.error = error;
            r.response = responseMsg;
            res.status(200).json(r);

        } else {

            // Create token for confirmation
            const hash = token.createConfirmToken(resetUser.email);
            console.log("email token");
            console.log(hash.accessToken);
            
            const placeToken = await db.collection('Users').updateOne({userId: resetUser.userId}, {$set: {confirmToken: hash.accessToken}});
            
            const msg = {
                to: resetUser.email, // Change to your recipient
                from: 'group4poosd@gmail.com', // Change to your verified sender
                substitutionWrappers: ['{{', '}}'],
                dynamicTemplateData: {
                    username: `${resetUser.username}`,
                    url: encodeURI(`http://${req.headers.host}/confirmReset?token=${hash.accessToken}&email=${resetUser.email}&redirect=${req.headers.origin}`)
                },
                templateId: 'd-7e5ebc6daf174a4882b1b6b8b0df631e',
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                responseMsg = "Password reset email successfully sent!";

                // Edit responses
                r.error = error;
                r.response = responseMsg;

                // Show response before sent
                console.log(r);

                // Send the response
                res.status(200).json(r);
            })
            .catch((error) => {
                console.error(error)

                // Edit response
                r.error = error;

                // Show response
                console.log(r)

                // Send response
                res.status(200).json(r);
            });
        }

        return;
    });

    app.get('/confirmReset', async (req, res, next) =>
    {   
        // Token for checking and refreshing
        var token = require('./createJWT.js');

        // Get token from sent
        const receivedToken = req.query.token;

        // Check if token is expired
        try
        {
            if( token.isExpired(receivedToken))
            {
                console.log('The JWT is no longer valid');
                res.status(400);
                return;
            }
        }
        catch(e)
        {
            console.log("token expired catch");
            console.log(e.message);
            return;
        }

        console.log("request");
        console.log(req.query);

        res.redirect(`${req.query.redirect}/PasswordChange`);
        //////
        return;
    });

    app.post('/resetPassword', async (req, res, next) =>
    {
        // Token for checking and updating
        var token = require('./createJWT');

        // Error message to be sent
        var error = '';

        var responseMsg = '';

        // Variable to store the response to be sent back to front-end
        const r = 
        {
            error: error,
            response: responseMsg
        };

        console.log("user data:");
        console.log(req.body.userData);
        var resetEmail = req.body.userData.lastName; 

        // Connect to the database
        const db = await client.db();
        // Search the database for the userId and update password
        const resetUser = await db.collection('Users').findOne({email:resetEmail});

        console.log("user to be reset:");
        console.log(resetUser);

        if(resetUser.confirmToken == null) {
            responseMsg = "An error has occured with the verification link. Please try again."
        } else {
        
            const confirmUser = await db.collection('Users').updateOne({userId: resetUser.userId}, 
            {$set: {password: req.body.password}}, {$unset: {confirmToken: ''}});
            responseMsg = "Password successfully updated!"
        }

        res.status(200).json(r);
    });

    app.post('/retrieveFolders', async (req, res, next) =>
    {

    // These variables are sent from front-end
    // folderType needs to be made to lower in order to correctly match the folderType string.
    const userId = req.body.userId;
    const jwToken = req.body.jwToken;
    const folderType = req.body.folderType.toLowerCase();
    var error = '';
    var token = require('./createJWT.js');
    

    // Checks if the JWT is expired
    // Sets the error and returns
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
        return;
    }

    // JWT is not expired so add the Folder to the database
    var results;
    try
    {
        const db = await client.db();
        results = await db.collection('Folders').find({userId:userId, folderType:folderType}).toArray();

    }
    catch(e)
    {
        error = e.toString();
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

    // Sen the user back an error field and their refreshed token
    var ret = { error: error, jwToken: refreshedToken, folders: results };
    
    res.status(200).json(ret);
    });

    app.post('/retrieveFriends', async (req, res, next) =>
    {
        console.log("HEREEE")

    // These variables are sent from front-end
    // folderType needs to be made to lower in order to correctly match the folderType string.
    const userId = req.body.userId;
    const jwToken = req.body.jwToken;
    var error = '';
    var token = require('./createJWT.js');
    

    // Checks if the JWT is expired
    // Sets the error and returns
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
        return;
    }

    // JWT is not expired so add the Folder to the database
    var results;
    try
    {
        const db = await client.db();
        results = await db.collection('Friends').find({userId:userId}).toArray();

    }
    catch(e)
    {
        error = e.toString();
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

    // Sen the user back an error field and their refreshed token
    var ret = { error: error, jwToken: refreshedToken, friends: results };
    
    res.status(200).json(ret);
    });

    // retrieves single folder with folderId.
    app.post('/checkIfLoggedIn', async (req, res, next) =>
    {
        var token = require('./createJWT.js'); var msg = ''; var error = '';

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
        
        var ret = {error: error};
        console.log(ret);
        res.status(200).json(ret);
    });
}