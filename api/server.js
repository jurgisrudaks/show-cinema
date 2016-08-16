// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3001;
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema');
var Movie     = require('./models/movie');
var Comment     = require('./models/comment');
var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
    console.log('Something is happening.');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

apiRouter.route('/movies').get(function(req, res) {
    Movie.paginate({}, { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 10, sort: '-release_date' }, function(err, result) {
        if (err)
            res.send(err);
        res.json({
            results: result.docs,
            total: result.total,
            page: result.page,
            total_pages: result.pages
        });
    });
});

apiRouter.route('/movies/:movie_id').get(function(req, res) {
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err)
            res.send(err);
        res.json(movie);
    });
});

apiRouter.route('/movies/:movie_id/comments').get(function(req, res) {
    Comment.paginate({ movie_id: req.params.movie_id }, { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 10, sort: '-date' }, function(err, result) {
        if (err)
            res.send(err);
        res.json({
            results: result.docs,
            total: result.total,
            page: result.page,
            total_pages: result.pages
        });
    });
}).post(function(req, res) {

    console.log(req.body);

    var comment = new Comment({
        movie_id: req.params.movie_id,
        date: Date.now(),
        text: req.body.text,
        author: req.body.author
    })

    comment.save(function (err, comment) {
        if (err)
            console.log(err);
        res.json(comment);
    });
});

// REGISTER ROUTES
app.use('/api/1/', apiRouter);

// START SERVER
app.listen(port);
console.log('API Server running on port ' + port);
