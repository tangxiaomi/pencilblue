global.url = require('url');
global.fs = require('fs');
global.http = require('http');

// Fixes fs on earlier versions of node
fs.exists = fs.exists || require('path').exists;
fs.existsSync = fs.existsSync || require('path').existsSync;

// Site-wide constants
require('./constants');
// ContentType responses
require('./response_head');
// URL routing
require('./router');
// Query parameter retrieval
require('./query');
// Unique ID
require('./unique_id');
// Sessions
require('./session');
// Database connection
require('./mongo_connect');
// Database objects
require('./model/db_object');
// Templatizing
require('./templates');
// Localization
require('./localization');
// Client JS
require('./client_js');

// Create a custom file called custom_requirements.js to add your own file requirements
require('./custom_requirements');
