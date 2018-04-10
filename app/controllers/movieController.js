'use strict'
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var Movie = require('../models/Movie')

function getMovies(res) {
    Movie.find({})
        .populate("category")
        .populate("country")
        .exec((err, data) => {
            if(err) return res.status(500).json(err);
            res.json(data);
        })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    Movie.find({})
    .populate("category")
    .populate("country")
    .exec((err, data) => {
        if(err) return res.status(500).json(err);
        res.json(data);
    })
}

exports.create = function (req, res, next) {
    let param = {
        title: req.body.title,
        year: req.body.year,
        imdb: req.body.imdb,
        view: req.body.view,
        category: req.body.category,
        country: req.body.country
    };
    let movie = new Movie(param);

    Movie.findOne({ title: req.body.title }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
            return res.json({ err: "NAME MOVIE IS ALREADY EXISTS!" })
        }
        else {
            Movie.create(movie, (err, movie) => {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        }
    })
}

exports.get = function (req, res, next) {
    let movieId = req.params.id;
    Movie.findById({ _id: movieId })
    .populate("category")
    .populate("country")
    .exec((err, data) => {
        if(err) return res.status(500).json(err);
        res.json(data);
    })
}

exports.update = function (req, res, next) {
    let movieId = req.params.id;

    let param = {
        title: req.body.title,
        year: req.body.year,
        imdb: req.body.imdb,
        view: req.body.view,
        category: req.body.category,
        country: req.body.country
    };

    Movie.findById({ _id: movieId }, (err, movie) => {
        if (err) return res.status(500).json(err);
        if (!movie) {
            return res.json({ err: "MOVIE IS NOT FOUND!" })
        }
        Movie.findOne({ title: param.title }, (err, movie) => {
            if (err) return res.status(500).json(err);
            if (movie) {
                return res.json({ err: "NAME MOVIE IS ALREADY EXISTS!" })
            }
            Movie.update({ _id: movieId }, param, (err, data) => {
                if (err) return res.status(500).json(err);
                // res.json(data);
                getMovies(res);
            })
        })
    })
}

exports.remove = function (req, res, next) {
    let movieId = req.params.id;

    Movie.findByIdAndRemove(movieId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })

}