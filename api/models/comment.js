var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var CommentSchema   = new Schema({
    movie_id: Schema.Types.ObjectId,
    date: Date,
    author: String,
    text: String
});

CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentSchema);