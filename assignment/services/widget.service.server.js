var app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Today we got <a href="http://io9.gizmodo.com/the-new-game-of-thrones-trailer-is-here-and-everyone-i-1795509917" target="_blank" rel="noopener">our first good look</a> at <em>Game of Thrones</em>’ seventh season, and boy howdy does it look like we’re in for some dark times ahead. But while the trailer is suitably cryptic, if you’ve been paying close attention to <a href="http://io9.gizmodo.com/everything-we-know-about-game-of-thrones-seventh-season-1788588295" target="_blank" rel="noopener">the rumors</a> surrounding this penultimate season, it paints an intriguing picture of the battles…<span class="read-more-placeholder"></span></p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/page/:pageId/widget',createWidget);
app.get("/api/widget/:widgetId",findWidgetById);
app.get("/api/widget/type/:widgetId",findWidgetType);
app.put ('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId',deleteWidget);

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetType(req, res) {
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w].widgetType);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function findAllWidgetsForPage(req, res) {
    var results = [];
    var pageId = req.params['pageId'];
    for(var w in widgets){
        if(widgets[w].pageId === pageId){
            results.push(widgets[w]);
        }
    }
    res.json(results);
}