let request = {
    set : {
        on :                        function () {

        },
        off :                       function () {

        },
        up :                        function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x03', 'data': '0x01', 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'Up.');

            return true;
        },
        down :                      function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x03', 'data': '0x00', 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'Down.');

            return true;
        },
        band :                      function () {
            if (r30.value.main_band == constant.BAND_A) {

                queue.add(JSON.stringify({'cmd':['0x07'], 'subcmd': '0xD1', 'data': null, 'timestamp' : r30.timestamp()}));

                r30.msg(false, 'Switch Band to B initiated.');

                if (settings[constant.BAND_B].scan === false) {
                    r30.value.main_band = constant.BAND_B;
                }

            } else {

                queue.add(JSON.stringify({'cmd':['0x07'], 'subcmd': '0xD0', 'data': null, 'timestamp' : r30.timestamp()}));

                r30.msg(false, 'Switch Band to A initiated.');

                if (settings[constant.BAND_A].scan === false) {
                    r30.value.main_band = constant.BAND_A;
                }

            }

            return true;
        },
        single_band_mode :          function () {
            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': '0x00', 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'Single Band mode initiated.');

            return true;
        },
        dual_band_mode :            function () {
            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': '0x01', 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'Dual Band mode initiated.');

            return true;
        },
        frequency :                 function () {
            let freq1, freq2, freq3, freq4, freq5, freq6, freq7, freq8, freq9, freq10;

            if (r30.value.main_band == constant.BAND_A) {
                freq1 = r30.sel.R_A_FREQ_1.val().toString(16);
                freq2 = r30.sel.R_A_FREQ_2.val().toString(16);
                freq3 = r30.sel.R_A_FREQ_3.val().toString(16);
                freq4 = r30.sel.R_A_FREQ_4.val().toString(16);
                freq5 = r30.sel.R_A_FREQ_5.val().toString(16);
                freq6 = r30.sel.R_A_FREQ_6.val().toString(16);
                freq7 = r30.sel.R_A_FREQ_7.val().toString(16);
                freq8 = r30.sel.R_A_FREQ_8.val().toString(16);
                freq9 = r30.sel.R_A_FREQ_9.val().toString(16);
                freq10 = r30.sel.R_A_FREQ_10.val().toString(16);
            } else {
                freq1 = r30.sel.R_B_FREQ_1.val().toString(16);
                freq2 = r30.sel.R_B_FREQ_2.val().toString(16);
                freq3 = r30.sel.R_B_FREQ_3.val().toString(16);
                freq4 = r30.sel.R_B_FREQ_4.val().toString(16);
                freq5 = r30.sel.R_B_FREQ_5.val().toString(16);
                freq6 = r30.sel.R_B_FREQ_6.val().toString(16);
                freq7 = r30.sel.R_B_FREQ_7.val().toString(16);
                freq8 = r30.sel.R_B_FREQ_8.val().toString(16);
                freq9 = r30.sel.R_B_FREQ_9.val().toString(16);
                freq10 = r30.sel.R_B_FREQ_10.val().toString(16);
            }

            // operation_mode = VFO
            if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {

                if (r30.value.main_band == constant.BAND_A) {
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x02', 'data': ["0x" +freq9+freq10, "0x" +freq7+freq8, "0x" +freq5+freq6, "0x" +freq3+freq4, "0x" +freq1+freq2], 'timestamp' : r30.timestamp()}));

                    r30.msg(false, 'Frequency ['+freq1+'.'+freq2+freq3+freq4+'.'+freq5+freq6+freq7+'.'+freq8+freq9+freq10+'] was set.');

                } else {
                    // TODO : add Band B Check for Freq <= 108  MHZ not possible
                    // TODO : check also usa or Eu device
                    //console.log(parseInt(freq2+freq3+freq4));
                    if (parseInt(freq1+freq2+freq3+freq4) >= 108 && parseInt(freq1+freq2+freq3+freq4) <= 520) {
                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x02', 'data': ["0x" +freq9+freq10, "0x" +freq7+freq8, "0x" +freq5+freq6, "0x" +freq3+freq4, "0x" +freq1+freq2], 'timestamp' : r30.timestamp()}));

                        r30.msg(false, 'Frequency ['+freq1+'.'+freq2+freq3+freq4+'.'+freq5+freq6+freq7+'.'+freq8+freq9+freq10+'] was set.');
                    } else {
                        // TODO : request last frequency to update input fields
                        request.get.display_content(true);
                        r30.msg(true, 'Frequency ['+freq1+'.'+freq2+freq3+freq4+'.'+freq5+freq6+freq7+'.'+freq8+freq9+freq10+'] could not be set [Band Limit].');
                    }
                }


            }

            return true;
        },
        scan_start :                function (scan_option = null) {
            if (scan_option !== null) {
                // TODO : Missing Group number / and scan type
                // #################################################
                // # VFO
                // #################################################
                if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {
                    switch (true) {
                        case (scan_option == 'AL') :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x00'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option == 'BA') :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x01'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option == 'TO') :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x10'], 'timestamp' : r30.timestamp()}));
                            break;
                    }
                }

                // #################################################
                // # MEMORY
                // #################################################
                if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.MEM) {
                    switch (true) {
                        case (scan_option.includes("AL")) :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x04'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option.includes("MO")) :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x05'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option.includes("NS")) :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x06'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option.includes("GL")) :
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x07'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (scan_option.includes("MB")) :
                            let bank = scan_option.substring(3);
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x00'], 'data': ['0x00','0x08','0x00','0x'+bank], 'timestamp' : r30.timestamp()}));
                            break;

                    }
                }
            }

            return true;
        },
        scan_stop :                 function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x01'], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        recording :                 function (band = null) {
            if (settings[band].rec == false) {
                settings[band].rec = true;

                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x09'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
            } else {
                settings[band].rec = false;

                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x09'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
            }

            return true;
        },
        af_gain_level :             function (af_level = null) {
            let level_raw = {
                0 :  ['0x00','0x00'],
                1 :  ['0x00','0x07'],
                2 :  ['0x00','0x13'],
                3 :  ['0x00','0x20'],
                4 :  ['0x00','0x26'],
                5 :  ['0x00','0x32'],
                6 :  ['0x00','0x38'],
                7 :  ['0x00','0x45'],
                8 :  ['0x00','0x51'],
                9 :  ['0x00','0x58'],
                10 : ['0x00','0x64'],
                11 : ['0x00','0x70'],
                12 : ['0x00','0x77'],
                13 : ['0x00','0x83'],
                14 : ['0x00','0x90'],
                15 : ['0x00','0x96'],
                16 : ['0x01','0x02'],
                17 : ['0x01','0x09'],
                18 : ['0x01','0x15'],
                19 : ['0x01','0x22'],
                20 : ['0x01','0x28'],
                21 : ['0x01','0x34'],
                22 : ['0x01','0x41'],
                23 : ['0x01','0x47'],
                24 : ['0x01','0x54'],
                25 : ['0x01','0x60'],
                26 : ['0x01','0x66'],
                27 : ['0x01','0x73'],
                28 : ['0x01','0x79'],
                29 : ['0x01','0x86'],
                30 : ['0x01','0x92'],
                31 : ['0x01','0x98'],
                32 : ['0x02','0x05'],
                33 : ['0x02','0x11'],
                34 : ['0x02','0x18'],
                35 : ['0x02','0x24'],
                36 : ['0x02','0x30'],
                37 : ['0x02','0x37'],
                38 : ['0x02','0x43'],
                39 : ['0x02','0x50']
            };

            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x01', 'data': level_raw[af_level], 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'AF Gain was set to '+af_level+' for band '+ ((r30.value.main_band == constant.BAND_A) ? 'A' : 'B'));

            return true;
        },
        rf_gain_level :             function (rf_level = null) {
            let rf_raw = {
                1 :  ['0x00','0x07'],
                2 :  ['0x00','0x26'],
                3 :  ['0x00','0x52'],
                4 :  ['0x00','0x77'],
                5 :  ['0x01','0x03'],
                6 :  ['0x01','0x28'],
                7 :  ['0x01','0x54'],
                8 :  ['0x01','0x79'],
                9 :  ['0x02','0x05'],
                10 : ['0x02','0x30']
            };

            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x02', 'data': rf_raw[rf_level], 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'RF Gain was set to '+rf_level+' for band '+ ((r30.value.main_band == constant.BAND_A) ? 'A' : 'B'));

            return true;
        },
        squelch_level :             function (squelch_level = null, squelch_label = null) {
            let squelch_raw = {
                0 :  ['0x00','0x00'],
                1 :  ['0x00','0x24'],
                2 :  ['0x00','0x47'],
                3 :  ['0x00','0x70'],
                4 :  ['0x00','0x94'],
                5 :  ['0x01','0x17'],
                6 :  ['0x01','0x40'],
                7 :  ['0x01','0x63'],
                8 :  ['0x01','0x87'],
                9 :  ['0x02','0x10'],
                10 : ['0x02','0x33']
            };

            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x03', 'data': squelch_raw[squelch_level], 'timestamp' : r30.timestamp()}));

            r30.msg(false, 'Squelch was set to '+squelch_label[squelch_level]+' for band '+ ((r30.value.main_band == constant.BAND_A) ? 'A' : 'B'));

            return true;
        },
        noise_blanker_status :      function () {
            if (
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.FM ||
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.CW ||
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.LSB
            ) {
                if (settings[r30.value.main_band].noise_blanker !== null) {
                    if (settings[r30.value.main_band].noise_blanker == constant.NOISE_BLANKER.ON) {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x00', 'timestamp' : r30.timestamp()}));
                        settings[r30.value.main_band].noise_blanker = constant.NOISE_BLANKER.OFF;
                    } else {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                        settings[r30.value.main_band].noise_blanker = constant.NOISE_BLANKER.ON;
                    }
                } else {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                    settings[r30.value.main_band].noise_blanker = constant.NOISE_BLANKER.ON;
                }
            } else {
                r30.msg(true, "Noise Blanker [NB] only in CW and LSB usable.");
            }

            return true;
        },
        receive_mode :              function (receive_mode = null) {
            if (receive_mode !== null) {
                switch (true) {
                    case (receive_mode == constant.RECEIVE_MODE.LSB) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x00','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [LSB] set.');
                        break; // LSB
                    case (receive_mode == constant.RECEIVE_MODE.USB) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x01','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [USB] set.');
                        break; // USB
                    case (receive_mode == constant.RECEIVE_MODE.AM) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x02','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [AM] set.');
                        break; // AM
                    case (receive_mode == constant.RECEIVE_MODE.AM_N) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x02','0x02'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [AM-N] set.');
                        break; // AM-N
                    case (receive_mode == constant.RECEIVE_MODE.CW) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x03','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [CW] set.');
                        break; // CW
                    case (receive_mode == constant.RECEIVE_MODE.FM) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x05','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [FM] set.');
                        break; // FM
                    case (receive_mode == constant.RECEIVE_MODE.FM_N) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x05','0x02'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [FM-N] set.');
                        break; // FM-N
                    case (receive_mode == constant.RECEIVE_MODE.WFM) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x06','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [WFM] set.');
                        break; // WFM
                    case (receive_mode == constant.RECEIVE_MODE.CW_R) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x07','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [CW-R] set.');
                        break; // CW-R
                    case (receive_mode == constant.RECEIVE_MODE.P25) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x16','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [P25] set.');
                        break; // P25
                    case (receive_mode == constant.RECEIVE_MODE.D_STAR) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x17','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [D-STAR] set.');
                        break; // D-STAR
                    case (receive_mode == constant.RECEIVE_MODE.DPMR) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x18','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [dPMR] set.');
                        break; // dPMR
                    case (receive_mode == constant.RECEIVE_MODE.NXDN_VN) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x19','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [NXDN-VN] set.');
                        break; // NXDN-VN
                    case (receive_mode == constant.RECEIVE_MODE.NXDN_N) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x20','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [NXDN-N] set.');
                        break; // NXDN-N
                    case (receive_mode == constant.RECEIVE_MODE.DCR) :
                        queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x21','0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Receive Mode [DCR] set.');
                        break; // DCR
                }

            }

            return true;
        },
        tuning_step :               function (tuning_step = null) {
            if (tuning_step !== null) {
                queue.add(JSON.stringify({'cmd':['0x10'], 'subcmd': null, 'data': ['0x' + tuning_step], 'timestamp' : r30.timestamp()}));
            }

            return true;
        },
        att :                       function (attenuator = null) {
            if (attenuator !== null) {
                settings[r30.value.main_band].att = attenuator;
                queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x' + attenuator], 'timestamp' : r30.timestamp()}));
            } else {
                switch (true) {
                    case (settings[r30.value.main_band].att == constant.ATT.OFF) :
                        settings[r30.value.main_band].att = constant.ATT.ATT1;
                        queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x15'], 'timestamp' : r30.timestamp()}));
                        break;
                    case (settings[r30.value.main_band].att == constant.ATT.ATT1) :
                        settings[r30.value.main_band].att = constant.ATT.ATT2;
                        queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x30'], 'timestamp' : r30.timestamp()}));
                        break;
                    case (settings[r30.value.main_band].att == constant.ATT.ATT2) :
                        settings[r30.value.main_band].att = constant.ATT.ATT3;
                        queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x45'], 'timestamp' : r30.timestamp()}));
                        break;
                    case (settings[r30.value.main_band].att == constant.ATT.ATT3) :
                        settings[r30.value.main_band].att = constant.ATT.OFF;
                        queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                        break;
                }
            }

            return true;
        },
        vsc :                       function () {
            if (
                (settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.FM) ||
                (settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.FM_N) ||
                (settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.WFM) ||
                (settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.AM) ||
                (settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.AM_N)
            ) {
                if (settings[r30.value.main_band].vsc == constant.VSC.OFF) {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4C'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                    r30.msg(false, 'VSC [ON] initiated.');
                } else {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4C'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                    r30.msg(false, 'VSC [OFF] initiated.');
                }
            } else {
                r30.msg(true, 'VSC only for [FM, FM-N, WFM, AM and AM-N].');
            }

            return true;
        },
        tsql :                      function (tsql_status = null) {
            if (tsql_status !== null) {
                queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x43'], 'data': ['0x' + tsql_status], 'timestamp' : r30.timestamp()}));
            }

            return true;
        },
        afc :                       function (afc_status = null) {
            if (
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.FM ||
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.FM_N ||
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.WFM
            ) {
                if (afc_status !== null) {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x' + afc_status], 'timestamp' : r30.timestamp()}));
                } else {
                    if (settings[r30.value.main_band].afc == constant.AFC.OFF) {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
                    } else {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                    }
                }
            } else {
                r30.msg(true, 'Automatic Frequency Control [AFC] only in FM , FM-N or WFM usable.');
            }

            return true;
        },
        anl :                       function (anl_status = null) {
            if (
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.AM ||
                settings[r30.value.main_band].receive_mode == constant.RECEIVE_MODE.AM_N
            ) {
                if (anl_status !== null) {
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x0' + anl_status], 'timestamp' : r30.timestamp()}));
                    settings[r30.value.main_band].anl = anl_status;
                } else {
                    if (settings[r30.value.main_band].anl == constant.ANL.OFF) {
                        settings[r30.value.main_band].anl = constant.ANL.ON;
                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Automatic Noise Limiter [ANL] enabled.');
                    } else {
                        settings[r30.value.main_band].anl = constant.ANL.OFF;
                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                        r30.msg(false, 'Automatic Noise Limiter [ANL] disabled.');
                    }
                }
            } else {
                r30.msg(true, 'Automatic Noise Limiter [ANL] only in AM or AM-N usable.');
            }

            return true;
        },
        dup :                       function (duplex_status = null) {
            // TODO : set_dup
            if (duplex_status !== null) {
                queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x1'+ duplex_status], 'data': null, 'timestamp' : r30.timestamp()}));
            } else {
                if (settings[r30.value.main_band].dup == constant.DUP.OFF) {
                    queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                }

                if (settings[r30.value.main_band].dup == constant.DUP.DUP_MIN) {
                    queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x12'], 'data': null, 'timestamp' : r30.timestamp()}));
                }

                if (settings[r30.value.main_band].dup == constant.DUP.DUP_PLU) {
                    queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x10'], 'data': null, 'timestamp' : r30.timestamp()}));
                }
            }

            return true;
        },
        memory_group :              function (group_nr = null) {
            function minTwoDigits(n) {
                return (n < 10 ? '0' : '') + n;
            }
            // TODO : Missing Auto Memory und Skip Ch
            queue.add(JSON.stringify({'cmd':['0x08'], 'subcmd': ['0xA0','0x00','0x'+minTwoDigits(group_nr)], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        channel :                   function (channel_nr = null) {
            function minTwoDigits(n) {
                return (n < 10 ? '0' : '') + n;
            }
            // TODO : Missing Auto Memory und Skip Ch
            queue.add(JSON.stringify({'cmd':['0x08'], 'subcmd': ['0x00','0x'+minTwoDigits(channel_nr)], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        skip_mode :                 function (pskip = false) {
            if (pskip == false) {
                // Send Temporary Skip
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                r30.msg(false, 'T-SKIP was set.');
            } else {
                // Send Permanent Skip
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                r30.msg(false, 'P-SKIP was set.');
            }

            return true;
        },
        operating_mode :            function (band = null, operation_mode = null) {
            if (band !== null) {
                if (operation_mode !== null) {
                    settings[band].operation_mode = operation_mode;
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x0'+operation_mode], 'timestamp' : r30.timestamp()}));
                } else {
                    if (settings[band].operation_mode == constant.OPERATION_MODE.VFO) {
                        // Switch from VFO to Memory Mode
                        settings[band].operation_mode = constant.OPERATION_MODE.MEM;

                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                        return true;
                    }

                    if (settings[band].operation_mode == constant.OPERATION_MODE.MEM) {
                        // Switch to Memory to WX or VFO
                        if (r30.value.usa == true) {
                            settings[band].operation_mode = constant.OPERATION_MODE.WX;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                            return true;
                        } else {
                            settings[band].operation_mode = constant.OPERATION_MODE.VFO;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                            return true;
                        }
                    }

                    if (settings[band].operation_mode == constant.OPERATION_MODE.WX) {
                        // Switch to WX to VFO
                        settings[band].operation_mode = constant.OPERATION_MODE.VFO;

                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                        return true;
                    }
                }
            } else {
                if (operation_mode !== null) {
                    settings[r30.value.main_band].operation_mode = operation_mode;

                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x0'+operation_mode], 'timestamp' : r30.timestamp()}));

                    return true;
                } else {
                    if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {
                        // Switch from VFO to Memory Mode
                        settings[r30.value.main_band].operation_mode = constant.OPERATION_MODE.MEM;

                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                        return true;
                    }

                    if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.MEM) {
                        // Switch from Memory to WX or VFO
                        if (r30.value.usa == true) {
                            settings[r30.value.main_band].operation_mode = constant.OPERATION_MODE.WX;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                        } else {
                            settings[r30.value.main_band].operation_mode = constant.OPERATION_MODE.VFO;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                        }

                        return true;
                    }

                    if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.WX) {
                        // Switch to WX to VFO
                        settings[r30.value.main_band].operation_mode = constant.OPERATION_MODE.VFO;

                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                        return true;
                    }
                }
            }

            return true;
        },
        audio_level_synchronize :   function () {
            if (r30.value.audio_mode == 0) {
                r30.msg(false, 'Audio level separate.');
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': '0x01', 'timestamp' : r30.timestamp()}));
            } else {
                r30.msg(false, 'Audio level synchronized.');
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': '0x00', 'timestamp' : r30.timestamp()}));
            }

            return true;
        }
    },
    get : {
        /**
         * @returns {boolean}
         */
        receiver_id             : function () {
            queue.add(JSON.stringify({'cmd':['0x19'], 'subcmd': ['0x00'], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        /**
         * @param {boolean} init
         * @param {null|number} band
         * @returns {boolean}
         */
        display_content         : function (init = false, band = null) {
            if (init == false) {
                if (band == null) {
                    if (r30.value.dual_band == true) {
                        if (settings[constant.BAND_A].scan == true) {
                            queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                        }

                        queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));


                        if (settings[constant.BAND_B].scan == true) {
                            queue.add(JSON.stringify({'cmd': ['0x29', '0x01'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp': r30.timestamp()}));
                        }

                        queue.add(JSON.stringify({'cmd':['0x29', '0x01'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                    } else {
                        if (r30.value.main_band !== null) {
                            if (r30.value.main_band == constant.BAND_A) {

                                queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));

                                queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                            } else {

                                queue.add(JSON.stringify({'cmd':['0x29', '0x01'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));

                                queue.add(JSON.stringify({'cmd':['0x29', '0x01'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                            }
                        } else {
                            queue.add(JSON.stringify({'cmd':['0x1A', '0x11'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));
                        }
                    }
                } else {
                    if (r30.value.dual_band == true) {
                        if (settings[constant.BAND_A].scan == true) {
                            queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                        }

                        queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));


                        if (settings[constant.BAND_B].scan == true) {
                            queue.add(JSON.stringify({'cmd': ['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp': r30.timestamp()}));
                        }

                        queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                    } else {
                        if (r30.value.main_band !== null) {
                            if (r30.value.main_band == constant.BAND_A) {

                                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));

                                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                            } else {

                                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));

                                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                            }
                        } else {
                            queue.add(JSON.stringify({'cmd':['0x1A', '0x11'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));
                        }
                    }
                }
            } else {
                if (band == null) {
                    queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));

                    queue.add(JSON.stringify({'cmd':['0x29', '0x01'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                } else {
                    queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                }

            }

            return true;
        },
        duplex_setting          : function () {
            // FIXME : In single request not working
            // queue.add(JSON.stringify({'cmd':'0x0F', 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        receive_freq            : function () {
            queue.add(JSON.stringify({'cmd':['0x03'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        receive_mode            : function () {
            queue.add(JSON.stringify({'cmd':['0x04'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        tuning_step             : function () {
            queue.add(JSON.stringify({'cmd':['0x10'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        attenuator              : function () {
            queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        af_gain_level           : function () {
            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x01', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        rf_gain_level           : function () {
            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x02', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        squelch_level           : function () {
            queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x03', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        s_meter                 : function () {
            queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x01', 'data': null, 'timestamp' : r30.timestamp()}));

            queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x02', 'data': null, 'timestamp' : r30.timestamp()}));

            queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x03', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        s_meter_v2              : function (band = null) {
            if (band !== null) {
                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));
            }
        },
        display_type            : function () {
            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        record_mode             : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x09', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        operation_mode          : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x04', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        audio_level_synchronize : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        anl                     : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x00', 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        scan_condition          : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0B'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

            return true;
        },
        scan_type               : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0C'], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
        memory_group_name       : function (memory_bank_nr = null) {
            function minTwoDigits(n) {
                return (n < 10 ? '0' : '') + n;
            }

            if (memory_bank_nr === null) {
                // TODO : No return

                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x00', '0x00', '0x01', '0x00', '0x02', '0x00', '0x03', '0x00', '0x04', '0x00', '0x05', '0x00', '0x06', '0x00', '0x07', '0x00', '0x08', '0x00', '0x09', '0x00', '0x10', '0x00', '0x11', '0x00', '0x12', '0x00', '0x13', '0x00', '0x14'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x15', '0x00', '0x16', '0x00', '0x17', '0x00', '0x18', '0x00', '0x19', '0x00', '0x20', '0x00', '0x21', '0x00', '0x22', '0x00', '0x23', '0x00', '0x24', '0x00', '0x25', '0x00', '0x26', '0x00', '0x27', '0x00', '0x28', '0x00', '0x29'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x30', '0x00', '0x31', '0x00', '0x32', '0x00', '0x33', '0x00', '0x34', '0x00', '0x35', '0x00', '0x36', '0x00', '0x37', '0x00', '0x38', '0x00', '0x39', '0x00', '0x40', '0x00', '0x41', '0x00', '0x42', '0x00', '0x43', '0x00', '0x44'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x45', '0x00', '0x46', '0x00', '0x47', '0x00', '0x48', '0x00', '0x49', '0x00', '0x50', '0x00', '0x51', '0x00', '0x52', '0x00', '0x53', '0x00', '0x54', '0x00', '0x55', '0x00', '0x56', '0x00', '0x57', '0x00', '0x58', '0x00', '0x59'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x60', '0x00', '0x61', '0x00', '0x62', '0x00', '0x63', '0x00', '0x64', '0x00', '0x65', '0x00', '0x66', '0x00', '0x67', '0x00', '0x68', '0x00', '0x69', '0x00', '0x70', '0x00', '0x71', '0x00', '0x72', '0x00', '0x73', '0x00', '0x74'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x75', '0x00', '0x76', '0x00', '0x77', '0x00', '0x78', '0x00', '0x79', '0x00', '0x80', '0x00', '0x81', '0x00', '0x82', '0x00', '0x83', '0x00', '0x84', '0x00', '0x85', '0x00', '0x86', '0x00', '0x87', '0x00', '0x88', '0x00', '0x89'], 'timestamp' : r30.timestamp()}));
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x90', '0x00', '0x91', '0x00', '0x92', '0x00', '0x93', '0x00', '0x94', '0x00', '0x95', '0x00', '0x96', '0x00', '0x97', '0x00', '0x98', '0x00', '0x99', '0x00', '0x00', '0x00', '0x01', '0x00', '0x02', '0x00', '0x03', '0x00', '0x04'], 'timestamp' : r30.timestamp()}));

            } else {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0F','0x00'], 'data': ['0x00', '0x'+minTwoDigits(memory_bank_nr)], 'timestamp' : r30.timestamp()}));
            }

            return true;
        },
        skip_mode               : function () {
            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': null, 'timestamp' : r30.timestamp()}));

            return true;
        },
    },
};