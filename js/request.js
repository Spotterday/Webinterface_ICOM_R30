// ##########################
// # Request Handler
// ##########################


module.exports = {

    status_serial :     false,
    status_bluetooth:   false,
    status_socket:      false,

    init    : function (cmd = null, subcmd = null, data = null, serial = null) {
        const color = require('chalk');
        const os    = require('os');
        const config        = require('config');

        var array = [];

        switch(true) {
            case (subcmd === null && data === null) :
                array = ['0xFE', '0xFE', '0x9C', '0xE0'];

                if (Array.isArray(cmd)) {

                    cmd.forEach(function (element) {
                        array.push(element);
                    });

                    array.push('0xFD');
                } else {
                    array.push(cmd);
                }

                array.push('0xFD');
            break;
            case (subcmd === null && data !== null) :
                array = ['0xFE', '0xFE', '0x9C', '0xE0'];

                if (Array.isArray(cmd)) {
                    cmd.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(cmd);
                }

                if (data !== null && Array.isArray(data) && data.length > 0) {
                    data.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(data);
                }

                array.push('0xFD');
            break;
            case (subcmd !== null && data === null) :
                array = ['0xFE', '0xFE', '0x9C', '0xE0'];

                if (Array.isArray(cmd)) {
                    cmd.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(cmd);
                }

                if (Array.isArray(subcmd)) {
                    subcmd.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(subcmd);
                }

                array.push('0xFD');
            break;
            case (subcmd !== null && data !== null) :
                array = ['0xFE', '0xFE', '0x9C', '0xE0'];

                if (Array.isArray(cmd)) {
                    cmd.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(cmd);
                }

                if (Array.isArray(subcmd)) {
                    subcmd.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(subcmd);
                }

                if (data !== null && Array.isArray(data) && data.length > 0) {
                    data.forEach(function (element) {
                        array.push(element);
                    });
                } else {
                    array.push(data);
                }

                array.push('0xFD');
            break;
            default:
                array = [cmd, subcmd, data];
            break;
        }

        // array = ['0xFE', '0xFE', '0x9C', '0xE0', '0x1A', '0x0F', '0x00', '0x00', '0x16', '0x00', '0x17', '0x00', '0x18', '0x00', '0x19', '0x00', '0x20', '0x00', '0x21', '0x00', '0x22', '0x00', '0x21', '0x00', '0x22', '0x00', '0x23', '0x00', '0x24', '0x00', '0x25', '0x00', '0x26', '0x00', '0x27', '0x00', '0x28','0xFD'];
        if (os.platform() === 'linux') {
            serial.write(Buffer.from(array)).then(function () {
                if (config.debug.server === true) {
                    console.log(color.cyanBright('[SEND] ') + array);
                }
            }).catch(function (err)  {
                if (config.debug.server === true) {
                    console.log(color.redBright('[SEND] '+ err));
                }
            });
        } else {
            try {
                serial.write(Buffer.from(array), function(err) {
                    if (err) {
                        console.log(color.redBright('[SEND] '+ err.message));
                    }
                });
            } catch (e) {
                if (config.debug.server === true) {
                    console.log(color.redBright('[SEND] ' + e.message + ' - Please check your serial connection.'));
                }

                this.status_serial = false;
                this.status_bluetooth = false;
            }
            finally {
                if (config.debug.server === true) {
                    console.log(color.cyanBright('[SEND] ') + array);
                }
            }
        }
    }
};