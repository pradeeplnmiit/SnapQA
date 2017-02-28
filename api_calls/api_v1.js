/**
 * Created by OLA on 22/02/17.
 */

var Deal = require('../models/deals');
var jwt=require('jsonwebtoken');
var config = require('../config');


exports.newDeal = function (req, res) {
    var deal = new Deal();
    deal.clientName = req.body.clientName;
    deal.adminName = req.body.adminName;
    deal.enteredAt = req.body.enteredAt;
    deal.startDate = req.body.startDate;
    deal.endDate = req.body.endDate;
    deal.status = req.body.status;
    deal.result = req.body.result;
    deal.comments = req.body.comments;
    deal.turnOnForTutor = req.body.turnOnForTutor;
    deal.subject = req.body.subject;

    deal.save(function (err) {
        if(err) {
            res.json({
                message: 'Unsuccessful',
            });
            res.statusCode(422).send();
        }
        else {
            res.json({
                message: 'Successful',
                token: token
            });
            res.statusCode(201).send();
        }
    });

}

exports.viewDeal = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.param('Token');
    if(token){
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.value=decoded._doc;
                var user = req.value;
                Deal.find({subject: user.subject, active: true}, function (err, docs) {
                    res.json(docs);
                });

            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

exports.userProfile = function(req, res){
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.param('Token');
    if(token){
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.value=decoded._doc;
                var user = req.value;

            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
