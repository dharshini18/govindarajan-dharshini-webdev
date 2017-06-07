var app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "123", "name": "Post 1", "websiteId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Post 2", "websiteId": "123", "description": "Lorem" },
    { "_id": "987", "name": "Post 3", "websiteId": "123", "description": "Lorem" },
    { "_id": "098", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
    { "_id": "980", "name": "Post 2", "websiteId": "567", "description": "Lorem" }
];

app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
app.post('/api/website/:websiteId/page',createPage);
app.get("/api/page/:pageId",findPageById);
app.put ('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId',deletePage);

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var page = req.body;
    page.created = new Date();
    page.accessed = new Date();
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[w] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    page.created = new Date();
    page.accessed = new Date();
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
    var results = [];
    var websiteId = req.params['websiteId'];
    for(var p in pages){
        if(pages[p].websiteId === websiteId){
            pages[p].created = new Date();
            pages[p].accessed = new Date();
            results.push(pages[p]);
        }
    }
    res.json(results);
}



