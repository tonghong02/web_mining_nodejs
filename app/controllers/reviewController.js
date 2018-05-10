'use strict'
var mongoose = require('mongoose');

var Review = require('../models/Review')

function getReviews(res) {
    Review.find({})
        .populate("user")
        .populate("idMovie")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// = = = = = = = = 
exports.findUserMovie = function (req, res, next) {
    Review.findOne({ user: req.params.user, movie: req.params.movie }, (err, data) => {
        if (err) return res.status(500).json(err);
        else if (!data) return res.json({ err: "Not found user" });

        res.json(data);
    })
}

exports.getList = function (req, res, next) {
    let where = {};
    let filter = req.query;
    let movie = req.query.movie;
    let user = req.query.user;

    if (movie) {
        where.movie = movie.toLowerCase();
    }
    if (user) {
        where.user = user.toLowerCase();
    }
    if (where) {
        filter.where = where;
    }
    Review.find(filter.where)
        .populate("user")
        .populate("idMovie")
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// can xem lai
exports.create = function (req, res, next) {
    let param = {
        user: req.body.user,
        idMovie: req.body.idMovie,
        movie: req.body.movie,
        rate: req.body.rate,
        content: req.body.content,
    };
    let review = new Review(param);
    Review.create(review, (err, review) => {
        if (err) return res.status(500).json(err);
        res.json(review);
    });

    // Review.find({ user: req.body.user, movie: req.body.movie }, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     if (data.length !== 0) {
    //         return res.json({ err: "USER AND MOVIE IS ALREADY EXIST" })
    //     }
    //     else {
    //         Review.create(review, (err, review) => {
    //             if (err) return res.status(500).json(err);
    //             res.json(review);
    //         });
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

    // let titleMovie = res.params.movie;
    // Review.find({ "movie": titleMovie })
    //     .populate('user')
    //     .populate('movie')
    //     .exec((err, data) => {
    //         if (err) return res.status(500).json(err);
    //         res.json(data);
    //     })
}

exports.update = function (req, res, next) {
    let reviewId = req.params.id;

    let param = {
        user: req.body.user,
        idMovie: req.body.idMovie,
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
            // getReviews(res);
            res.json(data);
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