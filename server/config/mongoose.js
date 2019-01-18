const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const mongooseFindAndFilter = require('mongoose-find-and-filter');

const config = require('./config');

//addplugin
mongoose.plugin(mongooseFindAndFilter);

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

