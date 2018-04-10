'use strict'
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var Category = require('../models/Category')

function getCategories(res) {
    Category.find(function (err, category) {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(category);
        }
    })
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    Category.find((err, category) => {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(category);
        }
    })
}

exports.create = function (req, res, next) {
    let param = {
        name: req.body.name,
    };
    let category = new Category(param);

    Category.findOne({ name: req.body.name }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
            return res.json({ err: "NAME CATEGORY IS ALREADY EXISTS!" })
        }
        else {
            Category.create(category, (err, category) => {
                if (err) return res.status(500).json(err);
                res.json(category);
            });
        }
    })
}

exports.get = function (req, res, next) {
    let categoryId = req.params.id;

    Category.findById({ _id: categoryId }, (err, category) => {
        if (err) return res.status(500).json(err);
        if (!category) {
            return res.json({ err: "CATEGORY IS NOT FOUND!" });
        }
        res.json(category);
    })
}

exports.update = function (req, res, next) {
    let categoryId = req.params.id;

    let param = {
        name: req.body.name,
    };

    Category.findById({ _id: categoryId }, (err, category) => {
        if (err) return res.status(500).json(err);
        if (!category) {
            return res.json({ err: "CATEGORY IS NOT FOUND!" })
        }
        Category.findOne({ name: param.name }, (err, category) => {
            if (err) return res.status(500).json(err);
            if (category) {
                return res.json({ err: "NAME CATEGORY IS ALREADY EXISTS!" })
            }
            Category.update({ _id: categoryId }, param, (err, data) => {
                if (err) return res.status(500).json(err);
                getCategories(res);
            })
        })
    })
}

exports.remove = function (req, res, next) {
    let categoryId = req.params.id;

    Category.findByIdAndRemove(categoryId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })

}