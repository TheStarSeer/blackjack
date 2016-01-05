var express = require('express');
var handRouter = express.Router();
var mongoose = require('mongoose');
var Hand = require('../models/hand.js');

handRouter.route('/')
  .get(function(req, res) {
    Hand.find({
        user: req.user._id
      })
      .sort({
        creationDate: 'desc'
      })
      .exec(function(err, hands) {
        if (err) res.status(500).send(err);
        res.send(hands);
      })
  })
  .post(function(req, res) {
    var hand = new Hand(req.body);
    hand.user = req.user;
    hand.save(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(hand);
      }
    });
  });


handRouter.route('/:handId')
  .get(function(req, res) {
    Hand.findOne({
      id: req.params.handId,
      user: req.user._id
    }, function(err, hand) {
      if (err) res.status(500).send(err);
      res.send(hand);
    });
  })
  .put(function(req, res) {
    Hand.findOneAndUpdate({
      id: req.params.handId,
      user: req.user._id
    }, req.body, {
      new: true
    }, function(err, hand) {
      if (err) res.status(500).send(err);
      res.send(hand);
    })
  })
  .delete(function(req, res) {
    Hand.findOneAndRemove({
      id: req.params.handId,
      user: req.user._id
    }, function(err, hand) {
      if (err) res.status(500).send(err);
      res.send(hand);
    })
  });

module.exports = handRouter;
