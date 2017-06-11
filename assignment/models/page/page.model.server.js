var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var websiteModel = require('../website/website.model.server');
var pageModel = mongoose.model('PageModel',pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel.create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(websiteId, pageId)
        });
}