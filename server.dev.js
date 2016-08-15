var config = require('./webpack.dev.config')
var path = require('path');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var compiler = webpack(config)

var app = new (require('express'))()
var port = 3000

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('*', function (req, res, next) {
    compiler.outputFileSystem.readFile('/index.html', function(err, content){
        if (err) {
            return next(err);
        }

        res.set('content-type','text/html');
        res.send(content);
        res.end();
    });
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})