/*
var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/page/:pageId/widget',createWidget);
app.get("/api/widget/:widgetId",findWidgetById);
app.get("/api/widget/type/:widgetId",findWidgetType);
app.put ('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId',deleteWidget);

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var widget = {};
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var callFrom = req.body.callFrom;

    widget.name = req.body.name;
    widget.text = req.body.text;
    widget.width = width;
    widget.type = req.body.widgetType;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget.url = '/assignment/upload/' + filename;

    if(callFrom === "new"){
        widgetModel
            .createWidget(pageId, widget)
            .then(function () {
                var callbackUrl = "/assignment/index.html#!/website/" +websiteId+ "/page/" +pageId+ "/widget";
                res.redirect(callbackUrl);
            });
    }

    if(callFrom === "edit"){
        widgetId = req.body.widgetId;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function () {
                var callbackUrl = "/assignment/index.html#!/website/" +websiteId+ "/page/" +pageId+ "/widget";
                res.redirect(callbackUrl);
            })
    }
}

function getWidgetById(widgetId) {
    return widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            return widget;
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    return widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    return widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err)
        })
}

function findWidgetType(req, res) {
    var widgetId = req.params['widgetId'];
    return widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget.type)
        },function (err) {
            res.send(err)
        })
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    return widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget)
        },function (err) {
            res.send(err)
        });
}

function createWidget(req, res) {
    console.log("Into Create");
    var pageId = req.params['pageId'];
    var widget = req.body;
    return widgetModel.createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget)
        },function (err) {
            res.send(err)
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    return widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets)
        },function (err) {
            res.send(err)
        });
}*/
