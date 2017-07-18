const mongoose = require('mongoose'),
	  util       = require('util'),
	  config     = require('./config'),
	  app        = require('./server-setup/express');

Promise = require('bluebird');
mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect(config.db);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.env === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log('mongodb report:')
    console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

app.disable('etag');

app.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.env})`);
});
