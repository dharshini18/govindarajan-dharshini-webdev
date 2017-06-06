var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post('/api/user/:userId/website', createWebsite);
app.put ('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId',deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var website = req.body;
    website.created = new Date();
    website.accessed = new Date();
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req , res) {
    var userId = req.params['userId'];
    var website = req.body;
    website.developerId = userId;
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    website.accessed = new Date();
    websites.push(website);
    res.json(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllWebsitesForUser(req, res) {
    var results = [];
    for(var v in websites) {
        if(websites[v].developerId === req.params.userId) {
            websites[v].created = new Date();
            websites[v].accessed = new Date();
            results.push(websites[v]);
        }
    }
    res.json(results);
}
