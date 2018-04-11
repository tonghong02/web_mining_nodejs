'use strict'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');

var User = require('../models/User')

function getUsers(res) {
    User.find(function (err, user) {
        if (err) {
            if (err) return res.status(500).json(err);
        }
        else {
            res.json(user);
        }
    })
}

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// = = = = = = = = 
exports.getList = function (req, res, next) {
    let where = {};
    let filter = req.query;
    let address = req.query.address;
    let sex = req.query.sex;

    if (address) {
        where.address = address.toLowerCase();
    }
    if (sex) {
        where.sex = sex.toLowerCase();
    }
    if (where) {
        filter.where = where;
    }

    User.find(filter.where, (err, user) => {
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
        email: req.body.email,
        password: generateHash(req.body.password),
        username: req.body.username,
        address: req.body.address,
        name: req.body.name,
        sex: req.body.sex,
        birth: req.body.birth
    };
    let user = new User(param);

    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data) {
            return res.json({ err: "USERNAME IS ALREADY EXISTS!" })
        }
        else {
            User.create(user, (err, user) => {
                if (err) return res.status(500).json(err);
                res.json(user);
            });
        }
    })
}

exports.get = function (req, res, next) {
    let userId = req.params.id;

    User.findById({ _id: userId }, (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user) {
            return res.json({ err: "USER IS NOT FOUND!" });
        }
        res.json(user);
    })
}

exports.update = function (req, res, next) {
    let userId = req.params.id;

    let param = {
        email: req.body.email,
        password: generateHash(req.body.password),
        username: req.body.username,
        address: req.body.address,
        name: req.body.name,
        sex: req.body.sex,
        birth: req.body.birth
    };

    User.findById({ _id: userId }, (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user) {
            return res.json({ err: "USER IS NOT FOUND!" })
        }
        User.findOne({ username: param.username }, (err, user) => {
            if (err) return res.status(500).json(err);
            if (user) {
                return res.json({ err: "EMAIL IS ALREADY EXISTS!" })
            }
            User.update({ _id: userId }, param, (err, data) => {
                if (err) return res.status(500).json(err);
                getUsers(res);
            })
        })
    })
}

exports.remove = function (req, res, next) {
    let userId = req.params.id;

    User.findByIdAndRemove(userId, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    })

}