#!/usr/bin/env node
// #################################################
// # Required Libraries
// # https://designswow.blogspot.com/p/reading-data-from-serial-port-with_15.html
// # https://stackoverflow.com/questions/54013159/nodejs-http-listen-interferes-with-serialport-reads
// # https://stackoverflow.com/questions/37545844/send-byte-0xff-with-node-js-through-serialport
// #################################################
/** Status Variables **/
let status_bluetooth = false;
let status_socket = false;

/** Library to get the current script path **/
const path          = require('path');
const basedir       = path.dirname(__filename);

// Change config directory, based on basedir
process.env.NODE_CONFIG_DIR = basedir + "/config/";

/** Library to get the current configuration **/
const config        = require('config');
/** Library to get the current os **/
const os            = require('os');
/** Library to get filesystem possibilities **/
const fs            = require('fs');
/** Library to get colorful shell output **/
const color         = require('chalk');
/** Library to get a websocket handling **/
const io            = require('socket.io');
/** Library to get web path handling **/
const express       = require('express');
/** Library to get serial port handling under windows **/
const SerialPort    = require("serialport");

const app           = express();

/** Library to get audio output from Linux **/
const AlsaCapture   = require("alsa-capture");
const audio         = new AlsaCapture({
    channels: 2,
    debug: true,
    device: "plughw:1,0",//"hw:1,0", //"default",//"plughw:1,0",
    format: "S16_LE",
    periodSize: 45,
    periodTime: undefined,
    rate: 44100,
});

/** Library to get a webserver **/
const server        = require('http').createServer(app);
/** Library to get a serial port handling under linux **/
const Bluetooth     = require('bluetooth-classic-serialport-client');
/** Library to get sqlite3 support for frequency manager **/
const sqlite3       = require('sqlite3').verbose();

/**
 *  ##########################################################
 *  ############## Do not change anything below ##############
 *  ##########################################################
 */

// https://github.com/meldron/node-alsa-capture

const req = require(basedir+'/js/client/request.js')
const res = require(basedir+'/js/client/response.js')
const fun = require(basedir+'/js/client/functions.js')
const sql = require(basedir+'/js/client/sql.js')

let Clients = [];

// ####################################################
// # Create Sql Connection
// ####################################################
sql.connect();

// ####################################################
// # Start Webserver
// ####################################################

server.listen(config.server.http.port, config.server.http.host, function () {

    console.info(color.blueBright('[INFO]') + ' Webserver running %d', config.server.http.port);
});

// ####################################################
// # Start Socket Server
// ####################################################

socketServer = io(server);
socketServer.on('connection', onSocketConnect);

// ####################################################
// # Say webserver where it finds his html files
// ####################################################

app.use(express.static(__dirname + '/public', {
    cacheControl: false,
    setHeaders: function(res) {
        res.setHeader("Cache-Control","max-age=0,must-revalidate");
    }
}));

console.info(color.blueBright('[INFO] ') + 'OS '+ os.platform());

// ####################################################
// # OS specific actions
// ####################################################
if (os.platform() === 'linux') {
    // ##########################
    // # Serial Linux Init
    // ##########################
    var serial = new Bluetooth();

    // ##########################
    // # Serial on Connect / Open Action
    // ##########################
    serial.connect(config.scanner.hwmac).then(function () {
            req.bluetooth = serial.isOpen;
            req.serial = serial;

            res.bluetooth = serial.isOpen;
            res.serial = serial;

            res.status_serial = true;
            res.status_bluetooth = true;

            console.info(color.blueBright('[INFO]') + ' Serial port ('+ config.server.devices.linux +') opened');

            onSerialConnect(socketServer);

    }).catch(function(err)
    {
        res.status_serial = false;
        res.status_bluetooth = false;

        console.error(color.redBright('[FAILED]') + ' Error: ', err)
    })
} else {
    // ##########################
    // # Serial Windows Init
    // ##########################
    const serial = new SerialPort(config.server.devices.win, {
        baudRate: config.scanner.serial.baudrate,
        dataBits: config.scanner.serial.databits,
        autoOpen: config.scanner.serial.autoopen,
        stopBits: config.scanner.serial.stopbits,
        parity:   config.scanner.serial.parity,
        lock:     config.scanner.serial.lock
    });

    // ##########################
    // # Serial on Open Actions
    // ##########################
    serial.on('open', function() {
        console.info(color.blueBright('[INFO]') + ' Serial port (Com4) opened');

        onSerialConnect(socketServer);
    });

    // ##########################
    // # Serial on Error Actions
    // ##########################
    serial.on('error', function(data) {
        req.status_serial = false;
        console.error(color.redBright('[FAILED]') + ' Error: ' + data);
    })

    // ##########################
    // # Serial on Close Action
    // ##########################
    serial.on('close', function() {
        res.status_bluetooth = false;
        req.status_serial = false;

        console.error(color.blueBright('[INFO]') + ' Serial port ('+ config.server.devices.win +') closed');
    })
}


