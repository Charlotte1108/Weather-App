// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8890; 

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

tempData = {};

//GET route that returns the projectData object
app.get('/all', sendData)

function sendData (req, res) {
    res.send(projectData)
}

// POST route
app.post('/projectData', addData)

function addData(req, res) {
    
    newEntry = {
        date: req.body.date,
        temperature: req.body.temperature,
        content: req.body.content
    }
    
    projectData = newEntry
    res.send(projectData)
}

