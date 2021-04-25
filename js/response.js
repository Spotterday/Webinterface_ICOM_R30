// ##########################
// # Response Handler
// ##########################
module.exports = {
    responsetimestamp : function () {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    },
    init : function (multimode = false, cmd = null, subcmd = null, cmddata, banddata = null) {
        const func = require('./functions.js');
        let resultdata = null, band = null, raw = null;

        raw = cmddata;

        switch (true) {
            case (cmd == "00" || cmd == "03") :
                if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0) {
                    resultdata = func._get_freq(cmddata);
                } else {
                    resultdata = JSON.stringify({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0});
                }
            break;
            case (cmd == "01" || cmd == "04") :
                if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                    resultdata = func._get_receive_mode(cmddata);
                } else {
                    resultdata = null;
                }
            break;

            case (cmd == "0F") :
                resultdata = func._get_dup(cmddata[0]);
            break;
            case (cmd == "1A") :
                switch (true) {
                    case (subcmd == "00"):
                        resultdata = func._get_anl(cmddata[0]);
                    break;
                    case (subcmd == "02") :
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_receive_mode(cmddata);
                        } else {
                            resultdata = null;
                        }
                    break;
                    case (subcmd == "04") :
                        resultdata = func._get_operating_mode(cmddata);
                    break;
                    case (subcmd == "06") :
                        resultdata = func._get_audio_level_synchronize(cmddata);
                        break;
                    case (subcmd == "07") :
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_af_gain_level(cmddata);
                        } else {
                            resultdata = null;
                        }
                    break;
                    case (subcmd == "08"):
                        resultdata = func._get_skip_mode(cmddata);
                        break;
                    case (subcmd == "09"):
                        // Here nothing should came -1A 09 is only an execute command
                    break;
                    case (subcmd == "11") :
                        // Display Content
                        if (multimode == false) {
                            resultdata = func._get_display_content(null, cmddata);
                        } else {
                            band = func._get_band(banddata);
                            resultdata = func._get_display_content(band, cmddata);
                        }
                    break;
                    case (subcmd == "12") :
                        if (multimode == false) {
                            resultdata = JSON.stringify({
                                'squelch_status'    : func._get_squelch_status(cmddata[0]),
                                's_meter_lvl'       : func._get_s_meter_lvl([cmddata[1], cmddata[2]])
                            });
                        } else {
                            resultdata = JSON.stringify({
                                'band'              : (banddata == "00") ? 0 : 1,
                                'squelch_status'    : func._get_squelch_status(cmddata[0]),
                                's_meter_lvl'       : func._get_s_meter_lvl([cmddata[1], cmddata[2]])
                            });
                        }
                    break;
                    case (subcmd == "0F") :
                        resultdata = cmddata;
                    break;
                    case (subcmd == "0B") :
                        switch (true) {
                            case (cmddata[0] == "02") :
                                resultdata = func._get_scan_condition(cmddata);
                            break;
                        }
                    break;
                    case (cmd == "0C") :
                        resultdata = func._get_scan_type(cmddata[0]);
                        break;
                }
            break;
            case (cmd == "10") :
                resultdata = func._get_tuning_step(cmddata);
            break;
            case (cmd == "11") :
                resultdata = cmddata[0];
            break;
            case (cmd == "14") :
                switch (true) {
                    case (subcmd == "01"):
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_af_gain_level(cmddata);
                        } else {
                            resultdata = null;
                        }
                        break;
                    case (subcmd == "02"):
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_rf_gain_level(cmddata);
                        } else {
                            resultdata = null;
                        }
                    break;
                    case (subcmd == "03"):
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_squelch_level(cmddata);
                        } else {
                            resultdata = null;
                        }
                    break;
                }
                break;
            case (cmd == "15") :
                switch (true) {
                    case (subcmd == "01"):
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = func._get_squelch_status(cmddata);
                        } else {
                            resultdata = null;
                        }
                    break;
                    case (subcmd == "02"):
                        // Range from 0 to 99
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length >0 && cmddata[0] !== null && cmddata[1] !== null) {
                            resultdata = parseInt(cmddata[0] + cmddata[1]);
                        } else {
                            resultdata = null;
                        }
                    break;
                    case (subcmd == "05"):
                        if (typeof cmddata !== 'undefined' && cmddata !== null && cmddata.length > 0 && cmddata[0] !== null) {
                            resultdata = cmddata[0];
                        } else {
                            resultdata = null;
                        }
                    break;
                    default:

                    break;
                }
            break;
            case (cmd == "16") :
                switch (true) {
                    case (subcmd == "22"):
                        resultdata = func._get_noise_blanker_status(cmddata[0]);
                        break;
                    case (subcmd == "43"):
                        resultdata = func._get_tsql(cmddata[0]);
                        break;
                    case (subcmd == "4A"):
                        resultdata = func._get_afc(cmddata[0]);
                        break;
                    case (subcmd == "4B"):
                        resultdata = func._get_dtcs(cmddata[0]);
                        break;
                    case (subcmd == "4C"):
                        resultdata = func._get_vsc(cmddata[0]);
                        break;
                    case (subcmd == "52"):
                        resultdata = func._get_dsql(cmddata[0]);
                        break;
                    case (subcmd == "59"):
                        resultdata = func._get_display_type(cmddata[0]);
                    break;
                }
            break;

        }

        return JSON.stringify({'cmd': cmd, 'subcmd': subcmd , 'cmddata' : raw , 'cmdres': resultdata});
    },
};