'use strict'
var mongoose = require('mongoose');

var Review = require('../models/Review')
var User = require('../models/User')
// var Q = require('q');
// var async = rewuire('async');

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
    // Review.findOne({ user: req.params.user, movie: req.params.movie }, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     // else if (!data) retursn res.json({ err: "Not found user" });
    //     res.json(data);
    // })
    Review.findOne({ user: req.params.user, movie: req.params.movie })
        .populate('user')
        .exec((err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
        })
}

// exports.findReviewByIdUser = function (req, res, next) {
//     let idUser = req.params.user;
//     Review.findById({ user: idUser })
//         .populate('user')
//         .populate('idMovie')
//         .exec((err, data) => {
//             if (err) return res.status(500).json(err);
//             res.json(data);
//         })

// }

exports.arrayReviewByIdUser = function (req, res, next) {
    let arrIdUser = [];
    let arrRate = [];
    User.find({}, (err, data) => {
        if (err) return res.status(500).json(err);
        else if (data) {
            console.log("user");
            // console.log(data);
            Review.find({}, (err, reviews) => {
                if (err) return res.status(500).json(err);
                else if (reviews.length !== 0) {
                    for (let i = 0; i < data.length; i++) {
                        let rate = [];
                        for (let j = 0; j < reviews.length; j++) {
                            if (JSON.stringify(data[i]._id) === JSON.stringify(reviews[j].user)) {
                                // console.log("i = " + i + " - j = " + j)
                                // console.log(reviews[j].user);
                                // console.log(data[i]._id);
                                // for (let k = 0; k < reviews.length; j++) {
                                rate.push(reviews[j].rate);
                                arrIdUser.push(data[i]._id);
                                // }
                            }
                        }
                        if (rate.length !== 0) {
                            arrRate.push(rate);
                        }
                    }
                    console.log(arrIdUser);
                    console.log(arrRate);
                    return res.json(
                        { user: arrIdUser, rate: arrRate }
                    );
                }
                return res.json({ err: "NOT USER REVIEW" })
            })
        }
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