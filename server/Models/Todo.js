const mongoose = require('mongoose');
const { stringify } = require('querystring');
const TodoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todo:{type:String , required:true},
});

module.exports = mongoose.model("Todo", TodoSchema);