const mongoose = require('mongoose');

mongoose.connect( "mongodb://localhost:27017/git-data", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
},
{
 useMongoClient: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;