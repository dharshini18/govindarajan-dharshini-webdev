var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "PageModel"},
    type: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "widget"});

module.exports = widgetSchema;