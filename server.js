#!/usr/bin/env node



// #################################################
// # Required Libraries
// # https://designswow.blogspot.com/p/reading-data-from-serial-port-with_15.html
// # https://stackoverflow.com/questions/54013159/nodejs-http-listen-interferes-with-serialport-reads
// # https://stackoverflow.com/questions/37545844/send-byte-0xff-with-node-js-through-serialport
// #################################################

// Change config directory, based on basedir
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
/** Library to get the current configuration **/
const config        = require('config');
/** Library to get the current os **/
const os            = require('os');
/** Library to get filesystem possibilities **/
/** Library to get colorful shell output **/
const color         = require('chalk');
/** Library to get a websocket handling **/
const io            = require('socket.io');
/** Library to get web path handling **/
const express       = require('express');
/** Library to get serial port handling under windows **/
const app           = express();

/** Library to get audio output from Linux **/
//const AlsaCapture   = require("alsa-capture");
/*const audio         = new AlsaCapture({
    channels: 2,
    debug: true,
    device: "plughw:1,0",//"hw:1,0", //"default",//"plughw:1,0",
    format: "S16_LE",
    periodSize: 45,
    periodTime: undefined,
    rate: 44100,
});
*/
/** Library to get a webserver **/
const webserver        = require('http').createServer(app);

/** Library to get sqlite3 support for frequency manager **/
/**
 *  ##########################################################
 *  ############## Do not change anything below ##############
 *  ##########################################################
 */

// https://github.com/meldron/node-alsa-capture

const req = require('./js/request.js')
const res = require('./js/response.js')
const fun = require('./js/functions.js')
const sql = require('./js/sql.js')

let Clients = [];

