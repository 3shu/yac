// users.route.js

const express = require('express');
const usersRoutes = express.Router();

// Require Users model in our routes module
let Users = require('../models/users.model');

// Defined store route
usersRoutes.route('/add').post(function (req, res) {
  let users = new Users(req.body);
  users.save()
    .then(users => {
      res.status(200).json({'users': 'users in added successfully'});
    })
    .catch(err => {
      const errString = err.toString();
      if (errString.includes("E11000")) {
        res.status(400).json({ 'error': "That nickname is already in use!" });
      }else{
        res.status(400).json({ 'error': errString });
      }
    });
});

usersRoutes.route('/login').get(function (req, res) {
  console.log('Find');
  Users.find(req.query,function(err, userses){
    if(err){
      console.log(err);
    }
    else {
      res.json(userses);
    }
  });
});

module.exports = usersRoutes;