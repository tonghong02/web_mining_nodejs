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
// loa bo nhung bo phim co cung title trong ket qua tra ve
function removieDuplicateMovie(res) {
    // xu li trung lap phim
    var results = [];
    var titleSeen = {}, titleSeenValue = {};
    let len = res.length;
    for (var i = 0, id; i < len; i++) {
        id = res[i].engTitle;
        if (titleSeen[id] !== titleSeenValue) {
            results.push(res[i]);
            titleSeen[id] = titleSeenValue;
        }
    }
    return results;
}

// = = = = = = = = 
exports.search = function (req, res, next) {
    let search = req.query.search.toLowerCase();
    let filter = {
        find: []
    }
    if (search) {
        filter.find.push({ country: new RegExp(search, 'i') });
        filter.find.push({ title: new RegExp(search, 'i') });
        filter.find.push({ engTitle: new RegExp(search, 'i') });
        filter.find.push({ year: new RegExp(search, 'i') });
    }

    Movie.find({ $or: filter.find }, function (err, movies) {
        if (err) {
            throw err;
        }
        else {
            res.json(movies);
        }

    });
}

// lay ra nhung phim co imdb lon hon 8.0
exports.topIMDB = function (req, res, next) {
    Movie.find({ imdb: { $gt: "8.0" } }, (err, movies) => {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(removieDuplicateMovie(movies));
        }
    })
}

// sap xep phim theo thu tu giam dan view
exports.topView = function (req, res, next) {
    Movie.find({})
        .sort({ "view": -1 })
        .exec((err, movies) => {
            if (err) return res.status(500).json(err);
            res.json(removieDuplicateMovie(movies));
        })
}

// sap xep phim theo thu tu giam dan rate
exports.topRate = function (req, res, next) {
    Movie.find({})
        .sort({ "rate": -1 })
        .exec((err, movies) => {
            res.json(removieDuplicateMovie(movies));
        })
}

// sap xep phim theo thu tu giam dan theo tung category (phim_tinh_cam, phim...)
exports.topViewCategory = function (req, res, next) {
    let category = req.query.category;

    Movie.find({ category: category })
        .sort({ "view": -1 })
        .exec((err, movies) => {
            res.json(removieDuplicateMovie(movies));
        })
}


// exports.topRateView = function (req, res, next) {
//     Movie.aggregate(
//         [
//             { $sort: { "view": -1, "rate": -1 } }
//         ]
//     ).exec((err, movies) => {
//         if (err) return res.status(500).json(err);
//         // res.json(removieDuplicateMovie(movies));
//         res.json(movies);
//     })
// }

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

    Movie.find(filter.where, (err, movies) => {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(removieDuplicateMovie(movies));
        }
    })
}

exports.create = function (req, res, next) {
    let param = {
        title: req.body.title,
        year: req.body.year,
        imdb: req.body.imdb,
        view: req.body.view,
        content: req.body.content,
        category: req.body.category,
        country: req.body.country,
        rate: req.body.rate,
        engTitle: req.body.engTitle,
        linkPhim: req.body.linkPhim,
        linkBackgrounds: req.body.linkBackgrounds,
        engTitle: req.body.linkWatch,
    };
    let movie = new Movie(param);
    Movie.find({ engTitle: req.body.engTitle }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            return res.json({ err: "NAME MOVIE IS ALREADY EXISTS!" })
        }
        else {
            Movie.create(movie, (err, movie) => {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        }
    })

    // Movie.findOne({ title: req.body.title }, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     if (data) {
    //         return res.json({ err: "NAME MOVIE IS ALREADY EXISTS!" })
    //     }
    //     else {
    //         Movie.create(movie, (err, movie) => {
    //             if (err) return res.status(500).json(err);
    //             res.json(movie);
    //         });
    //     }
    // })
}

exports.get = function (req, res, next) {
    // let movieId = req.params.id;
    // Movie.findById({ _id: movieId }, (err, data) => {
    //     if (err) return res.status(500).json(err);
    //     res.json(data);
    // })
    let titleMovie = req.params.title;
    Movie.find({ "engTitle": titleMovie }, (err, data) => {
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
        content: req.body.content,
        category: req.body.category,
        country: req.body.country,
        rate: req.body.rate,
        engTitle: req.body.engTitle,
        linkPhim: req.body.linkPhim,
        linkBackgrounds: req.body.linkBackgrounds,
        linkWatch: req.body.linkWatch,
    };
    // Movie.findOne({ title: param.title }, (err, movie) => {
    //     if (err) return res.status(500).json(err);
    //     if (movie) {
    //         return res.json({ err: "NAME MOVIE IS ALREADY EXISTS!" })
    //     }
    //     Movie.update({ _id: movieId }, param, (err, data) => {
    //         if (err) return res.status(500).json(err);
    //         res.json(data);
    //     })
    // })
    Movie.findById({ _id: movieId }, (err, movie) => {
        if (err) return res.status(500).json(err);
        if (!movie) {
            return res.json({ err: "MOVIE IS NOT FOUND!" })
        }
        Movie.update({ _id: movieId }, param, (err, data) => {
            if (err) return res.status(500).json(err);
            res.json(data);
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