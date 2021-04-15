$(function () {
    let sched_a     = null;
    let sched_b     = null;
    let sched_queue = null;
    let socket      = io().connect();

    let queue   = {
        store : [],

        add     : function (cmdjson = null) {
            this.store.push(cmdjson);
        },
        remove  : function () {
            this.store.shift();
        },
        clear   : function () {
            this.store.splice(0,this.store.length)
        },
        start   : function () {
            sched_queue = setInterval(function () {
                //console.log(queue.store);
                $('#R_QUEUE').html(queue.store.length.toString());
                if (queue.store[0] !== 'undefined' && typeof queue.store[0]!== 'undefined') {
                    //console.log(queue.store[0]);
                    socket.emit('execute', queue.store[0]);
                }
                queue.remove();
            }, 5);
        },
        stop    : function () {
            clearInterval(sched_queue);
        }
    };
    let r30		= {
        focused : false,
        sel     : {
            // ##########################
            // # HTML Selector
            // ##########################
            R_RECONNECT_SWITCH          : $('#R_RECONNECT_SWITCH'),
            R_SOCKET_STATUS             : $('#R_SOCKET_STATUS'),
            R_SERIAL_STATUS             : $('#R_SERIAL_STATUS'),
            R_BLUETOOTH_STATUS          : $('#R_BLUETOOTH_STATUS'),
            R_AUDIO                     : $('#R_AUDIO'),
            R_SCAN_SELECT               : $('#R_SCAN_SELECT option'),
            R_QUEUE                     : $('#R_QUEUE'),

            R_A_AUDIO                        : $('#R_A_AUDIO'),
            R_BAND_A                        : $('#R_BAND_A'),
            R_BAND_A_ACTIVE                 : $('#R_BAND_A_ACTIVE'),
            R_A_MEMORY_GROUP_NAME           : $('#R_A_MEMORY_GROUP_NAME'),
            R_A_SKIP_OFF                    : $('#R_A_SKIP_OFF'),
            R_A_SKIP_SKIP                   : $('#R_A_SKIP_SKIP'),
            R_A_SKIP_PSKIP                  : $('#R_A_SKIP_PSKIP'),
            R_A_FREQ_1                      : $('#R_A_FREQ_1'),
            R_A_FREQ_2                      : $('#R_A_FREQ_2'),
            R_A_FREQ_3                      : $('#R_A_FREQ_3'),
            R_A_FREQ_4                      : $('#R_A_FREQ_4'),
            R_A_FREQ_5                      : $('#R_A_FREQ_5'),
            R_A_FREQ_6                      : $('#R_A_FREQ_6'),
            R_A_FREQ_7                      : $('#R_A_FREQ_7'),
            R_A_FREQ_8                      : $('#R_A_FREQ_8'),
            R_A_FREQ_9                      : $('#R_A_FREQ_9'),
            R_A_FREQ_10                     : $('#R_A_FREQ_10'),
            R_A_FREQ_ANL                    : $('#R_A_FREQ_ANL'),
            R_A_FREQ_MODE                   : $('#R_A_FREQ_MODE'),
            R_A_FREQ_NAME                   : $('#R_A_FREQ_NAME'),
            R_A_SCAN                        : $('#R_A_SCAN'),
            R_A_REC                         : $('#R_A_REC'),
            R_A_S_METER                     : $('#R_A_S_METER'),
            R_A_NB                          : $('#R_A_NB'),
            R_A_AFC                         : $('#R_A_AFC'),
            R_A_VSC                         : $('#R_A_VSC'),
            R_A_OPERATION_MODE_VFO            : $("#R_A_OPERATION_MODE_VFO"),
            R_A_OPERATION_MODE_MEM            : $("#R_A_OPERATION_MODE_MEM"),
            R_A_OPERATION_MODE_WX             : $("#R_A_OPERATION_MODE_WX"),
            R_A_DUP_OFF                       : $('#R_A_DUP_OFF'),
            R_A_DUP_MIN                       : $('#R_A_DUP_MIN'),
            R_A_DUP_PLU                       : $('#R_A_DUP_PLU'),
            R_A_S_METER_SQUELCH_STATUS        : $('#R_A_S_METER_SQUELCH_STATUS'),
            R_A_ATT_OFF                       : $('#R_A_ATT_OFF'),
            R_A_ATT_ATT1                      : $('#R_A_ATT_ATT1'),
            R_A_ATT_ATT2                      : $('#R_A_ATT_ATT2'),
            R_A_ATT_ATT3                      : $('#R_A_ATT_ATT3'),

            R_B_AUDIO                        : $('#R_B_AUDIO'),
            R_BAND_B                        : $('#R_BAND_B'),
            R_BAND_B_ACTIVE                 : $('#R_BAND_B_ACTIVE'),
            R_B_MEMORY_GROUP_NAME           : $('#R_B_MEMORY_GROUP_NAME'),
            R_B_SKIP_OFF                    : $('#R_B_SKIP_OFF'),
            R_B_SKIP_SKIP                   : $('#R_B_SKIP_SKIP'),
            R_B_SKIP_PSKIP                  : $('#R_B_SKIP_PSKIP'),
            R_B_FREQ_1                      : $('#R_B_FREQ_1'),
            R_B_FREQ_2                      : $('#R_B_FREQ_2'),
            R_B_FREQ_3                      : $('#R_B_FREQ_3'),
            R_B_FREQ_4                      : $('#R_B_FREQ_4'),
            R_B_FREQ_5                      : $('#R_B_FREQ_5'),
            R_B_FREQ_6                      : $('#R_B_FREQ_6'),
            R_B_FREQ_7                      : $('#R_B_FREQ_7'),
            R_B_FREQ_8                      : $('#R_B_FREQ_8'),
            R_B_FREQ_9                      : $('#R_B_FREQ_9'),
            R_B_FREQ_10                     : $('#R_B_FREQ_10'),
            R_B_FREQ_ANL                    : $('#R_B_FREQ_ANL'),
            R_B_FREQ_MODE                   : $('#R_B_FREQ_MODE'),
            R_B_FREQ_NAME                   : $('#R_B_FREQ_NAME'),
            R_B_SCAN                        : $('#R_B_SCAN'),
            R_B_REC                         : $('#R_B_REC'),
            R_B_S_METER                     : $('#R_B_S_METER'),
            R_B_NB                          : $('#R_B_NB'),
            R_B_AFC                         : $('#R_B_AFC'),
            R_B_VSC                         : $('#R_B_VSC'),
            R_B_OPERATION_MODE_VFO            : $("#R_B_OPERATION_MODE_VFO"),
            R_B_OPERATION_MODE_MEM            : $("#R_B_OPERATION_MODE_MEM"),
            R_B_OPERATION_MODE_WX             : $("#R_B_OPERATION_MODE_WX"),
            R_B_DUP_OFF                       : $('#R_B_DUP_OFF'),
            R_B_DUP_MIN                       : $('#R_B_DUP_MIN'),
            R_B_DUP_PLU                       : $('#R_B_DUP_PLU'),
            R_B_S_METER_SQUELCH_STATUS        : $('#R_B_S_METER_SQUELCH_STATUS'),
            R_B_ATT_OFF                       : $('#R_B_ATT_OFF'),
            R_B_ATT_ATT1                      : $('#R_B_ATT_ATT1'),
            R_B_ATT_ATT2                      : $('#R_B_ATT_ATT2'),
            R_B_ATT_ATT3                      : $('#R_B_ATT_ATT3'),



            R_DEBUG                         : $("#R_DEBUG"),

            R_AF_GAIN                       : $('#R_AF_GAIN'),
            R_AF_GAIN_SLIDER                : null,
            R_RF_GAIN                       : $('#R_RF_GAIN'),
            R_RF_GAIN_SLIDER                : null,
            R_SQUELCH_LEVEL                 : $('#R_SQUELCH_LEVEL'),
            R_SQUELCH_LEVEL_SLIDER          : null,

            R_A_TUNING_STEP                 : $('#R_A_TUNING_STEP'),
            R_B_TUNING_STEP                 : $('#R_B_TUNING_STEP'),
            R_LOG                           : $('#R_LOG'),
        },
        const   : {
            S_TIMER : 100,
            BAND_A : 0,
            BAND_B : 1,
            RECEIVE_MODE : {
                LSB : 1,
                USB : 2,
                AM  : 3,
                AM_N : 4,
                CW  : 5,
                FM : 6,
                FM_N : 7,
                WFM : 8,
                CW_R : 9,
                P25 : 10,
                D_STAR : 11,
                DPMR : 12,
                NXDN_VN : 13,
                NXDN_N : 14,
                DCR : 15
            },
            OPERATION_MODE : {
                VFO : 0,
                MEM : 1,
                WX : 2,
            },
            SKIP_MODE : {
                OFF : 0,
                SKIP : 1,
                PSKIP : 2
            },
            VSC : {
                OFF:0,
                ON:1,
            }
        },
        value   : {
            serialbaudrate      : 9600,
            usa                 : false,
            dual_band           : false,
            main_band           : null,
            bank_counter        : 0,
            table_receive_log   : null,
            memory_banks        : {},
            audio_mode          : 0,
        },
        band    : {
            0 : {
                // Band A
                rec             : false,    // Recording Status
                receive_mode    : 0,
                noise_blanker   : 0,
                operation_mode  : 0,        // 0 = VFO / 1 = Memory / 2 = WX
                scan            : false,
                scan_direction  : 'up',
                dup             : 0,
                afc             : 0,
                att             : 0,
                vsc             : 0,
                smeter          : 0,
                anl             : 0,
                memory_bank_nr  : null,
                memory_bank_name: null,
            },
            1 : {
                // Band B
                rec             : false,    // Recording Status
                receive_mode    : 0,
                noise_blanker   : 0,
                operation_mode  : 0,        // 0 = VFO / 1 = Memory / 2 = WX
                scan            : false,
                scan_direction  : 'up',
                dup             : 0,
                att             : 0,
                vsc             : 0,
                afc             : 0,
                smeter          : 0,
                anl             : 0,
                memory_bank_nr  : null,
                memory_bank_name: null,
            }
        },
        // ##########################
        // # Functions
        // ##########################
        timestamp   : function (show_sec = true) {
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = (date_ob.getMinutes() < 10 ? '0' : '') + date_ob.getMinutes();
            let seconds = date_ob.getSeconds();

            if (show_sec == true) {
                return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            } else {
                return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
            }

        },
        connect     : function () {
            socket.on('connect', function () {

                r30.sel.R_SOCKET_STATUS.removeClass('bg-danger').addClass('bg-success');
                r30.sel.R_SOCKET_STATUS.html('Online');

                /** Start any actions after socket is successfully started **/
                r30.data();
                r30.audio();
                queue.start();
                r30.init();
            });
        },
        reconnect   : function () {
            socket.on('reconnect', function () {

            });
        },
        disconnect  : function () {
            socket.on('disconnect', function () {
                r30.sel.R_SOCKET_STATUS.removeClass('bg-success').addClass('bg-danger');
                r30.sel.R_SOCKET_STATUS.html('Offline');
            });
        },
        audio       : function () {
            function playAudio(buffer)
            {
                var audioCtx;
                var started = false;
                if(!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }

                source = audioCtx.createBufferSource();
                audioBuffer = audioCtx.createBuffer( 1, 180, audioCtx.sampleRate );
                audioBuffer.getChannelData( 0 ).set( buffer );
                source.buffer = audioBuffer;
                source.connect( audioCtx.destination );
                source.start(0);
                //console.log(buffer);
            }

            socket.on('audio',function (data) {
                playAudio(data);
            });

        },
        data        : function () {
            socket.on('data', function (data = null) {
                if (data !== null) {
                    let obj = JSON.parse(data);

                    if (obj.debugweb == true) {
                        console.log(data);
                    }

                    $('#R_VERSION_WEB').html(obj.versionweb);
                    $('#R_VERSION_SERVER').html(obj.versionserver);

                    r30.value.usa = obj.usa;
                    r30.value.serialbaudrate = obj.serialbaudrate;

                    if (typeof obj.statusbluetooth !== 'undefined') {
                        if (obj.statusbluetooth === true) {
                            r30.sel.R_BLUETOOTH_STATUS.addClass('bg-success');
                            r30.sel.R_BLUETOOTH_STATUS.html('Online');
                        }

                        if (obj.statusbluetooth === false) {
                            r30.sel.R_BLUETOOTH_STATUS.addClass('bg-danger');
                            r30.sel.R_BLUETOOTH_STATUS.html('Offline');
                        }
                    }

                    if (typeof obj.statusserial !== 'undefined') {
                        if (obj.statusserial === true) {
                            r30.sel.R_SERIAL_STATUS.addClass('bg-success');
                            r30.sel.R_SERIAL_STATUS.html('Online');
                        }

                        if (obj.statusserial === false) {
                            r30.sel.R_SERIAL_STATUS.addClass('bg-danger');
                            r30.sel.R_SERIAL_STATUS.html('Offline');
                        }
                    }

                    if (obj.statusserial === false && obj.statusbluetooth === false) {
                        r30.sel.R_RECONNECT_SWITCH.prop('checked', false);
                    } else {
                        r30.sel.R_RECONNECT_SWITCH.prop('checked', true);
                    }

                    switch (true) {
                        case (obj.cmd == "FB") :
                            r30.cmd.get_display_content(false);
                        break;
                        case (obj.cmd == "00") :
                            r30.func.func_get_frequency(r30.value.main_band, JSON.parse(obj.cmdres));
                        break;
                        case (obj.cmd == "01") :
                            r30.func.func_get_frequency(r30.value.main_band, null, obj.cmdres)
                            break;
                        case (obj.cmd == "03") :
                            r30.func.func_get_frequency(r30.value.main_band, JSON.parse(obj.cmdres));
                        break;
                        case (obj.cmd == "04") :
                            r30.func.func_get_receive_mode(r30.value.main_band, obj.cmdres)
                        break;
                        case (obj.cmd == "07") :
                            // Only FB or FA Feedback
                        break;
                        case (obj.cmd == "08") :
                            // Only FB or FA Feedback
                        break;
                        case (obj.cmd == "10") :
                            r30.func.func_get_tuning_step(r30.value.main_band, obj.cmdres);
                            break;
                        case (obj.cmd == "11") :
                            r30.func.func_get_att(r30.value.main_band, obj.cmdres);
                        break;
                        case (obj.cmd == "14") :
                            switch (true) {
                                case (obj.subcmd == "01"):
                                    r30.func.func_get_af_gain(obj.cmdres);
                                    break;
                                case (obj.subcmd == "02"):
                                    r30.func.func_get_rf_gain(obj.cmdres);
                                    break;
                                case (obj.subcmd == "03"):
                                    r30.sel.R_SQUELCH_LEVEL.data('from', obj.cmdres);
                                    r30.sel.R_SQUELCH_LEVEL_SLIDER.update({from: obj.cmdres});
                                    break;
                            }
                        break;
                        case (obj.cmd == "15") :
                            switch (true) {
                                case (obj.subcmd == "01"):
                                    r30.func.func_get_squelch_status(r30.value.main_band, obj.cmdres);
                                    break;
                                case (obj.subcmd == "02"):
                                    r30.func.func_get_s_meter(r30.value.main_band, obj.cmdres);
                                    break;
                                case (obj.subcmd == "05"):
                                    // TODO : CMD 15 - SUB 05
                                    break;
                            }
                        break;
                        case (obj.cmd == "16") :
                            switch (true) {
                                case (obj.subcmd == "22"):
                                    r30.func.func_get_noise_blanker_status(r30.value.main_band,obj.cmdres);
                                    break;
                                case (obj.subcmd == "59"):
                                    // 00=Single band display, 01=Dual band display
                                    if (obj.cmdres == "00") {
                                        r30.value.dual_band = false;
                                        r30.sel.R_BAND_B.hide();
                                    } else if (obj.cmdres == "01") {
                                        r30.sel.R_BAND_B.show();
                                        r30.value.dual_band = true;
                                    }
                                    break;
                            }
                            break;
                        case (obj.cmd == "19") :
                            // R30 => 9C
                        break;
                        case (obj.cmd == "0F") :
                            r30.func.func_get_dup(r30.value.main_band, obj.cmdres);
                        break;
                        case (obj.cmd == "1A") :
                            switch (true) {
                                case (obj.subcmd == "00"):
                                    r30.func.func_get_anl(r30.value.main_band, obj.cmdres);
                                break;
                                case (obj.subcmd == "04"):
                                    r30.func.func_get_operating_mode(r30.value.main_band, obj.cmdres);
                                break;
                                case (obj.subcmd == "06"):
                                    r30.func.func_get_audio_level_synchronize(obj.cmdres);
                                    break;
                                case (obj.subcmd == "07"):
                                    r30.func.func_get_af_gain(obj.cmdres);
                                break;
                                case (obj.subcmd == "08"):
                                    r30.func.func_get_skip_mode(r30.value.main_band, obj.cmdres);
                                break;
                                case (obj.subcmd == "09"):
                                    // No data expected, only execute command
                                break;
                                case (obj.subcmd == "11"):
                                    // Display Content
                                    // Change anything also in 29 Bit
                                    var data = JSON.parse(obj.cmdres);
                                    var freq = JSON.parse(data.freq);

                                    r30.value.dual_band = data.dual_band;
                                    r30.value.main_band = data.main_band;

                                    r30.func.func_set_r30_log(data.main_band, freq, data.mem_name);
                                    r30.func.func_get_frequency(data.main_band, freq, data.mem_name, data.receive_mode);
                                    r30.func.func_get_recording_condition(data.main_band, data.rec);
                                    r30.func.func_get_select_band();
                                    r30.func.func_get_operating_mode(data.main_band, data.operation_mode);
                                    r30.func.func_get_anl(data.main_band, data.anl);
                                    r30.func.func_get_noise_blanker_status(data.main_band, data.nb);
                                    r30.func.func_get_afc(data.main_band, data.afc);
                                    r30.func.func_get_dup(data.main_band, data.dup);
                                    r30.func.func_get_att(data.main_band, data.att);
                                    r30.func.func_get_vsc(data.main_band, data.vsc);
                                    r30.func.func_get_skip_mode(data.main_band, data.skip_mode);
                                    r30.func.func_get_memory_group_name(data.main_band, data.mem_group_nr);
                                    r30.func.func_get_rf_gain(data.rf_gain);

                                    // TODO : Scheduler check establishment
                                break;

                                case (obj.subcmd == "12"):
                                    var data = JSON.parse(obj.cmdres);

                                    r30.func.func_get_s_meter(r30.value.main_band, data.s_meter_lvl);
                                    r30.func.func_get_squelch_status(r30.value.main_band, data.squelch_status);
                                break;
                                case (obj.subcmd == "0B"):
                                    if (obj.cmdres !== null) {
                                        try {
                                            var data = JSON.parse(obj.cmdres);
                                            r30.func.func_get_scan_condition(data);
                                        } catch (e) {

                                        }
                                    }
                                break;
                                case (obj.subcmd == "0C"):
                                    // TODO: Scan Type not finished
                                    r30.func.func_get_scan_type();
                                break;
                                case (obj.subcmd == "0F"):
                                    r30.func.func_get_memory_group_list(obj.cmddata);
                                break;
                            }
                        break;
                        case (obj.cmd == "29") :
                            // TODO : Try to find a solution for subcommands
                            if (obj.cmdres !== null) {
                                try {
                                    var data = JSON.parse(obj.cmdres);
                                    let freq = JSON.parse(data.freq);

                                    r30.value.dual_band = data.dual_band;
                                    r30.value.main_band = data.main_band;
                                    r30.func.func_set_r30_log(data.band, freq, data.mem_name);
                                    r30.func.func_get_frequency(data.band, freq, data.mem_name, data.receive_mode);
                                    r30.func.func_get_recording_condition(data.band, data.rec);
                                    r30.func.func_get_select_band();
                                    r30.func.func_get_operating_mode(data.band, data.operation_mode);
                                    r30.func.func_get_anl(data.band, data.anl);
                                    r30.func.func_get_noise_blanker_status(data.band, data.nb);
                                    r30.func.func_get_afc(data.band, data.afc);
                                    r30.func.func_get_dup(data.band, data.dup);
                                    r30.func.func_get_att(data.band, data.att);
                                    r30.func.func_get_vsc(data.band, data.vsc);
                                    r30.func.func_get_skip_mode(data.band, data.skip_mode);
                                    r30.func.func_get_memory_group_name(data.band, data.mem_group_nr);

                                } catch (e) { }

                                try {
                                    r30.func.func_get_s_meter(data.band, data.s_meter_lvl);
                                    r30.func.func_get_squelch_status(data.band, data.squelch_status);
                                } catch (e) { }
                            }
                        break;
                    }

                    // Debug Messages
                    if (obj.debugweb == true && typeof obj.debug !== 'undefined' && obj.debug !== null && obj.debug !== ',') {
                        r30.sel.R_DEBUG.prepend('<li class="media">' +
                            '<div class="mr-3">' +
                            '<a href="#" class="btn bg-warning-400 rounded-round btn-icon btn-sm">' +
                            '            R30</a>' +
                            '</div>' +
                            '<div class="media-body">' +
                            '<div class="d-flex justify-content-between">' +
                            '<a href="#">IC-30</a>' +
                            '<span class="font-size-sm text-muted">'+obj.timestamp+'</span>' +
                            '</div>' +
                            obj.debug +
                            '</div>' +
                            '</li>');
                    }
                }
            });
        },
        html        : function () {
            $(".switch").bootstrapSwitch();

            $.extend( $.fn.dataTable.defaults, {
                autoWidth: false,
                columnDefs: [{
                    orderable: false,
                    width: 100,
                }],
                dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
                language: {
                    search: '<span>Filter:</span> _INPUT_',
                    searchPlaceholder: 'Type to filter...',
                    lengthMenu: '<span>Show:</span> _MENU_',
                    paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
                }
            });

            $('.select-search').select2();

            r30.value.table_receive_log = $('#R_TABLE_RECEIVE_LOG').DataTable({
                "order": [[ 2, "desc" ]]
            });

            r30.sel.R_AF_GAIN.ionRangeSlider({
                hide_min_max: true,
                min: 0,
                max: 39,
                grid: true,
                grid_num: 10,
                prefix: "AF Gain: ",
                onFinish: function (data) {
                    r30.cmd.set_af_gain_level(data.from);
                },
            });

            r30.sel.R_RF_GAIN.ionRangeSlider({
                hide_min_max: true,
                min: 1,
                max: 10,
                grid: true,
                grid_num: 10,
                prefix: "RF Gain: ",
                onFinish: function (data) {
                    r30.cmd.set_rf_gain_level(data.from);
                },
            });

            var squelch_label = ['Open', 'Auto', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            r30.sel.R_SQUELCH_LEVEL.ionRangeSlider({
                min: 0,
                max: 10,
                grid: true,
                grid_num: 10,
                step: 1,
                prefix: "Squelch : ",
                hide_min_max: true,
                prettify: function (n) {
                    return squelch_label[n];
                },
                onFinish: function (data) {
                    r30.cmd.set_squelch_level(data.from, squelch_label);
                },
            });

            r30.sel.R_AF_GAIN_SLIDER = r30.sel.R_AF_GAIN.data("ionRangeSlider");
            r30.sel.R_RF_GAIN_SLIDER = r30.sel.R_RF_GAIN.data("ionRangeSlider");
            r30.sel.R_SQUELCH_LEVEL_SLIDER = r30.sel.R_SQUELCH_LEVEL.data("ionRangeSlider");

            // #################################################
            // # Scoll events for frequency
            // #################################################
            $("input[name='R_A_FREQ_1'], input[name='R_A_FREQ_2'], input[name='R_A_FREQ_3'], input[name='R_A_FREQ_4'], input[name='R_A_FREQ_5'], input[name='R_A_FREQ_6'], input[name='R_A_FREQ_7'], input[name='R_A_FREQ_8'], input[name='R_A_FREQ_9'], input[name='R_A_FREQ_10'],input[name='R_B_FREQ_1'], input[name='R_B_FREQ_2'], input[name='R_B_FREQ_3'], input[name='R_B_FREQ_4'], input[name='R_B_FREQ_5'], input[name='R_B_FREQ_6'], input[name='R_B_FREQ_7'], input[name='R_B_FREQ_8'], input[name='R_B_FREQ_9'], input[name='R_B_FREQ_10']").on("mousewheel", function(event, delta) {
                if (delta > 0)
                {
                    if (this.value >= 9)
                    {
                        this.value = -1;
                    }

                    this.value = parseInt(this.value) + 1;
                }
                else
                {
                    if (parseInt(this.value) > 0)
                    {
                        this.value = parseInt(this.value) - 1;
                    }

                    if (parseInt(this.value) == 0)
                    {
                        this.value = 9;
                    }
                }
                return false;
            });

            $("input[name='R_A_FREQ_1'], input[name='R_A_FREQ_2'], input[name='R_A_FREQ_3'], input[name='R_A_FREQ_4'], input[name='R_A_FREQ_5'], input[name='R_A_FREQ_6'], input[name='R_A_FREQ_7'], input[name='R_A_FREQ_8'], input[name='R_A_FREQ_9'], input[name='R_A_FREQ_10'],input[name='R_B_FREQ_1'], input[name='R_B_FREQ_2'], input[name='R_B_FREQ_3'], input[name='R_B_FREQ_4'], input[name='R_B_FREQ_5'], input[name='R_B_FREQ_6'], input[name='R_B_FREQ_7'], input[name='R_B_FREQ_8'], input[name='R_B_FREQ_9'], input[name='R_B_FREQ_10']").on( "keydown", function (e) {
                var data = String.fromCharCode(e.keyCode);
                if ($.inArray(data, ["0","1","2","3","4","5","6","7","8","9"]) !== -1) {
                    this.value = String.fromCharCode(e.keyCode);
                    $(this).next().focus();
                }
            });

            // TODO: URL automatically
            r30.sel.R_AUDIO.attr('src', 'http://192.168.10.9:8888/air.mp3?nocache=' + Math.floor((Math.random() * 1000000) + 1));
        },
        button      : function () {

            $('#R_BTN_REQ_VSC').on( "click", function(){
                r30.cmd.set_vsc();
            });

            $('#R_A_FREQ_MODE').on('select2:select', function (e) {
                var data = e.params.data;
                r30.cmd.set_receive_mode(data.id);
            });

            $('#R_B_FREQ_MODE').on('select2:select', function (e) {
                var data = e.params.data;
                r30.cmd.set_receive_mode(data.id);
            });

            $('#R_RECONNECT_SWITCH').on( "click", function(){
                r30.cmd.set_on_off();
            });

            $('#R_BTN_REQ_T_SKIP').on( "click", function(){
                r30.cmd.set_skip_mode();
            });

            $('#R_BTN_REQ_P_SKIP').on( "click", function(){
                r30.cmd.set_skip_mode(true);
            });

            $('#R_BTN_REQ_AUDIO').on( "click", function(){
                r30.cmd.set_audio_level_synchronize();
            });

            $('#R_BTN_REQ_DUP').on( "click", function(){
                r30.cmd.set_dup();
            });

            $('#R_BTN_REQ_SCAN').on( "click", function(){
                // TODO : web.js r30.button.R_BTN_REQ_SCAN
                // #################################################
                // # VFO Mode
                // #################################################
                if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO) {

                        if (r30.band[r30.value.main_band].scan == false) {
                            if (
                                $('#R_SCAN_SELECT option').filter(':selected').val() === "AL" ||
                                $('#R_SCAN_SELECT option').filter(':selected').val() === "AW" ||
                                $('#R_SCAN_SELECT option').filter(':selected').val() === "BA" ||
                                $('#R_SCAN_SELECT option').filter(':selected').val() === "TO"
                            ) {
                                r30.band[r30.value.main_band].scan = true;

                                r30.cmd.set_scan_start($('#R_SCAN_SELECT option').filter(':selected').val());

                                if (r30.value.main_band == r30.const.BAND_A) {
                                    sched_a = setInterval(r30.sched[0], r30.const.S_TIMER);

                                    r30.func.func_set_msg(false, 'Scan Band A started.');
                                }

                                if (r30.value.main_band == r30.const.BAND_B) {
                                    sched_b = setInterval(r30.sched[1], r30.const.S_TIMER);

                                    r30.func.func_set_msg(false, 'Scan Band B started.');
                                }
                            } else {
                                r30.func.func_set_msg(true, 'Scan options in VFO mode only [ALL | BAND | TONE | AUTO MW] ');
                            }

                        } else {
                            if (r30.value.main_band == r30.const.BAND_A) {
                                r30.band[r30.const.BAND_A].scan = false;

                                clearInterval(sched_a);

                                r30.cmd.set_scan_stop();

                                r30.func.func_set_msg(false, 'Scan stopped.');
                            }

                            if (r30.value.main_band == r30.const.BAND_B) {
                                r30.band[r30.const.BAND_B].scan = false;

                                clearInterval(sched_b);

                                r30.cmd.set_scan_stop();

                                r30.func.func_set_msg(false, 'Scan stopped.');
                            }
                        }

                }

                // #################################################
                // # Memory Mode
                // #################################################
                if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.MEM) {
                    if (r30.band[r30.value.main_band].scan == false) {

                        let value = $('#R_SCAN_SELECT option').filter(':selected').val();

                        if (
                            value === "AL" ||
                            value === "MO" ||
                            value === "NS" ||
                            value === "GL" ||
                            value.includes("MB")
                        ) {
                            r30.band[r30.value.main_band].scan = true;
                            r30.cmd.set_scan_start(value);
                            r30.func.func_get_scan_condition();

                            r30.func.func_set_msg(false, 'Scan started.');

                        } else {
                            r30.func.func_set_msg(true, 'Scan options in MEM mode only [ALL | MODE | NEAR STATION | GROUP LINK | MEMORY GROUP ]  ');
                        }

                    } else {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.band[0].scan = false;

                            clearInterval(sched_a);
                            sched_a = null;

                            r30.cmd.set_scan_stop();
                            r30.func.func_get_scan_condition();

                            r30.func.func_set_msg(false, 'Scan stopped.');
                        }

                        if (r30.value.main_band == r30.const.BAND_B) {
                            r30.band[1].scan = false;

                            clearInterval(sched_b);
                            sched_b = null;

                            r30.cmd.set_scan_stop();
                            r30.func.func_get_scan_condition();

                            r30.func.func_set_msg(false, 'Scan stopped.');
                        }
                    }
                }

                // #################################################
                // # WX Mode
                // #################################################
                if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.WX) {
                    // TODO : Scan Button for WX Mode
                }
            });

            $('#R_BTN_REQ_ATT').on( "click", function(){
                r30.cmd.set_att();
            });

            $('#R_BTN_REQ_ANL').on( "click", function(){
                r30.cmd.set_anl();
                r30.func.func_get_anl();
            });

            $('#R_BTN_REQ_AFC').on( "click", function(){
                r30.cmd.set_afc();
            });

            $('#R_BTN_REQ_VFO_MR_MX').on( "click", function(){
                r30.cmd.set_operating_mode();
                r30.func.func_get_operating_mode();
            });

            $('#R_BTN_REQ_REC').on( "click", function(){
                r30.cmd.set_recording(r30.value.main_band);
            });

            $('#R_BTN_REQ_NB').on( "click", function(){
                r30.cmd.set_noise_blanker_status();
            });

            $('#R_BTN_REQ_SWITCH_BAND').on( "click", function(){
                r30.cmd.set_band();
                r30.cmd.get_tuning_step();
                r30.cmd.get_af_gain_level();
                r30.cmd.get_rf_gain_level();
                r30.cmd.get_squelch_level();
                r30.func.func_get_select_band();
            });

            $('#R_BTN_REQ_SINGLE_DUAL').on( "click", function(){
                if (r30.value.dual_band == false) {
                    r30.cmd.set_single_dual_band_mode(true);

                    r30.cmd.get_display_content(true, null);

                    r30.value.dual_band = true;

                } else {
                    r30.cmd.set_single_dual_band_mode(false);

                    r30.value.dual_band = false;
                }
            });

            $('#R_BTN_REQ_UP').on( "click", function(){
                r30.cmd.set_up_down('u');
            });

            $('#R_BTN_REQ_DOWN').on( "click", function(){
                r30.cmd.set_up_down('d');
            });

            $('#R_BTN_REQ_SET').on( "click", function(){
                if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO) {
                    r30.cmd.set_frequency();
                } else {
                    r30.cmd.set_operating_mode(r30.value.main_band, r30.const.OPERATION_MODE.VFO);

                    r30.cmd.set_frequency();
                }
            });

            $('#R_BTN_REQ_SMETER').on( "click",function(){
                r30.cmd.get_s_meter();
            });
        },
        func        : {
            func_set_msg                    : function (failed = false, content = null) {

                if (failed == false) {
                    new PNotify({
                        title: 'Command successful',
                        text: content,
                        addclass: 'alert bg-success border-success alert-styled-right',
                        type: 'success'
                    });
                } else {
                    new PNotify({
                        title: 'Command failed',
                        text: content,
                        addclass: 'alert bg-danger border-danger alert-styled-right',
                        type: 'error'
                    });
                }
            },
            func_set_r30_log                : function (band = null, freq = null, freq_name = null) {
                if (r30.band[band].smeter > 0) {
                    let timestamp   = r30.timestamp(false);
                    let md5         = $.MD5(freq[8] +'.'+ freq[9] +''+ freq[6] +''+ freq[7] +'.'+ freq[4] +''+ freq[5] +''+ freq[2] +'.'+ freq[3] +''+ freq[0] +''+ freq[1] + timestamp);

                    if ($('#R_' + md5).length <= 0) {

                        r30.value.table_receive_log.row.add([
                            freq[8] +'.'+ freq[9] +''+ freq[6] +''+ freq[7] +'.'+ freq[4] +''+ freq[5] +''+ freq[2] +'.'+ freq[3] +''+ freq[0] +''+ freq[1],
                            freq_name,
                            timestamp
                        ]).node().id = 'R_'+md5;

                        r30.value.table_receive_log.draw( false );
                    }
                }
            },
            func_get_operating_mode         : function (band = null, data = null) {
                if (band !== null) {
                    if (data !== null) {
                        r30.band[band].operation_mode = data;

                        switch(true) {
                            case (data == 0):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (data == 1):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (data == 2):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                        }
                    } else {
                        switch(true) {
                            case (r30.band[band].operation_mode == r30.const.OPERATION_MODE.VFO):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (r30.band[band].operation_mode == r30.const.OPERATION_MODE.MEM):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (r30.band[band].operation_mode == r30.const.OPERATION_MODE.WX):
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                        }
                    }
                } else {
                    if (data !== null) {
                        r30.band[r30.value.main_band].operation_mode = data;

                        switch(true) {
                            case (data == r30.const.OPERATION_MODE.VFO):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (data == r30.const.OPERATION_MODE.MEM):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (data == r30.const.OPERATION_MODE.WX):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                        }
                    } else {
                        switch(true) {
                            case (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.MEM):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                                }
                                break;
                            case (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.WX):
                                if (r30.value.main_band == r30.const.BAND_A) {
                                    r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                } else {
                                    r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                                }
                            break;
                        }
                    }
                }
            },
            func_get_receive_mode           : function (band = null, data = null) {
                //console.log("receive_mode : " + data);
                if (band !== null) {
                    if (data !== null) {
                        r30.band[band].receive_mode = data;

                        if (band == r30.const.BAND_A) {
                            r30.sel.R_A_FREQ_MODE.val(data).trigger("change");
                        } else {
                            r30.sel.R_B_FREQ_MODE.val(data).trigger("change");
                        }
                    } else {
                        if (band == r30.const.BAND_A) {
                            r30.sel.R_A_FREQ_MODE.val(r30.band[band].receive_mode).trigger("change");
                        } else {
                            r30.sel.R_B_FREQ_MODE.val(r30.band[band].receive_mode).trigger("change");
                        }
                    }
                } else {
                    if (data !== null) {
                        r30.band[r30.value.main_band].receive_mode = data;

                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_FREQ_MODE.val(data).trigger("change");
                        } else {
                            r30.sel.R_B_FREQ_MODE.val(data).trigger("change");
                        }
                    } else {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_FREQ_MODE.val(r30.band[r30.value.main_band].receive_mode).trigger("change");
                        } else {
                            r30.sel.R_B_FREQ_MODE.val(r30.band[r30.value.main_band].receive_mode).trigger("change");
                        }
                    }
                }
            },
            func_get_select_band            : function () {
                if (r30.value.dual_band == false) {
                    if (r30.value.main_band == r30.const.BAND_A) {
                        r30.sel.R_BAND_A.show();
                        r30.sel.R_BAND_B.hide();

                        r30.sel.R_BAND_A_ACTIVE.removeClass('bg-light').addClass('bg-green-300');
                        r30.sel.R_BAND_B_ACTIVE.removeClass('bg-green-300').addClass('bg-light');
                    } else {
                        r30.sel.R_BAND_A.hide();
                        r30.sel.R_BAND_B.show();

                        r30.sel.R_BAND_B_ACTIVE.removeClass('bg-light').addClass('bg-green-300');
                        r30.sel.R_BAND_A_ACTIVE.removeClass('bg-green-300').addClass('bg-light');
                    }
                } else {
                    if (r30.value.main_band == r30.const.BAND_A) {
                        r30.sel.R_BAND_A.show();
                        r30.sel.R_BAND_B.show();

                        r30.sel.R_BAND_A_ACTIVE.removeClass('bg-light').addClass('bg-green-300');
                        r30.sel.R_BAND_B_ACTIVE.removeClass('bg-green-300').addClass('bg-light');
                    } else {
                        r30.sel.R_BAND_A.show();
                        r30.sel.R_BAND_B.show();

                        r30.sel.R_BAND_B_ACTIVE.removeClass('bg-light').addClass('bg-green-300');
                        r30.sel.R_BAND_A_ACTIVE.removeClass('bg-green-300').addClass('bg-light');
                    }
                }
            },
            func_get_recording_condition    : function (band = null, data = null) {
                if (data !== null) {
                    switch (true) {
                        case (data == 0) :
                            // stopped
                            r30.band[band].rec = false;

                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                            } else {
                                r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                            }
                            break;
                        case (data == 1) :
                            // pause
                            r30.band[band].rec = true;

                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                            } else {
                                r30.sel.R_B_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                            }
                            break;
                        case (data == 2) :
                            r30.band[band].rec = true;

                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                            } else {
                                r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                            }
                            break;
                    }
                }
            },
            func_get_s_meter                : function (band = null, data = null) {
                if (data !== null) {
                    r30.band[band].smeter = data;

                    let value = Math.round((100 / 255) * data);

                    if (band == r30.const.BAND_A) {
                        r30.sel.R_A_S_METER.css("width", value +"%");
                        r30.sel.R_A_S_METER.html('<span>'+ value + '</span>');
                    } else {
                        r30.sel.R_B_S_METER.css("width", value +"%");
                        r30.sel.R_B_S_METER.html('<span>'+ value + '</span>');
                    }
                }
            },
            func_get_audio_level_synchronize: function (data = null) {
                if (data !== null) {
                    r30.value.audio_mode = data;

                    if (data == 0) {
                        // 00=A/B Link
                        r30.sel.R_A_AUDIO.html('A=B').prop('title', 'Audio A=B Link');
                        r30.sel.R_B_AUDIO.html('A=B').prop('title', 'Audio A=B Link');
                    } else {
                        // 01=A/B Separate
                        r30.sel.R_A_AUDIO.html('A/B').prop('title', 'Audio A/B Separate');
                        r30.sel.R_B_AUDIO.html('A/B').prop('title', 'Audio A/B Separate');
                    }
                }

            },
            func_get_squelch_status         : function (band = null, data = null) {
                if (data !== null) {
                    if (band == r30.const.BAND_A) {
                        if (data == 0) {
                            r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                        }
                    } else {
                        if (data == 0) {
                            r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                        }
                    }
                }
            },
            func_get_frequency              : function (band = null, data = null, mem_name = null, receive_mode = null) {
                if (band == r30.const.BAND_A) {
                    if (data !== null) {
                        r30.sel.R_A_FREQ_1.val(data[8]);
                        r30.sel.R_A_FREQ_2.val(data[9]);
                        r30.sel.R_A_FREQ_3.val(data[6]);
                        r30.sel.R_A_FREQ_4.val(data[7]);
                        r30.sel.R_A_FREQ_5.val(data[4]);
                        r30.sel.R_A_FREQ_6.val(data[5]);
                        r30.sel.R_A_FREQ_7.val(data[2]);
                        r30.sel.R_A_FREQ_8.val(data[3]);
                        r30.sel.R_A_FREQ_9.val(data[0]);
                        r30.sel.R_A_FREQ_10.val(data[1]);
                    }

                    if (mem_name !== null && mem_name !== "")      {
                        r30.sel.R_A_FREQ_NAME.html(mem_name);
                    } else {
                        r30.sel.R_A_FREQ_NAME.html('----------');
                    }

                    if (receive_mode !== null)  {
                        r30.func.func_get_receive_mode(band, receive_mode);
                    }
                } else {
                    if (data !== null) {
                        r30.sel.R_B_FREQ_1.val(data[8]);
                        r30.sel.R_B_FREQ_2.val(data[9]);
                        r30.sel.R_B_FREQ_3.val(data[6]);
                        r30.sel.R_B_FREQ_4.val(data[7]);
                        r30.sel.R_B_FREQ_5.val(data[4]);
                        r30.sel.R_B_FREQ_6.val(data[5]);
                        r30.sel.R_B_FREQ_7.val(data[2]);
                        r30.sel.R_B_FREQ_8.val(data[3]);
                        r30.sel.R_B_FREQ_9.val(data[0]);
                        r30.sel.R_B_FREQ_10.val(data[1]);
                    }

                    if (mem_name !== null)      {
                        r30.sel.R_B_FREQ_NAME.html(mem_name);
                    } else {
                        r30.sel.R_B_FREQ_NAME.html('----------');
                    }

                    if (receive_mode !== null)  {
                        r30.func.func_get_receive_mode(band, receive_mode);
                    }
                }
            },
            func_get_rf_gain                : function (data = null) {
                if (data !== null) {
                    if (data !== r30.sel.R_RF_GAIN_SLIDER.result.from) {
                        r30.sel.R_RF_GAIN.data('from', data);
                        r30.sel.R_RF_GAIN_SLIDER.update({from: data});
                    }
                }
            },
            func_get_af_gain                : function (data = null) {
                if (data !== null) {
                    r30.sel.R_AF_GAIN.data('from', data);
                    r30.sel.R_AF_GAIN_SLIDER.update({from: data});
                }
            },
            func_get_dup                    : function (band = null, data = null) {
                if (band !== null) {
                    if (data !== null) {
                        r30.band[band].dup = data;

                        switch (true) {
                            case (data == 0) :
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                                } else {
                                    r30.sel.R_B_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                                }

                                break;
                            case (data == 1) :
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                                } else {
                                    r30.sel.R_B_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                                }

                                break;
                            case (data == 2) :
                                if (band == r30.const.BAND_A) {
                                    r30.sel.R_A_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_A_DUP_PLU.removeClass('badge-info').addClass('badge-success');
                                } else {
                                    r30.sel.R_B_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_DUP_PLU.removeClass('badge-info').addClass('badge-success');
                                }
                                break;
                        }
                    }
                } else {
                    if (data !== null) {
                        r30.band[r30.value.main_band].dup = data;
                    }
                }

            },
            func_get_anl                    : function (band = null, data = null) {
                if (data !== null) {
                    r30.band[band].anl = data;

                    if (r30.value.dual_band == true) {
                        if (band == r30.const.BAND_A) {
                            if (data == 0) {
                                r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                            }
                        } else {
                            if (data == 0) {
                                r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                            }
                        }
                    } else {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            if (data == 0) {
                                r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                            }
                        } else {
                            if (data == 0) {
                                r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                            }
                        }
                    }
                } else {
                    if (r30.value.main_band == r30.const.BAND_A) {
                        if (r30.band[0].anl == 0) {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    } else {
                        if (r30.band[1].anl == 0) {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    }
                }
            },
            func_get_afc                    : function (band = null, data = null) {
                if (data !== null) {
                    if (band == r30.const.BAND_A) {
                        if (data == 0) {
                            r30.sel.R_A_AFC.removeClass('badge-success').addClass('badge-info');
                            r30.band[band].afc = 0;
                        } else {
                            r30.sel.R_A_AFC.removeClass('badge-info').addClass('badge-success');
                            r30.band[band].afc = 1;
                        }
                    } else {
                        if (data == 0) {
                            r30.sel.R_B_AFC.removeClass('badge-success').addClass('badge-info');
                            r30.band[band].afc = 0;
                        } else {
                            r30.sel.R_B_AFC.removeClass('badge-info').addClass('badge-success');
                            r30.band[band].afc = 1;
                        }
                    }
                }
            },
            func_get_att                    : function (band = null, data = null) {
                if (data !== null) {
                    r30.band[band].att = data;

                    switch (true) {
                        case (data == 0) :
                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            }
                            break;
                        case (data == 1) :
                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            }
                            break;
                        case (data == 2) :
                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                            }
                            break;
                        case (data == 3) :
                            if (band == r30.const.BAND_A) {
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                            }
                            break;
                    }
                } else {
                    if (r30.value.dual_band == false) {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            switch (true) {
                                case (r30.band[0].att == 0) :
                                        r30.sel.R_A_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                        r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[0].att == 1) :
                                        r30.sel.R_A_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                        r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[0].att == 2) :
                                        r30.sel.R_A_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                        r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[0].att == 3) :
                                        r30.sel.R_A_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                        r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                        r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                    break;
                            }
                        } else {
                            switch (true) {
                                case (r30.band[1].att == 0) :
                                    r30.sel.R_B_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[1].att == 1) :
                                    r30.sel.R_B_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[1].att == 2) :
                                    r30.sel.R_B_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                    break;
                                case (r30.band[1].att == 3) :
                                    r30.sel.R_B_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                    r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                    r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                    break;
                            }
                        }
                    }
                }
            },
            func_get_noise_blanker_status   : function (band = null, data = null) {
                if (band !== null) {
                    if (data !== null) {
                        r30.band[band].noise_blanker = data;

                        if (band == r30.const.BAND_A) {
                            if (data == 0) {
                                r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_A_NB.removeClass('badge-info').addClass('badge-success')
                            }
                        } else {
                            if (data == 0) {
                                r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_NB.removeClass('badge-info').addClass('badge-success')
                            }
                        }
                    } else {
                        r30.band[band].noise_blanker = 0;
                    }
                } else {
                    if (data !== null) {
                        r30.band[r30.value.main_band].noise_blanker = data;

                        if (r30.value.main_band == r30.const.BAND_A) {
                            if (data == 0) {
                                r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_A_NB.removeClass('badge-info').addClass('badge-success')
                            }
                        } else {
                            if (data == 0) {
                                r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                            } else {
                                r30.sel.R_B_NB.removeClass('badge-info').addClass('badge-success')
                            }
                        }
                    } else {
                        r30.band[r30.value.main_band].noise_blanker = 0;

                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                        }
                    }
                }

            },
            func_get_tuning_step            : function (band = null, data = null) {
                if (band !== null) {
                    if (data !== null) {
                        if (band == r30.const.BAND_A) {
                            r30.sel.R_A_TUNING_STEP.val(data);
                            r30.sel.R_A_TUNING_STEP.trigger('change');
                        } else {
                            r30.sel.R_B_TUNING_STEP.val(data);
                            r30.sel.R_B_TUNING_STEP.trigger('change');
                        }
                    }
                } else {
                    if (data !== null) {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_TUNING_STEP.val(data);
                            r30.sel.R_A_TUNING_STEP.trigger('change');
                        } else {
                            r30.sel.R_B_TUNING_STEP.val(data);
                            r30.sel.R_B_TUNING_STEP.trigger('change');
                        }
                    }
                }

            },
            func_get_vsc                    : function (band = null, data = null) {
                if (data !== null) {
                    switch (true) {
                        case (data == r30.const.VSC.OFF) :
                            if (band == r30.const.BAND_A) {
                                r30.band[r30.const.BAND_A].vsc = r30.const.VSC.OFF;
                                r30.sel.R_A_VSC.addClass('badge-info').removeClass('badge-success');
                            } else {
                                r30.band[r30.const.BAND_B].vsc = r30.const.VSC.OFF;
                                r30.sel.R_B_VSC.addClass('badge-info').removeClass('badge-success');
                            }
                        break;
                        case (data == r30.const.VSC.ON) :
                            if (band == r30.const.BAND_A) {
                                r30.band[r30.const.BAND_A].vsc = r30.const.VSC.ON;
                                r30.sel.R_A_VSC.addClass('badge-success').removeClass('badge-info');
                            } else {
                                r30.band[r30.const.BAND_B].vsc = r30.const.VSC.ON;
                                r30.sel.R_B_VSC.addClass('badge-success').removeClass('badge-info');
                            }
                        break;
                    }
                }
            },
            func_get_scan_type              : function (band = null, data = null) {
                // TODO : web.js r30.func.func_get_scan_type
            },
            func_get_scan_condition         : function (data = null) {
                if (data !== null && data[0] !== "" && data[1] !== "") {
                    r30.band[0].scan = data[0].scan;
                    r30.band[1].scan = data[1].scan;
                    r30.band[0].scan_direction = data[0].scan_direction;
                    r30.band[1].scan_direction = data[1].scan_direction;

                    if (r30.band[0].scan == true) {
                        if (sched_a == null) {
                            sched_a = setInterval(r30.sched[0], r30.const.S_TIMER);
                        }

                        r30.sel.R_A_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        r30.sel.R_A_SCAN.removeClass('badge-success').addClass('badge-info');
                    }

                    if (r30.band[1].scan == true) {
                        if (sched_b == null) {
                            sched_b = setInterval(r30.sched[1], r30.const.S_TIMER);
                        }

                        r30.sel.R_B_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        r30.sel.R_B_SCAN.removeClass('badge-success').addClass('badge-info');
                    }
                } else {
                    if (r30.band[0].scan == true) {
                        if (sched_a == null) {
                            sched_a = setInterval(r30.sched[0], r30.const.S_TIMER);
                        }

                        r30.sel.R_A_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        r30.sel.R_A_SCAN.removeClass('badge-success').addClass('badge-info');
                    }

                    if (r30.band[1].scan == true) {
                        if (sched_b == null) {
                            sched_b = setInterval(r30.sched[1], r30.const.S_TIMER);
                        }

                        r30.sel.R_B_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        r30.sel.R_B_SCAN.removeClass('badge-success').addClass('badge-info');
                    }
                }
            },
            func_get_memory_group_list      : function (data = null) {
                function minTwoDigits(n) {
                    return (n < 10 ? '0' : '') + n;
                }

                let array = data.split(',');
                let text = [];
                let d = 1;

                if (array.length === 241) {
                    for (let i = 1; i <= 240; i++) {
                        text.push(String.fromCharCode('0x'+array[i]));
                        if (d == 16) {
                            if (r30.value.bank_counter <=99) {
                                $('#R_MEMORY_BANK').append($('<option>', {
                                    value: minTwoDigits('MB_' + r30.value.bank_counter),
                                    text: minTwoDigits(r30.value.bank_counter) + ' : ' + text.join('')
                                })).trigger('change');

                                r30.value.memory_banks[minTwoDigits(r30.value.bank_counter)] = text.join('');
                            }
                            r30.value.bank_counter++;

                            text.splice(0,text.length);
                            d = 1;
                        } else {
                            d++;
                        }
                    }
                }

            },
            func_get_memory_group_name      : function (band = null, data = null) {
                // TODO : 0009 Returned 000 . because of auto mw

                if (band !== null) {
                    if (data !== null) {
                        if (band == r30.const.BAND_A) {
                            r30.sel.R_A_MEMORY_GROUP_NAME.html(r30.value.memory_banks[data.substring(2)]);
                        } else {
                            r30.sel.R_B_MEMORY_GROUP_NAME.html(r30.value.memory_banks[data.substring(2)]);
                        }
                    } else {
                        if (band == r30.const.BAND_A) {
                            r30.sel.R_A_MEMORY_GROUP_NAME.html('Unknown Bank');
                        } else {
                            r30.sel.R_B_MEMORY_GROUP_NAME.html('Unknown Bank');
                        }
                    }
                } else {
                    if (data !== null) {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_MEMORY_GROUP_NAME.html(r30.value.memory_banks[data.substring(2)]);
                        } else {
                            r30.sel.R_B_MEMORY_GROUP_NAME.html(r30.value.memory_banks[data.substring(2)]);
                        }
                    } else {
                        if (r30.value.main_band == r30.const.BAND_A) {
                            r30.sel.R_A_MEMORY_GROUP_NAME.html('Unknown Bank');
                        } else {
                            r30.sel.R_B_MEMORY_GROUP_NAME.html('Unknown Bank');
                        }
                    }
                }
            },
            func_get_skip_mode              : function (band = null, data = null) {
                if (data !== null) {
                    if (band == r30.const.BAND_A) {
                        switch (true) {
                            case (data == r30.const.SKIP_MODE.OFF) :
                                r30.sel.R_A_SKIP_OFF.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_A_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                            case (data == r30.const.SKIP_MODE.SKIP) :
                                r30.sel.R_A_SKIP_SKIP.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_A_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                            case (data == r30.const.SKIP_MODE.PSKIP) :
                                r30.sel.R_A_SKIP_PSKIP.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_A_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                        }

                    } else {
                        switch (true) {
                            case (data == r30.const.SKIP_MODE.OFF) :
                                r30.sel.R_B_SKIP_OFF.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_B_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (data == r30.const.SKIP_MODE.SKIP) :
                                r30.sel.R_B_SKIP_SKIP.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_B_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (data == r30.const.SKIP_MODE.PSKIP) :
                                r30.sel.R_B_SKIP_PSKIP.addClass('badge-success').removeClass('badge-info');
                                r30.sel.R_B_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                                break;
                        }
                    }
                }
            },

        },
        cmd         : {
            // ##########################
            // # Execute Commands
            // ##########################
            // TODO : r30.cmd.set_on_off
            set_on_off                  : function () {
                //queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x03', 'data': '0x01', 'timestamp' : r30.timestamp()}));
            },
            set_up_down                 : function (direction = 'u') {
                if (direction === 'u') {
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x03', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                } else {
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x03', 'data': '0x00', 'timestamp' : r30.timestamp()}));
                }

                return true;
            },
            set_single_dual_band_mode   : function (dual = false) {
                if (dual === false) {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': '0x00', 'timestamp' : r30.timestamp()}));

                    r30.func.func_set_msg(false, 'Single Band mode initiated.');
                } else {
                    queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': '0x01', 'timestamp' : r30.timestamp()}));

                    r30.func.func_set_msg(false, 'Dual Band mode initiated.');
                }

                return true;
            },
            set_band                    : function () {
                if (r30.value.main_band == r30.const.BAND_A) {
                    queue.add(JSON.stringify({'cmd':['0x07'], 'subcmd': '0xD1', 'data': null, 'timestamp' : r30.timestamp()}));
                    r30.func.func_set_msg(false, 'Switch Band to B initiated.');
                    if (r30.band["1"].scan === false) {
                        r30.value.main_band = 1;
                    }
                } else {
                    queue.add(JSON.stringify({'cmd':['0x07'], 'subcmd': '0xD0', 'data': null, 'timestamp' : r30.timestamp()}));
                    r30.func.func_set_msg(false, 'Switch Band to A initiated.');
                    if (r30.band["0"].scan === false) {
                        r30.value.main_band = 0;
                    }
                }

                return true;
            },
            set_frequency               : function () {
                let freq1, freq2, freq3, freq4, freq5, freq6, freq7, freq8, freq9, freq10;

                if (r30.value.main_band == r30.const.BAND_A) {
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
                if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO) {
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x02', 'data': ["0x" +freq9+freq10, "0x" +freq7+freq8, "0x" +freq5+freq6, "0x" +freq3+freq4, "0x" +freq1+freq2], 'timestamp' : r30.timestamp()}));

                    // TODO : add Band B Check for Freq <= 108  MHZ not possible
                    r30.func.func_set_msg(false, 'Frequency ['+freq1+'.'+freq2+freq3+freq4+'.'+freq5+freq6+freq7+'.'+freq8+freq9+freq10+'] was set.');
                }

                return true;
            },
            set_scan_stop               : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0A', '0x01'], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            set_scan_start              : function (scan_option = null) {
                if (scan_option !== null) {
                    // TODO : Missing Group number / and scan type
                    // #################################################
                    // # VFO
                    // #################################################
                    if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO) {
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
                    if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.MEM) {
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
            set_recording               : function (band = null) {
               if (r30.band[band].rec == false) {
                   r30.band[band].rec = true;
                   queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x09'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
               } else {
                   r30.band[band].rec = false;
                   queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x09'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
               }

                return true;
            },
            set_af_gain_level           : function (af_level = null) {
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

                r30.func.func_set_msg(false, 'AF Gain was set to '+af_level+' for band '+ ((r30.value.main_band == r30.const.BAND_A) ? 'A' : 'B'));

                return true;
            },
            set_rf_gain_level           : function (rf_level = null) {
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

                r30.func.func_set_msg(false, 'RF Gain was set to '+rf_level+' for band '+ ((r30.value.main_band == r30.const.BAND_A) ? 'A' : 'B'));

                return true;
            },
            set_squelch_level           : function (squelch_level = null, squelch_label = null) {
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

                r30.func.func_set_msg(false, 'Squelch was set to '+squelch_label[squelch_level]+' for band '+ ((r30.value.main_band == r30.const.BAND_A) ? 'A' : 'B'));

                return true;
            },
            set_noise_blanker_status    : function () {
                // 6 = CW / 11 = CW-R / 1 = LSB
                if (r30.band[r30.value.main_band].receive_mode == 6 || r30.band[r30.value.main_band].receive_mode == 11 || r30.band[r30.value.main_band].receive_mode == 1) {
                    if (r30.band[r30.value.main_band].noise_blanker !== null) {
                        if (r30.band[r30.value.main_band].noise_blanker == 1) {
                            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x00', 'timestamp' : r30.timestamp()}));
                            r30.band[r30.value.main_band].noise_blanker = 0;
                        } else {
                            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                            r30.band[r30.value.main_band].noise_blanker = 1;
                        }
                    } else {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                        r30.band[r30.value.main_band].noise_blanker = 1;
                    }
                } else {
                    r30.func.func_set_msg(true, "Noise Blanker [NB] only in CW and LSB usable.");
                }

                return true;
            },
            set_receive_mode            : function (receive_mode = null) {
                if (receive_mode !== null) {
                    switch (true) {
                        case (receive_mode == r30.const.RECEIVE_MODE.LSB) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x00','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [LSB] set.');
                        break; // LSB
                        case (receive_mode == r30.const.RECEIVE_MODE.USB) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x01','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [USB] set.');
                        break; // USB
                        case (receive_mode == r30.const.RECEIVE_MODE.AM) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x02','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [AM] set.');
                            break; // AM
                        case (receive_mode == r30.const.RECEIVE_MODE.AM_N) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x02','0x02'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [AM-N] set.');
                            break; // AM-N
                        case (receive_mode == r30.const.RECEIVE_MODE.CW) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x03','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [CW] set.');
                            break; // CW
                        case (receive_mode == r30.const.RECEIVE_MODE.FM) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x05','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [FM] set.');
                            break; // FM
                        case (receive_mode == r30.const.RECEIVE_MODE.FM_N) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x05','0x02'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [FM-N] set.');
                            break; // FM-N
                        case (receive_mode == r30.const.RECEIVE_MODE.WFM) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x06','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [WFM] set.');
                            break; // WFM
                        case (receive_mode == r30.const.RECEIVE_MODE.CW_R) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x07','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [CW-R] set.');
                            break; // CW-R
                        case (receive_mode == r30.const.RECEIVE_MODE.P25) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x16','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [P25] set.');
                            break; // P25
                        case (receive_mode == r30.const.RECEIVE_MODE.D_STAR) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x17','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [D-STAR] set.');
                            break; // D-STAR
                        case (receive_mode == r30.const.RECEIVE_MODE.DPMR) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x18','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [dPMR] set.');
                            break; // dPMR
                        case (receive_mode == r30.const.RECEIVE_MODE.NXDN_VN) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x19','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [NXDN-VN] set.');
                            break; // NXDN-VN
                        case (receive_mode == r30.const.RECEIVE_MODE.NXDN_N) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x20','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [NXDN-N] set.');
                            break; // NXDN-N
                        case (receive_mode == r30.const.RECEIVE_MODE.DCR) :
                            queue.add(JSON.stringify({'cmd':['0x06'], 'subcmd': null, 'data': ['0x21','0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Receive Mode [DCR] set.');
                            break; // DCR
                    }

                }

                return true;
            },
            set_tuning_step             : function (tuning_step = null) {
                if (tuning_step !== null) {
                    queue.add(JSON.stringify({'cmd':['0x10'], 'subcmd': null, 'data': ['0x' + tuning_step], 'timestamp' : r30.timestamp()}));

                }

                return true;
            },
            set_att                     : function (attenuator = null) {
                if (attenuator !== null) {
                    r30.band[r30.value.main_band].att = attenuator;
                    queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x' + attenuator], 'timestamp' : r30.timestamp()}));
                } else {
                    switch (true) {
                        case (r30.band[r30.value.main_band].att == 0) :
                            r30.band[r30.value.main_band].att = 1;
                            queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x15'], 'timestamp' : r30.timestamp()}));
                        break;
                        case (r30.band[r30.value.main_band].att == 1) :
                            r30.band[r30.value.main_band].att = 2;
                            queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x30'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (r30.band[r30.value.main_band].att == 2) :
                            r30.band[r30.value.main_band].att = 3;
                            queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x45'], 'timestamp' : r30.timestamp()}));
                            break;
                        case (r30.band[r30.value.main_band].att == 3) :
                            r30.band[r30.value.main_band].att = 0;
                            queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                        break;
                    }
                }

                return true;
            },
            set_vsc                     : function () {
                if (
                    (r30.band[r30.value.main_band].receive_mode == r30.const.RECEIVE_MODE.FM) ||
                    (r30.band[r30.value.main_band].receive_mode == r30.const.RECEIVE_MODE.FM_N) ||
                    (r30.band[r30.value.main_band].receive_mode == r30.const.RECEIVE_MODE.WFM) ||
                    (r30.band[r30.value.main_band].receive_mode == r30.const.RECEIVE_MODE.AM) ||
                    (r30.band[r30.value.main_band].receive_mode == r30.const.RECEIVE_MODE.AM_N)
                ) {
                    if (r30.band[r30.value.main_band].vsc == r30.const.VSC.OFF) {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4C'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                        r30.func.func_set_msg(false, 'VSC [ON] initiated.');
                    } else {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4C'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                        r30.func.func_set_msg(false, 'VSC [OFF] initiated.');
                    }
                } else {
                    r30.func.func_set_msg(true, 'VSC only for [FM, FM-N, WFM, AM and AM-N].');
                }

                return true;
            },
            set_tsql                    : function (tsql_status = null) {
                queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x43'], 'data': ['0x' + tsql_status], 'timestamp' : r30.timestamp()}));

                return true;
            },
            set_afc                     : function (afc_status = null) {
                if (r30.band[r30.value.main_band].receive_mode == 7 || r30.band[r30.value.main_band].receive_mode == 8 || r30.band[r30.value.main_band].receive_mode == 9 || r30.band[r30.value.main_band].receive_mode == 10) {
                    if (afc_status !== null) {
                        queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x' + afc_status], 'timestamp' : r30.timestamp()}));
                    } else {
                        if (r30.band[r30.value.main_band].afc == 0) {
                            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
                        } else {
                            queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': ['0x4A'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                        }
                    }
                } else {
                    r30.func.func_set_msg(true, 'Automatic Frequency Control [AFC] only in FM , FM-N or WFM usable.');
                }

                return true;
            },
            set_anl                     : function (anl_status = null) {
                if (r30.band[r30.value.main_band].receive_mode == 3 || r30.band[r30.value.main_band].receive_mode == 4 || r30.band[r30.value.main_band].receive_mode == 5) {
                    if (anl_status !== null) {
                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x0' + anl_status], 'timestamp' : r30.timestamp()}));
                        r30.band[r30.value.main_band].anl = anl_status;
                    } else {
                        if (r30.band[r30.value.main_band].anl == 0) {
                            r30.band[r30.value.main_band].anl = 1;
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Automatic Noise Limiter [ANL] enabled.');
                        } else {
                            r30.band[r30.value.main_band].anl = 0;
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x00'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                            r30.func.func_set_msg(false, 'Automatic Noise Limiter [ANL] disabled.');
                        }
                    }
                } else {
                    r30.func.func_set_msg(true, 'Automatic Noise Limiter [ANL] only in AM usable.');
                }

                return true;
            },
            set_dup                     : function (duplex_status = null) {
                // TODO : set_dup
                if (duplex_status !== null) {
                    queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x1'+ duplex_status], 'data': null, 'timestamp' : r30.timestamp()}));
                } else {
                    if (r30.band[r30.value.main_band].dup == 0) {
                        queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                    }

                    if (r30.band[r30.value.main_band].dup == 1) {
                        queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x12'], 'data': null, 'timestamp' : r30.timestamp()}));
                    }

                    if (r30.band[r30.value.main_band].dup == 2) {
                        queue.add(JSON.stringify({'cmd':['0x0F'], 'subcmd': ['0x10'], 'data': null, 'timestamp' : r30.timestamp()}));
                    }
                }

                return true;
            },
            set_memory_group            : function (group_nr = null) {
                function minTwoDigits(n) {
                    return (n < 10 ? '0' : '') + n;
                }
                // TODO : Missing Auto Memory und Skip Ch
                queue.add(JSON.stringify({'cmd':['0x08'], 'subcmd': ['0xA0','0x00','0x'+minTwoDigits(group_nr)], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            set_channel                 : function (channel_nr = null) {
                function minTwoDigits(n) {
                    return (n < 10 ? '0' : '') + n;
                }
                // TODO : Missing Auto Memory und Skip Ch
                queue.add(JSON.stringify({'cmd':['0x08'], 'subcmd': ['0x00','0x'+minTwoDigits(channel_nr)], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            set_skip_mode               : function (pskip = false) {
                if (pskip == false) {
                    // Send Temporary Skip
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                    r30.func.func_set_msg(false, 'T-SKIP was set.');
                } else {
                    // Send Permanent Skip
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                    r30.func.func_set_msg(false, 'P-SKIP was set.');
                }

                return true;
            },
            set_operating_mode          : function (band = null, operation_mode = null) {
                if (band !== null) {
                    if (operation_mode !== null) {
                        r30.band[band].operation_mode = operation_mode;
                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x0'+operation_mode], 'timestamp' : r30.timestamp()}));
                    } else {
                        if (r30.band[band].operation_mode == r30.const.OPERATION_MODE.VFO) {
                            // Switch from VFO to Memory Mode
                            r30.band[band].operation_mode = r30.const.OPERATION_MODE.MEM;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                            return true;
                        }

                        if (r30.band[band].operation_mode == r30.const.OPERATION_MODE.MEM) {
                            // Switch to Memory to WX or VFO
                            if (r30.value.usa == true) {
                                r30.band[band].operation_mode = r30.const.OPERATION_MODE.WX;

                                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                                return true;
                            } else {
                                r30.band[band].operation_mode = r30.const.OPERATION_MODE.VFO;

                                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                                return true;
                            }
                        }

                        if (r30.band[band].operation_mode == r30.const.OPERATION_MODE.WX) {
                            // Switch to WX to VFO
                            r30.band[band].operation_mode = r30.const.OPERATION_MODE.VFO;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                            return true;
                        }
                    }
                } else {
                    if (operation_mode !== null) {
                        r30.band[r30.value.main_band].operation_mode = operation_mode;

                        queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x0'+operation_mode], 'timestamp' : r30.timestamp()}));

                        return true;
                    } else {
                        if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.VFO) {
                            // Switch from VFO to Memory Mode
                            r30.band[r30.value.main_band].operation_mode = r30.const.OPERATION_MODE.MEM;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x01'], 'timestamp' : r30.timestamp()}));

                            return true;
                        }

                        if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.MEM) {
                            // Switch from Memory to WX or VFO
                            if (r30.value.usa == true) {
                                r30.band[r30.value.main_band].operation_mode = r30.const.OPERATION_MODE.WX;

                                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));

                            } else {
                                r30.band[r30.value.main_band].operation_mode = r30.const.OPERATION_MODE.VFO;

                                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));
                            }

                            return true;
                        }

                        if (r30.band[r30.value.main_band].operation_mode == r30.const.OPERATION_MODE.WX) {
                            // Switch to WX to VFO
                            r30.band[r30.value.main_band].operation_mode = r30.const.OPERATION_MODE.VFO;

                            queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x04'], 'data': ['0x00'], 'timestamp' : r30.timestamp()}));

                            return true;
                        }
                    }
                }

                return true;
            },
            set_audio_level_synchronize : function () {
                if (r30.value.audio_mode == 0) {
                    r30.func.func_set_msg(false, 'Audio level separate.');
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': '0x01', 'timestamp' : r30.timestamp()}));
                } else {
                    r30.func.func_set_msg(false, 'Audio level synchronized.');
                    queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': '0x00', 'timestamp' : r30.timestamp()}));
                }

                return true;
            },

            // ##########################
            // # Read Commands
            // ##########################

            get_receiver_id             : function () {
                queue.add(JSON.stringify({'cmd':['0x19'], 'subcmd': ['0x00'], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_display_content         : function (init = false, band = null) {
                if (init == false) {
                    if (band == null) {
                        if (r30.value.dual_band == true) {
                            if (r30.band[r30.const.BAND_A].scan == true) {
                                queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                            }

                            queue.add(JSON.stringify({'cmd':['0x29', '0x00'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));


                            if (r30.band[r30.const.BAND_B].scan == true) {
                                queue.add(JSON.stringify({'cmd': ['0x29', '0x01'], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp': r30.timestamp()}));
                            }

                            queue.add(JSON.stringify({'cmd':['0x29', '0x01'], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                        } else {
                            if (r30.value.main_band !== null) {
                                if (r30.value.main_band == r30.const.BAND_A) {

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
                            if (r30.band[r30.const.BAND_A].scan == true) {
                                queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp' : r30.timestamp()}));
                            }

                            queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));


                            if (r30.band[r30.const.BAND_B].scan == true) {
                                queue.add(JSON.stringify({'cmd': ['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x11'], 'data': null, 'timestamp': r30.timestamp()}));
                            }

                            queue.add(JSON.stringify({'cmd':['0x29', '0x0'+band], 'subcmd': ['0x1A', '0x12'], 'data': null, 'timestamp' : r30.timestamp()}));

                        } else {
                            if (r30.value.main_band !== null) {
                                if (r30.value.main_band == r30.const.BAND_A) {

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
            get_duplex_setting          : function () {
                // FIXME : In single request not working
                // queue.add(JSON.stringify({'cmd':'0x0F', 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_receive_freq            : function () {
                queue.add(JSON.stringify({'cmd':['0x03'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_receive_mode            : function () {
                queue.add(JSON.stringify({'cmd':['0x04'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_tuning_step             : function () {
                queue.add(JSON.stringify({'cmd':['0x10'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_attenuator              : function () {
                queue.add(JSON.stringify({'cmd':['0x11'], 'subcmd': null, 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_af_gain_level           : function () {
                queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x01', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_rf_gain_level           : function () {
                queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x02', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_squelch_level           : function () {
                queue.add(JSON.stringify({'cmd':['0x14'], 'subcmd': '0x03', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_s_meter                 : function () {
                queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x01', 'data': null, 'timestamp' : r30.timestamp()}));

                queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x02', 'data': null, 'timestamp' : r30.timestamp()}));

                queue.add(JSON.stringify({'cmd':'0x15', 'subcmd': '0x03', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_noise_blanker_status    : function () {
                queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x22', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_display_type            : function () {
                queue.add(JSON.stringify({'cmd':['0x16'], 'subcmd': '0x59', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_record_mode             : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x09', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_operation_mode          : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x04', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_audio_level_synchronize : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x06', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_anl                     : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': '0x00', 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_scan_condition          : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0B'], 'data': ['0x02'], 'timestamp' : r30.timestamp()}));


                return true;
            },
            get_scan_type               : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x0C'], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
            get_memory_group_name       : function (memory_bank_nr = null) {
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
            get_skip_mode               : function () {
                queue.add(JSON.stringify({'cmd':['0x1A'], 'subcmd': ['0x08'], 'data': null, 'timestamp' : r30.timestamp()}));

                return true;
            },
        },
        sched       :  {
            0 : function () {
                r30.cmd.get_display_content(false, r30.const.BAND_A);
                //console.log("Scheduler Band A");
            },
            1 : function () {
                r30.cmd.get_display_content(false, r30.const.BAND_B);
                //console.log("Scheduler Band B");
            }
            //r30.cmd.get_scan_condition();
            //r30.cmd.get_s_meter();
            //r30.cmd.get_anl();
            //r30.cmd.get_operation_mode();
            //r30.cmd.get_attenuator();
            //r30.cmd.get_record_mode();
            //r30.cmd.get_duplex_setting();
            ////r30.cmd.get_memory_group_name();


            //r30.cmd.get_tuning_step();
            /** Fixed **/

            // TODO : Scheduler Stop for each bank

            /** Test **/

        },
        init        : function () {
            if (socket.connected) {
                /** Fixed **/

                r30.cmd.get_af_gain_level();
                r30.cmd.get_rf_gain_level();
                r30.cmd.get_squelch_level();
                r30.cmd.get_audio_level_synchronize();
                r30.cmd.get_scan_condition();
                r30.cmd.get_display_type();
                r30.cmd.get_display_content(true);
                r30.cmd.get_tuning_step();
                r30.cmd.get_memory_group_name();

                /** Test **/



                //r30.cmd.get_noise_blanker_status();
                //r30.cmd.set_noise_blanker_status(0);
                //r30.cmd.get_scan_condition();
                //r30.cmd.get_display_content();
                //r30.cmd.get_test();
                //r30.cmd.get_memory_group_name();
            } else {
                r30.func.func_set_msg(true,'Socket failed' + socket.connected);
            }
        }
    };

    r30.html();
    r30.button();
    r30.connect();
    r30.disconnect();
    // #################################################
    // # 400 best value
    // #################################################

    window.onfocus = function() {
        queue.clear();
        // TODO : Start Scheduler
    };
    window.onblur = function() {
        // TODO : Stop Scheduler
    };
});