function onSocketConnect(socket) {
    Clients.push(socket);

    console.info(color.yellowBright('[CONN]') + ' New Connection from : ' + socket.handshake.address);

    socket.emit('data', JSON.stringify({
        'statusbluetooth'   : res.status_bluetooth,
        'statusserial'      : res.status_serial,
        'statussocket'      : res.status_socket,
        'debug'             : 'Server listening on address : ' + socket.handshake.address,
        'versionweb'        : config.version.web,
        'versionserver'     : config.version.server,
        'debugweb'          : config.debug.web,
        'usa'               : config.scanner.usa
    }));

    // ##########################
    // # Socket Data Request
    // ##########################

    socket.on('execute', function(data){
        if (data !== null) {
            let obj = JSON.parse(data);

            req.init(obj.cmd, obj.subcmd, obj.data);
        }
    });

    socket.on('disconnect', function(){
        var i = Clients.indexOf(socket);

        console.log(color.yellowBright('[DISC] ') +'Disconnect : ', socket.handshake.address);

        delete Clients[i];
    });

    socket.on('close', function () {
        res.status_socket = false;

        socket.emit('data', JSON.stringify({
            'statusbluetooth'   : res.status_bluetooth,
            'statusserial'      : res.status_serial,
            'statussocket'      : res.status_socket,
            'debug'             : 'Server closed',
            'versionweb'        : config.version.web,
            'versionserver'     : config.version.server,
            'debugweb'          : config.debug.web,
            'usa'               : config.scanner.usa
        }));

        console.log(color.redBright('[INFO] ') +'Socket Server closed');
    });

    /**
     * https://github.com/meldron/node-alsa-capture
     * */
    audio.on("audio", (data) => {
        //console.log(data);
        //socket.emit('audio', data);
    });

    audio.on("close", () => {
        console.log("capture closed");
    });

    audio.on("error", (error) => {
        console.error(error);
    });
}
function onSerialConnect(socket) {
    serial.on('data', function(data) {
        var result = fun.splitBuffer(data,253); // 253 => fd

        result.forEach(function(hex, index, array)  {
            console.log(color.greenBright('[DATA]'), array[index].toString('hex').match(/.{1,2}/g).join(","))

            var cmd     = fun.extCmd(array[index]);
            var subcmd  = fun.extSubCmd(cmd, array[index]);
            var cmddata = fun.extData(cmd, array[index]);
            var cmdmsg  = fun.extMsg(array[index]);

            console.log(color.greenBright('[CONV]')+' CMD:' + cmd +' - SUB:'+ subcmd +' - DATA:'+ cmddata + ' - MSG:' + cmdmsg);

            // ##########################
            // # Serial Response Handler
            // ##########################
            var obj = JSON.parse(res.init(cmd, subcmd, cmddata));

            socket.emit('data', JSON.stringify({
                'statusbluetooth'  : res.status_bluetooth,
                'statusserial'     : res.status_serial,
                'statussocket'     : res.status_socket,
                'cmd'               : cmd.toString(16),
                'subcmd'            : (subcmd !== null)     ? subcmd.toString(16)   : null,
                'cmddata'           : (cmddata !== null)    ? cmddata.toString(16)  : null,
                'cmdres'            : obj.cmdres,
                'debug'             : (cmddata !== null)    ? cmddata.toString(16)  : null,
                'versionweb'        : config.version.web,
                'versionserver'     : config.version.server,
                'debugweb'          : config.debug.web,
                'usa'               : config.scanner.usa
            }));

        });
    });
}

function onProcessTerminate(){
    sql.disconnect();

    audio.close();

    server.close(() => {
        console.log(color.blueBright('[INFO]') + ' HTTPD terminated')
    })

    serial.close(() => {
        console.log(color.blueBright('[INFO]') + ' Serial terminated')
    })
}

process.on('exit',      function () {

});
process.on('SIGUSR1',   function () {
    onProcessTerminate();
});
process.on('SIGTERM',   function () {
    onProcessTerminate();
})
process.on('SIGINT',    function () {
    onProcessTerminate();
});





