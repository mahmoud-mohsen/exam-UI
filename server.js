const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/exam'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  console.log(path.join(__dirname + '/src/index.html'));
  
  res.sendFile(path.join(__dirname + '/src/index.html'));
});



// default Heroku PORT
app.listen(process.env.PORT || 3000);
