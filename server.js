const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const path = require('path');

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json({ extended: false }));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'guids-generator.html'));
});

// routes
const files = require("./routes/files");
// use routes
app.use("/api", files);


// connect database
mongoose.Promise = global.Promise;
console.info('Connecting to mongoose %s.', config.mongoUri);
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('open', function() {
  console.log(`--Database name: ${mongoose.connection.db.databaseName} Connected Successfully`);
  // ***for development only ***
  mongoose.connection.db.dropDatabase(function(err, result){
    console.log(`! ${mongoose.connection.db.databaseName} database dropped.`);
  });
});

mongoose.connection.on('error', () => {
  console.error('--ERROR Connecting to mongoose');
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});
