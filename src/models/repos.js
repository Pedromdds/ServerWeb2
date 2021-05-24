const  mongoose  = require('../database/index');

const ReposSchema = new mongoose.Schema({

    repositories: [String],

});

const Repos = mongoose.model('Repos', ReposSchema);

module.exports = Repos;