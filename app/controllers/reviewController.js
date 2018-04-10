'use strict'
var mongoose = require('mongoose');

var Review = require('../models/Review')

function getReviews(res) {
    Review.find({})
        .populate("user")
        .populate("movie")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    Review.find({})
        .populate("user")
        .populate("movie")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

exports.create = function (req, res, next) {
    let param = {
        user: req.body.user,
        movie: req.body.movie,
        rate: req.body.rate,
        content: req.body.content,
    };
    let review = new Review(param);

    // Review.find({ user: req.body.user, movie: req.body.movie }, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     if (data) {
    //         Review.update({ user: req.body.user }, param, (err, data) => {
    //             if (err) return res.status(500).json(err);
    //             getReviews(res);
    //         })
    //     }
    // else {
    Review.create(review, (err, review) => {
        if (err) return res.status(500).json(err);
        res.json(review);
    });
    //     }
    // })
}

exports.get = function (req, res, next) {
    let reviewId = req.params.id;
    Review.findById({ _id: reviewId })
        .populate("user")
        .populate("movie")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

exports.update = function (req, res, next) {
    let reviewId = req.params.id;

    let param = {
        user: req.body.user,
        movie: req.body.movie,
        rate: req.body.rate,
        content: req.body.content,
    };

    Review.findById({ _id: reviewId }, (err, review) => {
        if (err) return res.status(500).json(err);
        if (!review) {
            return res.json({ err: "REVIEW IS NOT FOUND!" })
        }
        Review.update({ _id: reviewId }, param, (err, data) => {
            if (err) return res.status(500).json(err);
            getReviews(res);
        })
    })
}

exports.remove = function (req, res, next) {
    let reviewId = req.params.id;

    Review.findByIdAndRemove(reviewId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })
}