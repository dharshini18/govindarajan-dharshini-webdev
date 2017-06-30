/*
var app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
app.post('/api/website/:websiteId/page',createPage);
app.get("/api/page/:pageId",findPageById);
app.put ('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId',deletePage);

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    pageModel.updatePage(pageId, page)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        },function (err) {
            res.send(err)
        });
}

function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    pageModel.createPage(websiteId, page)
        .then(function (page) {
            res.json(page)
        },function (err) {
            res.send(err)
        });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages)
        },function (err) {
            res.send(err)
        });
}



*/
