var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var MovieSchema   = new Schema({
    poster_path: String,
    adult: Boolean,
    overview: String,
    release_date: Date,
    genre_ids: Array,
    original_title: String,
    original_language: String,
    title: String,
    backdrop_path: String,
    popularity: Number,
    vote_count: Number,
    video: Boolean,
    vote_average: Number
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', MovieSchema);