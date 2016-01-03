var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

userRouter.route('/')
    .get(function (req, res) {
        User.find({_id: req.user._id}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        })
    })
    .put(function (req, res){
        User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, function(err, user){
            if (err) res.status(500).send(err);
            res.send(user);
        })
    });

module.exports = userRouter;
