"use strict";

const SERVER_SETTINGS = require("./server.config.json");

process.env.NODE_ENV = SERVER_SETTINGS.apps[0].env.NODE_ENV;

const FS = require("fs");
const PATH = require("path");
const NET = require('net');
const HTTP = require("http");
const SPDY = require("spdy");
const EXPRESS = require("express");
const COOKIE_PARSER = require("cookie-parser");
const BODY_PARSER = require("body-parser");
const COMPRESSION = require("compression");
const RAVEN = require("raven");

RAVEN.config(
    SERVER_SETTINGS.apps[0][process.env.NODE_ENV].SENTRY.NODE
).install();

const MAX_AGE = 1000 * 60 * 60 * 24 * 365;

const APP = EXPRESS();

/**
 * Error handler
 */
APP.use(RAVEN.requestHandler());

/**
 * Compressing
 */
APP.use(COMPRESSION());

/**
 * Cookie processor
 */
APP.use(COOKIE_PARSER());

/**
 * Parsers for POST data
 */
APP.use(BODY_PARSER.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));

APP.use(BODY_PARSER.json({
  limit: "50mb"
}));

/**
 * Point static path to dist
 */
APP.use(
    EXPRESS.static(SERVER_SETTINGS.apps[0][process.env.NODE_ENV].STATIC, {
      etag: true,
      maxAge: MAX_AGE
    })
);

/**
 * Catch all other routes and return the index file
 */
APP.get("*", (req, res) => {
  res.sendFile(PATH.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
APP.set("port", SERVER_SETTINGS.apps[0][process.env.NODE_ENV].ROOT);

NET.createServer((conn) => {
  conn.once('data', (buf) => {
    const proxy = NET.createConnection(
        (buf[0] === 22) ? 7002 : 7001,
        () => {
          proxy.write(buf);
          conn.pipe(proxy).pipe(conn);
        }
    );
  });
}).listen(7000);

HTTP.createServer((req, res) => {
  var host = req.headers['host'];
  res.writeHead(301, {"Location": "https://" + host + req.url});
  res.end();
}).listen(7001);

SPDY.createServer({
  key: FS.readFileSync("ssl/server.key"),
  cert: FS.readFileSync("ssl/server.crt"),
}, APP).listen(7002);
