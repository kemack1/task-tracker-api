Project title:
* Task Tracker API

Short project description:
* This task tracker is a backend built API using Node.js, Express, MongoDB, and Mongoose. It allows users to register, log in, and manage personal task records. The routes are protected with a JWT Authentication so only logged-in users can have access to their own tasks.


List of main features:
* Main Features Include:
	* Health check route to confirm the API is running
	* User registration
	* User login
	* JWT token authentication
	* Protected task routes
	* Create new tasks
	* View tasks for the logged-in user
	* Update existing tasks
	* Delete tasks
	* MongoDB database integration
	* Environment variable support


Technologies used:
* Technologies Include:
	* Node.js
	* Express.js
	* MongoDB Atlas
	* Mongoose
	* JSON Web Token
	* bcryptjs
	* dotenv
	* cors
	* nodemon
	* Thunder Client for local API testing


Instructions for running the project locally:
* Step 1 - Clone your repository using Git Bash and type "git clone (insert your repo url)"
* Step 2 - Go into your project folder using "cd task-tracker-api"
* Step 3 - Install your dependencies using "npm install"
* Step 4 - Create and .env file in the root of the project
* Step 5 - Add the environment variables to the .env file like:
							"PORT= (your port number)"
							"MONGO_URI= (your mongodb connection string)"
							"JWT_SECRET= (your jwt secret)"
*Step 6 - Start the server by using "npm run dev"
*Step 7 - You should see your local API running called "http://localhost:5000"

List of required environment variables without revealing private values:
* PORT=your_port_number
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_jwt_secret


API route overview:
* Health Route
	* GET > /api/health > Confirms if API is running > Not Protected
		* Example Response include: 
			* "message": "Task Tracker API is running"
* Authentication Route
	* POST > /api/auth/register > Register a new user > Not Protected 
	* POST > /api/auth/login > Logs in a user and returns a JWT Token > Not Protected

* Task Route
	* All task routes a valid JWT token in the Authorization header
	* The header should use:
		* "Authorization: Bearer (your token here)"
			* GET > /api/tasks > Returns all tasks for the log-in user > Protected 
			* POST > /api/tasks > Creates a new task > Protected
			* PUT > /api/tasks/:id > Updates an existing task > Protected
			* DELETE > /api/tasks/:id > Deletes a task > Protected 
		* Example Task Object include:
			* 	{
  					"title": "Finish API project",
  					"description": "Build, test, and publish the backend API",
  					"completed": false
				}
			

Testing Route
* The API was tested locally using Thunder Client. Testing included:
	* Confirming the server runs locally
	* Testing the health route
	* Registering a new user
	* Logging in and receiving a JWT token
	* Confirming task routes cannot be accessed without a token
	* Creating a task with a valid token
	* Viewing tasks with a valid token
	* Updating a task with a valid token
	* Deleting a task with a valid token
	* Confirming users and tasks appear in MongoDB Atlas
