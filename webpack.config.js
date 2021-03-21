"use strict";

let path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: __dirname + "/app",
    },
    watch: true,

    devtool: "source-map",

    module: {},
};
