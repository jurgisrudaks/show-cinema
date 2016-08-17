var express = require('express');
var path = require('path');
var app = express();

var port = 3000;

app.use(express.static("dist"));

app.get(["/explore", "/movie/*"], (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.get("/", (req, res) => {
    res.redirect('/explore');
});

app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.redirect('/explore');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
})
