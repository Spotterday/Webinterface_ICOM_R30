#!/usr/bin/env node
const sql = require('mysql2');
const config = require('config');
const os = require('os');
const fs = require('fs');
const color = require('chalk');
const io = require('socket.io');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

var Clients = [];

const fun = require('./js/server/functions.js');