console.info(color.blueBright('[INFO] ') + 'NODE_CONFIG_ENV: ' + config.util.getEnv('NODE_CONFIG_ENV'));
console.info(color.blueBright('[INFO] ') + 'NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));

// ####################################################
// # Create Sql Connection
// ####################################################
let server = {
    serial : null,
    socket : null,
    onSocketConnect : function () {
        if (server.socket !== null) {
            Clients.push(server.socket);

            console.info(color.yellowBright('[CONN]') + ' New Connection from : ' + server.socket.handshake.address);

            server.socket.emit('status', JSON.stringify({
                'statusbluetooth'   : req.status_bluetooth,
                'statusserial'      : req.status_serial,
                'statussocket'      : req.status_socket,
                'debug'             : 'Server listening on address : ' + server.socket.handshake.address,
                'versionweb'        : config.version.web,
                'versionserver'     : config.version.server,
                'debugweb'          : config.debug.web,
                'usa'               : config.scanner.usa,
                'serialbaudrate'    : config.scanner.serial.baudrate,
                'notifications'     : config.server.http.notifications
            }));

            // ##########################
            // # Socket Data Request
            // ##########################

            server.socket.on('execute', function(data){
                if (data !== null) {
                    let obj = JSON.parse(data);

                    req.init(obj.cmd, obj.subcmd, obj.data, server.serial);
                }
            });

            /**
             * Recieve SQL Commands
             */
            server.socket.on('execute_sql', function(data){
                if (data !== null) {
                    let obj = JSON.parse(data);

                    sql.execute(obj.call, obj.data);
                }
            });

            // ##########################
            // # Socket Status
            // ##########################

            server.socket.on('disconnect', function(){
                var i = Clients.indexOf(server.socket);

                console.log(color.yellowBright('[DISC] ') +'Disconnect : ', server.socket.handshake.address);

                delete Clients[i];
            });

            server.socket.on('close', function () {
                req.status_socket = false;

                server.socket.emit('status', JSON.stringify({
                    'statusbluetooth'   : req.status_bluetooth,
                    'statusserial'      : req.status_serial,
                    'statussocket'      : req.status_socket,
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
            /*
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
            */
        }
    },
    onSerialConnect : function () {
        if (server.serial !== null) {
            server.serial.on('data', function(data) {
                var result = fun.splitBuffer(data,253); // 253 => fd

                result.forEach(function(hex, index, array)  {

                    if (config.debug.server === true) {
                        console.log(color.greenBright('[RECI]'), array[index].toString('hex').match(/.{1,2}/g).join(","))
                    }

                    var multimode       = fun.extMultiMode(array[index]);
                    var band            = fun.extBand(array[index]);
                    var cmd             = fun.extCmd(array[index]);
                    var subcmd          = fun.extSubCmd(cmd, array[index]);
                    var cmddata         = fun.extData(cmd, array[index]);
                    var cmdmsg          = fun.extMsg(array[index]);

                    if (config.debug.server === true) {
                        console.log(color.magentaBright('[CONV]')+' CMD:' + cmd +' - SUB:'+ subcmd +' - DATA:'+ cmddata + ' - MSG:' + cmdmsg);
                    }

                    // ##########################
                    // # Serial Response Handler
                    // ##########################
                    var obj = JSON.parse(res.init(multimode, cmd, subcmd, cmddata, band));

                    if (server.socket !== null) {
                        server.socket.emit('status', JSON.stringify({
                            'statusbluetooth'  : req.status_bluetooth,
                            'statusserial'     : req.status_serial,
                            'statussocket'     : req.status_socket,
                            'debug'             : (cmddata !== null)    ? cmddata.toString(16)  : null,
                            'versionweb'        : config.version.web,
                            'versionserver'     : config.version.server,
                            'debugweb'          : config.debug.web,
                            'usa'               : config.scanner.usa,
                            'serialbaudrate'    : config.scanner.serial.baudrate,
                            'notifications'     : config.server.http.notifications
                        }));

                        server.socket.emit('data', JSON.stringify({
                            'cmd'               : (cmd !== null)        ? cmd.toString(16)   : null,
                            'subcmd'            : (subcmd !== null)     ? subcmd.toString(16)   : null,
                            'cmddata'           : (cmddata !== null)    ? cmddata.toString(16)  : null,
                            'cmdres'            : obj.cmdres,
                        }));
                    }

                });
            });
        }
    },
    onProcessTerminate : function () {
        if (typeof sql !== 'undefined') {
            sql.disconnect();
        }

        //audio.close();

        if (typeof server.socket !== 'undefined' && server.socket !== null) {
            server.socket.disconnect(function () {
                console.log(color.blueBright('[INFO]') + ' HTTPD terminated')
            });
        }

        if (typeof server.serial !== 'undefined' && server.serial !== null) {
            if (os.platform() === 'linux') {
                server.serial.close(function () {
                    console.log(color.blueBright('[INFO]') + ' Serial terminated')
                });
            } else {

            }
        }

        process.exit();
    },
    init : function () {
        if (sql.connect()) {
            sql.web.get();

            // ####################################################
            // # Start Webserver
            // ####################################################

            webserver.listen(config.server.http.port, config.server.http.host, function () {
                console.info(color.blueBright('[INFO]') + ' Webserver ' + config.server.http.host + ':' + config.server.http.port);
            });

            // ####################################################
            // # Start Socket Server
            // ####################################################

            socketServer = io(webserver);
            socketServer.on('connection', function (socket) {
                res.status_socket = true;
                server.socket = socket;
                server.onSocketConnect();
            });

            // ####################################################
            // # Say webserver where it finds his html files
            // ####################################################

            app.use(express.static(__dirname + '/public', {
                cacheControl: false,
                setHeaders: function (res) {
                    res.setHeader("Cache-Control", "max-age=0,must-revalidate");
                }
            }));

            console.info(color.blueBright('[INFO] ') + 'OS ' + os.platform());

            // ####################################################
            // # Serial Connect OS specific actions
            // ####################################################
            if (os.platform() === 'linux') {
                /** Library to get a serial port handling under linux **/
                const Bluetooth = require('bluetooth-classic-serialport-client');

                // ##########################
                // # Serial Linux Init
                // ##########################
                var serial = new Bluetooth();

                // ##########################
                // # Serial on Connect / Open Action
                // ##########################
                serial.connect(config.scanner.hwmac).then(function () {
                    req.status_serial = true;
                    req.status_bluetooth = true;

                    console.log(color.blueBright('[INFO]') + ' Serial port : ' + config.server.devices.linux);
                    console.log(color.blueBright('[INFO]') + ' Serial baud rate : ' + config.scanner.serial.baudrate);
                    console.log(color.blueBright('[INFO]') + ' Serial data bits : ' + config.scanner.serial.databits);
                    console.log(color.blueBright('[INFO]') + ' Serial stop bits : ' + config.scanner.serial.stopbits);

                    console.log(color.greenBright('-----------------------------------'));
                    console.log(color.greenBright('----------- App started -----------'));
                    console.log(color.greenBright('-----------------------------------'));

                    server.serial = serial;
                    server.onSerialConnect();

                }).catch(function (err) {
                    req.status_serial = false;
                    req.status_bluetooth = false;

                    console.error(color.redBright('[FAILED]') + ' Error: ', err)
                })
            } else {
                const SerialPort = require("serialport");

                // ##########################
                // # Serial Windows Init
                // ##########################
                const serial = new SerialPort(config.server.devices.win, {
                    baudRate: config.scanner.serial.baudrate,
                    dataBits: config.scanner.serial.databits,
                    autoOpen: config.scanner.serial.autoopen,
                    stopBits: config.scanner.serial.stopbits,
                    parity: config.scanner.serial.parity,
                    lock: config.scanner.serial.lock,
                });

                SerialPort.list().then(ports => {
                    console.log(color.yellowBright('--------- Available Ports ---------'));

                    ports.forEach(function(port) {
                        console.log(color.blueBright('[INFO] ') + port.path + ' - ' + port.pnpId + ' - ' + port.manufacturer);
                    });

                    console.log(color.yellowBright('-----------------------------------'));
                });

                // ##########################
                // # Serial on Open Actions
                // ##########################
                serial.on('open', function () {
                    req.status_serial = true;
                    req.status_bluetooth = true;

                    console.log(color.blueBright('[INFO]') + ' Serial port : ' + config.server.devices.win);
                    console.log(color.blueBright('[INFO]') + ' Serial baud rate : ' + config.scanner.serial.baudrate);
                    console.log(color.blueBright('[INFO]') + ' Serial data bits : ' + config.scanner.serial.databits);
                    console.log(color.blueBright('[INFO]') + ' Serial stop bits : ' + config.scanner.serial.stopbits);

                    console.log(color.greenBright('-----------------------------------'));
                    console.log(color.greenBright('----------- App started -----------'));
                    console.log(color.greenBright('-----------------------------------'));

                    server.serial = serial;
                    server.onSerialConnect();
                });

                // ##########################
                // # Serial on Error Actions
                // ##########################
                serial.on('error', function (data) {
                    req.status_serial = false;
                    req.status_bluetooth = false;
                    console.log(color.redBright('[FAILED] ') + data);
                })

                // ##########################
                // # Serial on Close Action
                // ##########################
                serial.on('close', function () {
                    req.status_bluetooth = false;
                    req.status_serial = false;

                    console.log(color.blueBright('[INFO]') + ' Serial port (' + config.server.devices.win + ') closed');
                })
            }
        }
    }
};

server.init();


process.on('exit',      function () {
    //onProcessTerminate();
});
process.on('SIGUSR1',   function () {
    server.onProcessTerminate();
});
process.on('SIGTERM',   function () {
    server.onProcessTerminate();
})
process.on('SIGINT',    function () {
    server.onProcessTerminate();
});





