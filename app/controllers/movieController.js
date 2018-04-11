'use strict'
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var Movie = require('../models/Movie')

function getMovies(res) {
    Movie.find({}, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    let where = {};
    let filter = req.query;
    let year = req.query.year;
    let imdb = req.query.imdb;
    let title = req.query.title;
    let country = req.query.country;
    let category = req.query.category;

    if (imdb) {
        where.imdb = imdb;
    }
    if (title) {
        where.title = title.toLowerCase();
    }
    if (year) {
        where.year = year;
    }
    if (category) {
        where.category = category.toLowerCase();
    }
    if (country) {
        where.country = country.toLowerCase();
    }
    if (where) {
        filter.where = where;
    }

    Movie.find(filter.where, (err, user) => {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(user);
        }
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
    Movie.findById({ _id: movieId }, (err, data) => {
        if (err) return res.status(500).json(err);
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