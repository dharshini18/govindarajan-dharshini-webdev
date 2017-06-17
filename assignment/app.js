
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer1-2017');
mongoose.Promise = require('q').Promise;*/


console.log('server side app');
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
require('../test/app');