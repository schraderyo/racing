const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15550000 // 180 ish days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/racing'), {
    etag: false
  })
);

/**
 * Get all member data
 */
app.get('/api/members', (req, res) => {
  console.log('enters Get');
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

/**
 * Get member by ID
 */
app.get('/api/members/:id', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      let allMembers = JSON.parse(body);
      res.send(JSON.stringify(allMembers.find(res => { return res.id == req.params.id })))
    }
  });
});

/**
 * Get all teams objects
 */
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

/**
 * Post to org members data
 */
app.post('/api/addMember', (req, res) => {
  var details = req.body;
  details.team = details.team['teamName'];

  if (!memberValidated(details)) {
    return console.error('upload failed:', err);
  }
  
  request.post('http://localhost:3000/members',  {form: details}, (err, response, body) => {
    if (err) {
      return console.error('upload failed:', err);
    } else {
      res.send(body)
    }
  });
});

/**
 * Edit member data by Put via ID
 */
app.put('/api/editMember/:id', (req, res) => {
  var details = req.body;
  details.team = details.team['teamName'];

  if (!memberValidated(details)) {
    return console.error('upload failed:', err);
  }
  
  request.put('http://localhost:3000/members/' + req.params.id, {form: details}, (err, response, body) => {
    if (err) {
      return console.error('upload failed:', err);
    } else {  
      res.send(body)
    }
  });
});

/**
 * Delete member data via ID
 */
app.delete('/api/deleteMember/:id', (req, res) => {
  request.delete('http://localhost:3000/members/' + req.params.id, (err, response, body) => {
    if (err) {
      return console.error('upload failed:', err);
    } else {
      res.send(body)
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/racing/index.html'));
});

app.listen('8000', () => {
  console.log('Server starting!');
});

function memberValidated(data) {
  if (data.firstName === '' || data.lastName === '' || data.jobTitle === '' || data.team === '' || data.status === '') {
    return false;
  }
  if (data.status !== 'Active' && data.status !== 'Inactive') {
    return false;
  }
  if (typeof data.team !== 'string') {
    return false;
  }
  return true;
}