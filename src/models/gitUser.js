const mongoose = require('../database/index');

const GitUserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        require: true,
        unique: true,
    },

    repos: {
        type: mongoose.Schema.Types.Array,
        ref: 'Repos'
    },

    image: {
        type: mongoose.Schema.Types.Object,
        require: true,
        ref: 'Image'
    },

});

const GitUser = mongoose.model('GitUser', GitUserSchema);

module.exports = GitUser;