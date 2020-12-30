// ##########################
// # Request Handler
// ##########################


module.exports = {

    serial      : null,
    bluetooth   : null,

    init    : function (cmd = null, subcmd = null, data = null) {
        const color = require('chalk');
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

                if (Array.isArray(data)) {
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

                if (Array.isArray(data)) {
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
        if (this.bluetooth) {
            this.serial.write(Buffer.from(array)).then(() => console.log(color.cyanBright('[SERI] ') + array + ' successfully')).catch((err) => console.log('Error', err));
        } else {
            console.error(color.redBright('[CMD] ') + cmd +' - '+ subcmd +' - '+ data + ' failed');
        }
    },
};