'use strict'
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var Country = require('../models/Country')

function getCountries(res) {
    Country.find(function (err, country) {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(country);
        }
    })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    Country.find((err, country) => {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(country);
        }
    })
}

exports.create = function (req, res, next) {
    let param = {
        name: req.body.name,
    };
    let country = new Country(param);

    Country.findOne({ name: req.body.name }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
            return res.json({ err: "NAME COUNTRY IS ALREADY EXISTS!" })
        }
        else {
            Country.create(country, (err, country) => {
                if (err) return res.status(500).json(err);
                res.json(country);
            });
        }
    })
}

exports.get = function (req, res, next) {
    let countryId = req.params.id;

    Country.findById({ _id: countryId }, (err, country) => {
        if (err) return res.status(500).json(err);
        if (!country) {
            return res.json({ err: "COUNTRY IS NOT FOUND!" });
        }
        res.json(country);
    })
}

exports.update = function (req, res, next) {
    let countryId = req.params.id;

    let param = {
        name: req.body.name,
    };

    Country.findById({ _id: countryId }, (err, country) => {
        if (err) return res.status(500).json(err);
        if (!country) {
            return res.json({ err: "COUNTRY IS NOT FOUND!" })
        }
        Country.findOne({ name: param.name }, (err, country) => {
            if (err) return res.status(500).json(err);
            if (country) {
                return res.json({ err: "NAME COUNTRY IS ALREADY EXISTS!" })
            }
            Country.update({ _id: countryId }, param, (err, data) => {
                if (err) return res.status(500).json(err);
                // res.json(data);
                getCountries(res);
            })
        })
    })
}

exports.remove = function (req, res, next) {
    let countryId = req.params.id;

    Country.findByIdAndRemove(countryId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })

}