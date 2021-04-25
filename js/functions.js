module.exports = {
    nosubcmd    : ['00','01', '03', '04', '05', '06', '0C', '0D', '10', '11', '12', '29'],  // HEX VALUES NO BUFFER

    splitBuffer : function (buf, delimiter) {
        var arr = [], p = 0;

        for (var i = 0, l = buf.length; i < l; i++) {
            //console.log(buf[i]);
            if (buf[i] !== delimiter) continue;
            if (i === 0) {
                p = 1;
                continue; // skip if it's at the start of buffer
            }
            arr.push(buf.slice(p, i+1));
            p = i + 1;
        }

        // add final part
        if (p < l) {
            arr.push(buf.slice(p, l+1));
        }

        return arr;
    },
    extMultiMode : function (response = null) {
        var buff_hex = response.toString('hex');
        var buff_hex_array = buff_hex.match(/.{1,2}/g);

        return typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29";
    },
    extBand     : function (response = null) {
        var buff_hex = response.toString('hex');
        var buff_hex_array = buff_hex.match(/.{1,2}/g);

        if (typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29") {
            return buff_hex_array[5].toUpperCase();
        } else {
            return null;
        }
    },
    extCmd      : function (response = null) {
        var buff_hex = response.toString('hex');
        var buff_hex_array = buff_hex.match(/.{1,2}/g);

        if (typeof buff_hex_array[0] !== 'undefined' && buff_hex_array[0].toUpperCase() == "FE") {
            if (typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29") {
                return buff_hex_array[6].toUpperCase();
            } else {
                return buff_hex_array[4].toUpperCase();
            }
        } else {
            return null;
        }
    },
    extSubCmd   : function (cmd, response= null) {
        if (this.nosubcmd.indexOf(cmd) === -1) {
            // ##########################
            // # Has Subcmd
            // ##########################
            var buff_hex = response.toString('hex');
            var buff_hex_array = buff_hex.match(/.{1,2}/g);

            if (typeof buff_hex_array[0] !== 'undefined' && buff_hex_array[0].toUpperCase() == "FE") {
                if (typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29") {
                    return buff_hex_array[7].toUpperCase();
                } else {
                    return buff_hex_array[5].toUpperCase();
                }
            } else {
                return null;
            }

        } else {
            // ##########################
            // # Has no subcmd
            // ##########################
            return null;
        }
    },
    extData     : function (cmd, response = null) {
        let i = 1;

        var buff_hex = response.toString('hex');
        var buff_hex_array = buff_hex.match(/.{1,2}/g);
        var data_array = [];

        if (this.nosubcmd.indexOf(cmd) === -1) {
            // ##########################
            // # Has Sub Command
            // ##########################

            if (typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29") {
                buff_hex_array.forEach(function(element) {
                    if (i > 8 && i < response.length) {
                        data_array.push(element.toUpperCase());
                    }
                    i++;
                });
            } else {
                buff_hex_array.forEach(function(element) {
                    if (i > 6 && i < response.length) {
                        data_array.push(element.toUpperCase());
                    }
                    i++;
                });
            }


        } else {
            if (typeof buff_hex_array[4] !== 'undefined' && buff_hex_array[4].toUpperCase() == "29") {
                buff_hex_array.forEach(function(element) {
                    if (i > 6 && i < response.length) {
                        data_array.push(element.toUpperCase());
                    }
                    i++;
                });
            } else {
                buff_hex_array.forEach(function(element) {
                    if (i > 5 && i < response.length) {
                        data_array.push(element.toUpperCase());
                    }
                    i++;
                });
            }


        }

        return data_array;
    },
    extMsg      : function (response = null) {
        let i = 1;
        var buff_hex = response.toString('hex');
        var buff_hex_array = buff_hex.match(/.{1,2}/g);
        var data_array = [];

        buff_hex_array.forEach(function(element) {
            if (i === response.length) {
                data_array.push(element.toUpperCase());
            }
            i++;
        });

        return data_array;
    },
    hexToString : function (str = null) {
        if (str !== null) {
            const buf = new Buffer.from(str, 'hex');
            return buf.toString('utf8').trim();
        }
    },
    _get_band                   : function (data = null) {
        if (data !== null) {
            if (data == "00")   {
                return 0;
            } else {
                return 1;
            }
        }
    },
    _get_anl                    : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            } else {
                return 1;
            }
        }
    },
    _get_audio_level_synchronize    : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") :
                    return 0;
                case (data == "01") :
                    return 1;
                default:
                    break;
            }
        }
    },
    _get_afc                    : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") :
                    return 0;
                case (data == "01") :
                    return 1;
                default:
                    break;
            }
        }
    },
    _get_att                    : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") : return 0;  // OFF
                case (data == "15") : return 1;  // ATT1
                case (data == "30") : return 2;  // ATT2
                case (data == "45") : return 3;  // ATT3
                default:
                    break;
            }
        }
    },
    _get_vsc                    : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            }

            if (data == "01") {
                return 1;
            }
        }
    },
    _get_dup                    : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "10") : return 0;  // OFF
                case (data == "11") : return 1;  // DUP -
                case (data == "12") : return 2;  // DUP +
                default:
                    break;
            }
        }
    },
    _get_dsql                   : function (data = null) {
        // TODO : functions.js func._get_dsql
    },
    _get_display_type           : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == '00') : return 0;
                case (data == '01') : return 1;
            }
        }
    },
    _get_rec                    : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == '00') : return 0;
                case (data == '01') : return 1;
                case (data == '10' || data == '02') : return 2;
            }
        }
    },
    _get_wx                     : function (data = null) {
        // TODO : functions.js func._get_wx
    },
    _get_dtcs                   : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") : return 0;  // OFF
                case (data == "01") : return 1;  // DTCS
                case (data == "02") : return 2;  // DTCS-R
                default:
                    break;
            }
        }
    },
    _get_emr                    : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            }

            if (data == "01") {
                return 1;
            }
        }
    },
    _get_skip_mode              : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            }

            if (data == "01") {
                return 1;
            }

            if (data == "02" ) {
                return 2;
            }
        }
    },
    _get_tsql                   : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;           // Off
            }

            if (data == "01") {
                return 1;           // TSQL
            }

            if (data == "02" ) {
                return 2;           // TSQL-R
            }
        }
    },
    _get_freq                   : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            return JSON.stringify({
                0: (data[0].match(/.{1}/g)[0] !== null) ? data[0].match(/.{1}/g)[0] : 0,
                1: (data[0].match(/.{1}/g)[1] !== null) ? data[0].match(/.{1}/g)[1] : 0,
                2: (data[1].match(/.{1}/g)[0] !== null) ? data[1].match(/.{1}/g)[0] : 0,
                3: (data[1].match(/.{1}/g)[1] !== null) ? data[1].match(/.{1}/g)[1] : 0,
                4: (data[2].match(/.{1}/g)[0] !== null) ? data[2].match(/.{1}/g)[0] : 0,
                5: (data[2].match(/.{1}/g)[1] !== null) ? data[2].match(/.{1}/g)[1] : 0,
                6: (data[3].match(/.{1}/g)[0] !== null) ? data[3].match(/.{1}/g)[0] : 0,
                7: (data[3].match(/.{1}/g)[1] !== null) ? data[3].match(/.{1}/g)[1] : 0,
                8: (data[4].match(/.{1}/g)[0] !== null) ? data[4].match(/.{1}/g)[0] : 0,
                9: (data[4].match(/.{1}/g)[1] !== null) ? data[4].match(/.{1}/g)[1] : 0,
            });
        }
    },
    _get_rf_gain_level          : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            let audio = data[0] + data[1];
            switch (true) {
                case ((parseInt('0x'+audio) >= parseInt('0x0000')) && (parseInt('0x'+audio) <= parseInt('0x0025'))): return 1;
                case ((parseInt('0x'+audio) >= parseInt('0x0026')) && (parseInt('0x'+audio) <= parseInt('0x0051'))): return 2;
                case ((parseInt('0x'+audio) >= parseInt('0x0052')) && (parseInt('0x'+audio) <= parseInt('0x0076'))): return 3;
                case ((parseInt('0x'+audio) >= parseInt('0x0077')) && (parseInt('0x'+audio) <= parseInt('0x0102'))): return 4;
                case ((parseInt('0x'+audio) >= parseInt('0x0103')) && (parseInt('0x'+audio) <= parseInt('0x0127'))): return 5;
                case ((parseInt('0x'+audio) >= parseInt('0x0128')) && (parseInt('0x'+audio) <= parseInt('0x0153'))): return 6;
                case ((parseInt('0x'+audio) >= parseInt('0x0154')) && (parseInt('0x'+audio) <= parseInt('0x0178'))): return 7;
                case ((parseInt('0x'+audio) >= parseInt('0x0179')) && (parseInt('0x'+audio) <= parseInt('0x0204'))): return 8;
                case ((parseInt('0x'+audio) >= parseInt('0x0205')) && (parseInt('0x'+audio) <= parseInt('0x0229'))): return 9;
                case ((parseInt('0x'+audio) >= parseInt('0x0230')) && (parseInt('0x'+audio) <= parseInt('0x0255'))): return 10;
                default:
                    break;
            }
        }
    },
    _get_af_gain_level          : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            let audio = data[0] + data[1];
            switch (true) {
                case ((parseInt('0x'+audio) >= parseInt('0x0000')) && (parseInt('0x'+audio) <= parseInt('0x0006'))): return 0;
                case ((parseInt('0x'+audio) >= parseInt('0x0007')) && (parseInt('0x'+audio) <= parseInt('0x0012'))): return 1;
                case ((parseInt('0x'+audio) >= parseInt('0x0013')) && (parseInt('0x'+audio) <= parseInt('0x0019'))): return 2;
                case ((parseInt('0x'+audio) >= parseInt('0x0020')) && (parseInt('0x'+audio) <= parseInt('0x0025'))): return 3;
                case ((parseInt('0x'+audio) >= parseInt('0x0026')) && (parseInt('0x'+audio) <= parseInt('0x0031'))): return 4;
                case ((parseInt('0x'+audio) >= parseInt('0x0032')) && (parseInt('0x'+audio) <= parseInt('0x0037'))): return 5;
                case ((parseInt('0x'+audio) >= parseInt('0x0038')) && (parseInt('0x'+audio) <= parseInt('0x0044'))): return 6;
                case ((parseInt('0x'+audio) >= parseInt('0x0045')) && (parseInt('0x'+audio) <= parseInt('0x0050'))): return 7;
                case ((parseInt('0x'+audio) >= parseInt('0x0051')) && (parseInt('0x'+audio) <= parseInt('0x0057'))): return 8;
                case ((parseInt('0x'+audio) >= parseInt('0x0058')) && (parseInt('0x'+audio) <= parseInt('0x0063'))): return 9;
                case ((parseInt('0x'+audio) >= parseInt('0x0064')) && (parseInt('0x'+audio) <= parseInt('0x0069'))): return 10;
                case ((parseInt('0x'+audio) >= parseInt('0x0070')) && (parseInt('0x'+audio) <= parseInt('0x0076'))): return 11;
                case ((parseInt('0x'+audio) >= parseInt('0x0077')) && (parseInt('0x'+audio) <= parseInt('0x0082'))): return 12;
                case ((parseInt('0x'+audio) >= parseInt('0x0083')) && (parseInt('0x'+audio) <= parseInt('0x0089'))): return 13;
                case ((parseInt('0x'+audio) >= parseInt('0x0090')) && (parseInt('0x'+audio) <= parseInt('0x0095'))): return 14;
                case ((parseInt('0x'+audio) >= parseInt('0x0096')) && (parseInt('0x'+audio) <= parseInt('0x0101'))): return 15;
                case ((parseInt('0x'+audio) >= parseInt('0x0102')) && (parseInt('0x'+audio) <= parseInt('0x0108'))): return 16;
                case ((parseInt('0x'+audio) >= parseInt('0x0109')) && (parseInt('0x'+audio) <= parseInt('0x0114'))): return 17;
                case ((parseInt('0x'+audio) >= parseInt('0x0115')) && (parseInt('0x'+audio) <= parseInt('0x0121'))): return 18;
                case ((parseInt('0x'+audio) >= parseInt('0x0122')) && (parseInt('0x'+audio) <= parseInt('0x0127'))): return 19;
                case ((parseInt('0x'+audio) >= parseInt('0x0128')) && (parseInt('0x'+audio) <= parseInt('0x0133'))): return 20;
                case ((parseInt('0x'+audio) >= parseInt('0x0134')) && (parseInt('0x'+audio) <= parseInt('0x0140'))): return 21;
                case ((parseInt('0x'+audio) >= parseInt('0x0141')) && (parseInt('0x'+audio) <= parseInt('0x0146'))): return 22;
                case ((parseInt('0x'+audio) >= parseInt('0x0147')) && (parseInt('0x'+audio) <= parseInt('0x0153'))): return 23;
                case ((parseInt('0x'+audio) >= parseInt('0x0154')) && (parseInt('0x'+audio) <= parseInt('0x0159'))): return 24;
                case ((parseInt('0x'+audio) >= parseInt('0x0160')) && (parseInt('0x'+audio) <= parseInt('0x0165'))): return 25;
                case ((parseInt('0x'+audio) >= parseInt('0x0166')) && (parseInt('0x'+audio) <= parseInt('0x0172'))): return 26;
                case ((parseInt('0x'+audio) >= parseInt('0x0173')) && (parseInt('0x'+audio) <= parseInt('0x0178'))): return 27;
                case ((parseInt('0x'+audio) >= parseInt('0x0179')) && (parseInt('0x'+audio) <= parseInt('0x0185'))): return 28;
                case ((parseInt('0x'+audio) >= parseInt('0x0186')) && (parseInt('0x'+audio) <= parseInt('0x0191'))): return 29;
                case ((parseInt('0x'+audio) >= parseInt('0x0192')) && (parseInt('0x'+audio) <= parseInt('0x0197'))): return 30;
                case ((parseInt('0x'+audio) >= parseInt('0x0198')) && (parseInt('0x'+audio) <= parseInt('0x0204'))): return 31;
                case ((parseInt('0x'+audio) >= parseInt('0x0205')) && (parseInt('0x'+audio) <= parseInt('0x0210'))): return 32;
                case ((parseInt('0x'+audio) >= parseInt('0x0211')) && (parseInt('0x'+audio) <= parseInt('0x0217'))): return 33;
                case ((parseInt('0x'+audio) >= parseInt('0x0218')) && (parseInt('0x'+audio) <= parseInt('0x0223'))): return 34;
                case ((parseInt('0x'+audio) >= parseInt('0x0224')) && (parseInt('0x'+audio) <= parseInt('0x0229'))): return 35;
                case ((parseInt('0x'+audio) >= parseInt('0x0230')) && (parseInt('0x'+audio) <= parseInt('0x0236'))): return 36;
                case ((parseInt('0x'+audio) >= parseInt('0x0237')) && (parseInt('0x'+audio) <= parseInt('0x0242'))): return 37;
                case ((parseInt('0x'+audio) >= parseInt('0x0243')) && (parseInt('0x'+audio) <= parseInt('0x0249'))): return 38;
                case ((parseInt('0x'+audio) >= parseInt('0x0250')) && (parseInt('0x'+audio) <= parseInt('0x0255'))): return 39;
                default:
                    break;
            }
        }
    },
    _get_scan_type              : function (data = null) {
        // TODO : functions.js func._get_scan_type
    },
    _get_scan_condition         : function (data = null) {
        if (data !== null && (typeof data[1] !== "undefined" && data[1] !== "" && data[2] !== "")) {
            return JSON.stringify({
                0: {
                    scan             : (data[1] == "01" || data[1] == "02" || data[1] == "03" || data[1] == "04"),
                    scan_direction   : (data[1] == "01" || data[1] == "03") ? 'up' : 'down',
                },
                1: {
                    scan             : (data[2] == "01" || data[2] == "02" || data[2] == "03" || data[2] == "04"),
                    scan_direction   : (data[2] == "01" || data[2] == "03") ? 'up' : 'down',
                }
            });
        }
    },
    _get_squelch_status         : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            } else if (data == "01") {
                return 1;
            }
        }
    },
    _get_s_meter_lvl            : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            return parseInt(''+data[0] + data[1]);
        }
    },
    _get_squelch_level          : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            let audio = data[0] + data[1];

            switch (true) {
                case ((parseInt('0x' + audio) >= parseInt('0x0000')) && (parseInt('0x' + audio) <= parseInt('0x0023'))): return 0;
                case ((parseInt('0x' + audio) >= parseInt('0x0024')) && (parseInt('0x' + audio) <= parseInt('0x0046'))): return 1;
                case ((parseInt('0x' + audio) >= parseInt('0x0047')) && (parseInt('0x' + audio) <= parseInt('0x0069'))): return 2;
                case ((parseInt('0x' + audio) >= parseInt('0x0070')) && (parseInt('0x' + audio) <= parseInt('0x0093'))): return 3;
                case ((parseInt('0x' + audio) >= parseInt('0x0094')) && (parseInt('0x' + audio) <= parseInt('0x0116'))): return 4;
                case ((parseInt('0x' + audio) >= parseInt('0x0117')) && (parseInt('0x' + audio) <= parseInt('0x0139'))): return 5;
                case ((parseInt('0x' + audio) >= parseInt('0x0140')) && (parseInt('0x' + audio) <= parseInt('0x0162'))): return 6;
                case ((parseInt('0x' + audio) >= parseInt('0x0163')) && (parseInt('0x' + audio) <= parseInt('0x0186'))): return 7;
                case ((parseInt('0x' + audio) >= parseInt('0x0187')) && (parseInt('0x' + audio) <= parseInt('0x0209'))): return 8;
                case ((parseInt('0x' + audio) >= parseInt('0x0210')) && (parseInt('0x' + audio) <= parseInt('0x0232'))): return 9;
                case ((parseInt('0x' + audio) >= parseInt('0x0233')) && (parseInt('0x' + audio) <= parseInt('0x0255'))): return 10;
            }
        }
    },
    _get_operating_mode         : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") :
                    // VFO Mode
                    return 0;
                case (data == "01") :
                    // Memory Mode
                    return 1;
                case (data == "02") :
                    // WX Mode
                    return 2;
                default :
                    return false;
            }
        }
    },
    _get_receive_mode           : function (data = null) {
        if (data !== null && typeof data[0] !== 'undefined' && typeof data[1] !== 'undefined') {
            switch (true) {
                case (data[0] == "00" &&  data[1] == "01"): return 1;                                       //  "LSB"
                case (data[0] == "01" &&  data[1] == "01"): return 2;                                       //  "USB"
                case (
                    (data[0] == "02" &&  data[1] == "01") ||
                    (data[0] == "02" &&  (typeof data[1] == 'undefined' || data[1] == null))
                ):                                          return 3;                                       //  "AM"
                case (data[0] == "02" &&  data[1] == "02"): return 4;                                       //  "AM-N"
                case (data[0] == "03" &&  data[1] == "01"): return 5;                                       //  "CW"
                case (
                    (data[0] == "05" &&  data[1] == "01") ||
                    (data[0] == "05" &&  (typeof data[1] == 'undefined' || data[1] == null))
                ) :                                         return 6;                                       //  "FM"
                case (data[0] == "05" &&  data[1] == "02"): return 7;                                       //  "FM-N"
                case (data[0] == "06" &&  data[1] == "01"): return 8;                                       //  "WFM"
                case (data[0] == "07" &&  data[1] == "01"): return 9;                                       //  "CW-R"
                case (data[0] == "16" &&  data[1] == "01"): return 10;                                      //  "P25"
                case (data[0] == "17" &&  data[1] == "01"): return 11;                                      //  "D-STAR"
                case (data[0] == "18" &&  data[1] == "01"): return 12;                                      //  "dPMR"
                case (data[0] == "19" &&  data[1] == "01"): return 13;                                      //  "NXDN-VN"
                case (data[0] == "20" &&  data[1] == "01"): return 14;                                      //  "NXDN-N"
                case (data[0] == "21" &&  data[1] == "01"): return 15;                                      //  "DCR"
                default:
                    return "Unknown";

            }
        }
    },
    _get_display_content        : function (band = null, data = null) {
        if (data !== null) {
            let
                dual_band = false,
                main_band = null;

            // ##########################
            // # Band Mode
            // ##########################
            switch (true) {
                case (data[0] == "00") :
                    dual_band = false;
                    main_band = 0;
                    break;
                case (data[0] == "01") :
                    dual_band = false;
                    main_band = 1;
                    break;
                case (data[0] == "02") :
                    dual_band = true;
                    main_band = 0;
                    break;
                case (data[0] == "03") :
                    dual_band = true;
                    main_band = 1;
                    break;
            }

            let freq_mode = this._get_receive_mode([data[8],data[9]]);

            return JSON.stringify({
                "band"           : (band !== null) ? band : main_band,
                "dual_band"      : dual_band,
                "main_band"      : main_band,
                "receive_mode"   : freq_mode,
                "operation_mode" : this._get_operating_mode(data[1]),
                "freq"           : this._get_freq([data[2],data[3],data[4],data[5],data[6]]),
                "rf_gain"        : this._get_rf_gain_level([data[10],data[11]]),
                "att"            : this._get_att(data[12]),
                "dup"            : this._get_dup(data[13]),
                "wx"             : this._get_wx(data[14]),
                "rec"            : this._get_rec(data[15]),
                "afc"            : this._get_afc(data[16]),
                "skip_mode"      : this._get_skip_mode(data[17]),
                "mem_group_nr"   : data[18]+data[19],
                "mem_channel_nr" : data[20]+data[21],
                "mem_name"       : this.hexToString(data[22]+data[23]+data[24]+data[25]+data[26]+data[27]+data[28]+data[29]+data[30]+data[31]+data[32]+data[33]+data[34]+data[35]+data[36]+data[37]),
                "vsc"            : this._get_vsc(data[38]),
                "tsql"           : (freq_mode == 7 || freq_mode == 8 || freq_mode == 9)      ?   this._get_tsql(data[39])                    : null,
                "anl"            : (freq_mode == 3 || freq_mode == 4 || freq_mode == 5)      ?   this._get_anl(data[39])                     : null, // TODO : must be checked because of different modes
                "nb"             : (freq_mode == 1 || freq_mode == 6 || freq_mode == 11)     ?   this._get_noise_blanker_status(data[39])    : null,
                "dsql"           : (freq_mode == 13)                                         ?   this._get_dsql(data[39]) : null,
                "dtcs"           : (freq_mode == 7 || freq_mode == 8)                        ?   this._get_dtcs(data[39]) : null,
            });
        }
    },
    _get_memory_group_name      : function (data = null) {
        // TODO : functions.js func._get_memory_group_name
    },
    _get_noise_blanker_status   : function (data = null) {
        if (data !== null) {
            if (data == "00") {
                return 0;
            } else {
                return 1;
            }
        }
    },
    _get_tuning_step            : function (data = null) {
        if (data !== null) {
            switch (true) {
                case (data == "00") : return 0;
                case (data == "01") : return 1;
                case (data == "02") : return 2;
                case (data == "03") : return 3;
                case (data == "04") : return 4;
                case (data == "05") : return 5;
                case (data == "06") : return 6;
                case (data == "07") : return 7;
                case (data == "08") : return 8;
                case (data == "09") : return 9;
                case (data == "10") : return 10;
                case (data == "11") : return 11;
                case (data == "12") : return 12;
                case (data == "13") : return 13;
                case (data == "14") : return 14;
                case (data == "15") : return 15;
                case (data == "16") : return 16;
                case (data == "17") : return 17;
            }
        }
    }
}