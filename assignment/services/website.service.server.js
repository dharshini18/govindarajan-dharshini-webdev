/*
var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post('/api/user/:userId/website', createWebsite);
app.put ('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId',deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];
    websiteModel.updateWebsite(websiteId, website)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        });
}

function createWebsite(req , res) {
    var userId = req.params['userId'];
    var website = req.body;
    websiteModel.createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website)
        },function (err) {
            res.send(err)
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website)
        },function (err) {
            res.send(err)
        });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites)
        });
}*/
