// chat.route.js

const express = require('express');
const chatRoutes = express.Router();

// Require Users model in our routes module
let Chats = require('../models/theChat.model');

// Defined store route
chatRoutes.route('/add').post(function (req, res) {
  let chat = new Chats(req.body);
  chat.save()
    .then(chat => {
      res.status(200).json({'chat': 'messagge in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


module.exports = chatRoutes;