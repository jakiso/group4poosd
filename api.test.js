/* The following will be unit tested
    - Successful Login / Unsuccessful login
    - Create folder
    - Delete Folder
    - Add place from folder
    - Delete place from folder
    - Edit user username/ Unsuccessful edit username
    - Search place
*/

// WARNING: Unit testing needed to be created with different app structure from current so it will not run with this branch 
const app = require('app');
const request = require('supertest');

// Testing the login api
describe("Unit testing Login...", () => {
	test("Unit test wrong username: returns not login/password incorrect", async () => {
		await request(app).post("localhost:5000/api/login")
		.send({
			username: "failedusername",
			password: "unittestingisfun"
		})
		.expect((res) => {
	        res.body.error = "Login/Password incorrect"
	     })
	})
	test("Unit test wrong password: should return incorrect", async () => {
		await request(app).post("localhost:5000/api/login")
		.send({
			username: "jenkins",
			password: "wrongpassword"
		})
		.expect((res) => {
	        res.body.error = "Login/Password incorrect"
	     })
	})
	test("Unit test correct login info: returns 200 status", async () => {
		await request(app).post("localhost:5000/api/login")
		.send({
			username: "jenkins",
			password: "password"
		})
		.expect((res) => {
			res.body.status = 200
	     })
	})
})
// Testing the Create Folder
describe("Unit testing Create Folder...", () => {
	test("Unit test creation of folder", async () => {
		await request(app).post("localhost:5000/api/createfolder")
		.send({
			userID: "4",
			folderType: "food",
            folderName: "TEST"
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})
    test("Unit test creation of folder with invalid id", async () => {
		await request(app).post("localhost:5000/api/createfolder")
		.send({
			userID: "",
			folderType: "food",
            folderName: "TEST"
		})
		.expect((res) => {
			res.body.status = 500;
	     })
	})
// Testing add place to folder
describe("Unit testing Add place to Folder...", () => {
	test("Unit test add place to folder", async () => {
		await request(app).post("localhost:5000/api/savePlace")
		.send({
			uid: "4",
			fid: "1",
            placeName: "TEST NAME",
            placeAddress: "TEST ADDRESS"
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})

})
// Testing delete place from folder
describe("Unit testing delete place from Folder...", () => {
	test("Unit test deletion of place from folder", async () => {
		await request(app).post("localhost:5000/api/deletePlace")
		.send({
			uid: "4",
			fid: "1",
            placeName: "TEST NAME",
            placeAddress: "TEST ADDRESS"
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})

})

})
// Testing the Delete Folder
describe("Unit testing Delete Folder...", () => {
	test("Unit test deletion of dolder", async () => {
		await request(app).post("localhost:5000/api/deletefolder")
		.send({
			folderId: "1",
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})
    test("Unit test deletion of folder with invalid folder ID", async () => {
		await request(app).post("localhost:5000/api/deletefolder")
		.send({
			folderId: "",
		})
		.expect((res) => {
			res.body.status = 500;
	     })
	})

})

// Testing Edit user
describe("Unit testing change user settings...", () => {
	test("Unit testing change user settings...", async () => {
		await request(app).post("localhost:5000/api/changeUserSettings")
		.send({
            userId : "4", 
            newPassword: "changetest", 
            newFirstName: "test", 
            newLastName: "test", 
            newUsername: "testing"
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})

})
// Testing Search place
describe("Unit testing search for place near ucf...", () => {
	test("Unit test search place from google api", async () => {
		await request(app).post("localhost:5000/api/nearbyFoodSearch")
		.send({
            address, 
            latitude :"28.6024° N", 
            longitude:"81.2001° W", 
            keyword:"pizza",
             radius:"5 miles", 
             type: "food", 
             pageToken
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})

})
