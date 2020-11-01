const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');


process.env.NODE_ENV = 'development';

const app = express();
const config = (require('./webpack.config.js'))('development');
// const config = configFunc('development');
const compiler = webpack(config);


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true,
}));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});


