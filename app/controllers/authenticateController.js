'use strict'
var mongoose = require('mongoose');
var express = require('express');
var _ = require('lodash');
var async = require('async');
var jwt = require('jsonwebtoken'); 
var app = express();

var User = require('../models/User');
var config = require('../../config/database.js');

app.set('superSecret', config.secret);

exports.login = function (req, res, next) {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else if (user) {
            if (!user.validPassword(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    sex: user.sex,
                    address: user.address,
                    birth: user.birth
                };
                    // expiresIn: 60 * 60 * 24 // 1 day
                var token = jwt.sign(payload, app.get('superSecret'));

                res.json({
                    success: true,
                    user: payload,
                    message: 'Enjoy your token!',
                    token: token,

                });
            }
        }
    });
}

exports.authenticate = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    var token = '';

    if (req.body.token || req.query.token || req.headers['x-access-token']) {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('superSecret'), (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                success: false,
                message: 'No token provided.'
            });
        }
    }
    else if (typeof bearerHeader !== 'undefined') {
        // form: Bearer token in headers authorization
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        var token = bearerToken;
        // decode token
        if (token) {
            jwt.verify(token, app.get('superSecret'), (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).json({
                success: false,
                message: 'No token provided.'
            });
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
