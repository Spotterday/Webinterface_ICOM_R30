let socket      = io().connect();
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
    value   : {
        serialbaudrate      : 9600,
        usa                 : false,
        active_band         : {
            0 : false,
            1 : false,
        },
        dual_band           : false,    // Scanner in dual mode modus or single band modus
        main_band           : null,     // Which bank has main indication
        data_band           : null,     // For which bank is the data
        bank_counter        : 0,
        table_receive_log   : null,
        memory_banks        : {},
        audio_mode          : 0,
    },
    // ##########################
    // # Functions
    // ##########################
    /**
     *
     * @param {null|number} band
     * @param {null|array} freq
     * @param {null|string} freq_name
     */
    log         : function (band = null, freq = null, freq_name = null) {
        if (band !== null) {
            if (freq !== null) {
                if (settings[band].smeter > 0) {
                    let timestamp   = r30.timestamp(false);
                    let md5         = $.MD5(freq[8] +'.'+ freq[9] +''+ freq[6] +''+ freq[7] +'.'+ freq[4] +''+ freq[5] +''+ freq[2] +'.'+ freq[3] +''+ freq[0] +''+ freq[1] + timestamp);

                    if ($('#R_' + md5).length <= 0) {

                        r30.value.table_receive_log.row.add([
                            (band == constant.BAND_A) ? 'Band A' : 'Band B',
                            freq[8] +'.'+ freq[9] +''+ freq[6] +''+ freq[7] +'.'+ freq[4] +''+ freq[5] +''+ freq[2] +'.'+ freq[3] +''+ freq[0] +''+ freq[1],
                            freq_name,
                            timestamp
                        ]).node().id = 'R_'+md5;

                        r30.value.table_receive_log.draw( false );
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    },
    /**
     *
     * @param {boolean} failed
     * @param {null|string} content
     * @returns {boolean}
     */
    msg         : function (failed = false, content = null) {
        if (failed == false) {
            if (content !== null) {
                new PNotify({
                    title: 'Command successful',
                    text: content,
                    addclass: 'alert bg-success border-success alert-styled-right',
                    type: 'success'
                });
            } else {
                return false;
            }
        } else {
            if (content !== null) {
                new PNotify({
                    title: 'Command failed',
                    text: content,
                    addclass: 'alert bg-danger border-danger alert-styled-right',
                    type: 'error'
                });
            } else {
                return false;
            }
        }

        return true;
    },
    /**
     * @param {boolean} show_sec
     * @returns {string}
     */
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

            r30.sel.R_SOCKET_STATUS.removeClass('bg-danger')
            r30.sel.R_SOCKET_STATUS.addClass('bg-success');
            r30.sel.R_SOCKET_STATUS.html('Online');

            /** Start any actions after socket is successfully started **/
            setTimeout(function() {
                r30.data();
                r30.status();
                r30.audio();

                queue.WebSocket = socket;
                queue.start();

                r30.init();

                // TODO: URL automatically
                setTimeout(function() {
                    r30.sel.R_AUDIO.attr('src', 'http://192.168.10.9:8888/air.mp3?nocache=' + Math.floor((Math.random() * 1000000) + 1));
                }, 1000);
            }, 500);
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
    status      : function () {
        // TODO : Change connection details from data section to status section
        socket.on('status', function (data = null) {
            if (data !== null) {
                let obj = JSON.parse(data);

                if (obj.debugweb == true) {
                    console.log(data);
                }

                r30.value.usa = obj.usa;

                $('#R_VERSION_WEB').html(obj.versionweb);
                $('#R_VERSION_SERVER').html(obj.versionserver);

                r30.value.serialbaudrate = obj.serialbaudrate;

                if (typeof obj.statusbluetooth !== 'undefined' && obj.statusbluetooth !== null) {
                    if (obj.statusbluetooth === true) {
                        r30.sel.R_BLUETOOTH_STATUS.removeClass('bg-danger');
                        r30.sel.R_BLUETOOTH_STATUS.addClass('bg-success');
                        r30.sel.R_BLUETOOTH_STATUS.html('Online');
                    }

                    if (obj.statusbluetooth === false) {
                        r30.sel.R_BLUETOOTH_STATUS.removeClass('bg-success');
                        r30.sel.R_BLUETOOTH_STATUS.addClass('bg-danger');
                        r30.sel.R_BLUETOOTH_STATUS.html('Offline');
                    }
                } else {
                    r30.sel.R_BLUETOOTH_STATUS.removeClass('bg-success');
                    r30.sel.R_BLUETOOTH_STATUS.addClass('bg-danger');
                    r30.sel.R_BLUETOOTH_STATUS.html('Offline');
                }

                if (typeof obj.statusserial !== 'undefined') {
                    if (obj.statusserial === true) {
                        r30.sel.R_SERIAL_STATUS.removeClass('bg-danger');
                        r30.sel.R_SERIAL_STATUS.addClass('bg-success');
                        r30.sel.R_SERIAL_STATUS.html('Online');
                    }

                    if (obj.statusserial === false) {
                        r30.sel.R_SERIAL_STATUS.removeClass('bg-success');
                        r30.sel.R_SERIAL_STATUS.addClass('bg-danger');
                        r30.sel.R_SERIAL_STATUS.html('Offline');
                    }
                } else {
                    r30.sel.R_SERIAL_STATUS.removeClass('bg-success');
                    r30.sel.R_SERIAL_STATUS.addClass('bg-danger');
                    r30.sel.R_SERIAL_STATUS.html('Offline');
                }

                if (obj.statusserial === false && obj.statusbluetooth === false) {
                    r30.sel.R_RECONNECT_SWITCH.prop('checked', false);
                } else {
                    r30.sel.R_RECONNECT_SWITCH.prop('checked', true);
                }
            }
        });
    },
    data        : function () {
        socket.on('data', function (data = null) {
            if (data !== null) {
                let obj = JSON.parse(data);

                if (obj.debugweb == true) {
                    console.log(data);
                }
                switch (true) {
                    case (obj.cmd == "FB") :
                        request.get.display_content(false);
                    break;
                    case (obj.cmd == "00") :
                        response.frequency(r30.value.main_band, JSON.parse(obj.cmdres));
                    break;
                    case (obj.cmd == "01") :
                        response.frequency(r30.value.main_band, null, obj.cmdres)
                        break;
                    case (obj.cmd == "03") :
                        response.frequency(r30.value.main_band, JSON.parse(obj.cmdres));
                    break;
                    case (obj.cmd == "04") :
                        response.receive_mode(r30.value.main_band, obj.cmdres)
                    break;
                    case (obj.cmd == "07") :
                        // Only FB or FA Feedback
                    break;
                    case (obj.cmd == "08") :
                        // Only FB or FA Feedback
                    break;
                    case (obj.cmd == "10") :
                        response.tuning_step(r30.value.main_band, obj.cmdres);
                        break;
                    case (obj.cmd == "11") :
                        response.att(r30.value.main_band, obj.cmdres);
                    break;
                    case (obj.cmd == "14") :
                        switch (true) {
                            case (obj.subcmd == "01"):
                                response.af_gain(obj.cmdres);
                                break;
                            case (obj.subcmd == "02"):
                                response.rf_gain(obj.cmdres);
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
                                response.squelch_status(r30.value.main_band, obj.cmdres);
                                break;
                            case (obj.subcmd == "02"):
                                response.s_meter(r30.value.main_band, obj.cmdres);
                                break;
                            case (obj.subcmd == "05"):
                                // TODO : CMD 15 - SUB 05
                                break;
                        }
                    break;
                    case (obj.cmd == "16") :
                        switch (true) {
                            case (obj.subcmd == "4A"):
                                response.afc(r30.value.main_band,obj.cmdres);
                                break;
                            case (obj.subcmd == "4C"):
                                response.vsc(r30.value.main_band,obj.cmdres);
                            break;
                            case (obj.subcmd == "22"):
                                response.noise_blanker_status(r30.value.main_band,obj.cmdres);
                                break;
                            case (obj.subcmd == "59"):
                                // 00=Single band display, 01=Dual band display
                                response.display_type(obj.cmdres);
                                break;
                        }
                        break;
                    case (obj.cmd == "19") :
                        // R30 => 9C
                    break;
                    case (obj.cmd == "0F") :
                        response.dup(r30.value.main_band, obj.cmdres);
                    break;
                    case (obj.cmd == "1A") :
                        switch (true) {
                            case (obj.subcmd == "00"):
                                response.anl(r30.value.main_band, obj.cmdres);
                            break;
                            case (obj.subcmd == "04"):
                                response.operating_mode(r30.value.main_band, obj.cmdres);
                            break;
                            case (obj.subcmd == "06"):
                                response.audio_level_synchronize(obj.cmdres);
                                break;
                            case (obj.subcmd == "07"):
                                response.af_gain(obj.cmdres);
                            break;
                            case (obj.subcmd == "08"):
                                response.skip_mode(r30.value.main_band, obj.cmdres);
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

                                r30.log(data.band, freq, data.mem_name);
                                response.frequency(data.band, freq, data.mem_name, data.receive_mode);
                                response.recording_condition(data.band, data.rec);
                                response.select_band();
                                response.operating_mode(data.band, data.operation_mode);
                                response.anl(data.band, data.anl);
                                response.noise_blanker_status(data.band, data.nb);
                                response.afc(data.band, data.afc);
                                response.dup(data.band, data.dup);
                                response.att(data.band, data.att);
                                response.vsc(data.band, data.vsc);
                                response.skip_mode(data.band, data.skip_mode);
                                response.memory_group_name(data.band, data.mem_group_nr);
                                response.rf_gain(data.rf_gain);
                                response.squelch_status(data.band, data.squelch_status);
                            break;

                            case (obj.subcmd == "12"):
                                var data = JSON.parse(obj.cmdres);

                                // S-Meter show 2 bars but noting on CV-I - only squelch_status indication
                                // That is an working workaround ;)
                                if (data.s_meter_lvl == 0 && data.squelch_status == constant.SQUELCH_STATUS.OPEN) {
                                    response.s_meter(data.band, 5);
                                    response.squelch_status(data.band, data.squelch_status);
                                } else {
                                    response.s_meter(data.band, data.s_meter_lvl);
                                    response.squelch_status(data.band, data.squelch_status);
                                }

                            break;
                            case (obj.subcmd == "0B"):
                                if (obj.cmdres !== null) {
                                    try {
                                        var data = JSON.parse(obj.cmdres);
                                        response.scan_condition(data);
                                    } catch (e) {

                                    }
                                }
                            break;
                            case (obj.subcmd == "0C"):
                                // TODO: Scan Type not finished
                                response.scan_type();
                            break;
                            case (obj.subcmd == "0F"):
                                response.memory_group_list(obj.cmddata);
                            break;
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
            "order": [[ 3, "desc" ]]
        });

        r30.sel.R_AF_GAIN.ionRangeSlider({
            hide_min_max: true,
            min: 0,
            max: 39,
            grid: true,
            grid_num: 10,
            prefix: "AF Gain: ",
            onFinish: function (data) {
                request.set.af_gain_level(data.from);
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
                request.set.rf_gain_level(data.from);
            },
        });

        let squelch_label = ['Open', 'Auto', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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
                request.set.squelch_level(data.from, squelch_label);
            },
        });

        r30.sel.R_AF_GAIN_SLIDER = r30.sel.R_AF_GAIN.data("ionRangeSlider");
        r30.sel.R_RF_GAIN_SLIDER = r30.sel.R_RF_GAIN.data("ionRangeSlider");
        r30.sel.R_SQUELCH_LEVEL_SLIDER = r30.sel.R_SQUELCH_LEVEL.data("ionRangeSlider");

        // #################################################
        // # Scoll events for frequency
        // #################################################
        $(`input[name='R_A_FREQ_1'], input[name='R_A_FREQ_2'], input[name='R_A_FREQ_3'], input[name='R_A_FREQ_4'], input[name='R_A_FREQ_5'], input[name='R_A_FREQ_6'], input[name='R_A_FREQ_7'], input[name='R_A_FREQ_8'], input[name='R_A_FREQ_9'], input[name='R_A_FREQ_10'],input[name='R_B_FREQ_1'], input[name='R_B_FREQ_2'], input[name='R_B_FREQ_3'], input[name='R_B_FREQ_4'], input[name='R_B_FREQ_5'], input[name='R_B_FREQ_6'], input[name='R_B_FREQ_7'], input[name='R_B_FREQ_8'], input[name='R_B_FREQ_9'], input[name='R_B_FREQ_10']`).on("mousewheel", function(event, delta) {
            // TODO : https://stackoverflow.com/a/15629039
            // problem with Scroll down 9 => 0 results in 9 at 0
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
            if ($.inArray(e.key, ["0","1","2","3","4","5","6","7","8","9"]) !== -1) {
                this.value = e.key;
                $(this).next().focus();
            }
        });

        $(document).on('keypress',function(e) {
            if (e.key === "Enter") {
                if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {
                    request.set.frequency();
                } else {
                    request.set.operating_mode(r30.value.main_band, constant.OPERATION_MODE.VFO);

                    request.set.frequency();
                }
            }
        });
    },
    button      : function () {

        $('#R_BTN_REQ_VSC').on( "click", function(){
            request.set.vsc();
        });

        $('#R_A_FREQ_MODE').on('select2:select', function (e) {
            request.set.receive_mode(e.params.data.id);
        });

        $('#R_B_FREQ_MODE').on('select2:select', function (e) {
            request.set.receive_mode(e.params.data.id);
        });

        $('#R_RECONNECT_SWITCH').on( "click", function(){
            request.set.on()
            request.set.off();
        });

        $('#R_BTN_REQ_T_SKIP').on( "click", function(){
            request.set.skip_mode();
        });

        $('#R_BTN_REQ_P_SKIP').on( "click", function(){
            request.set.skip_mode(true);
        });

        $('#R_BTN_REQ_AUDIO').on( "click", function(){
            request.set.audio_level_synchronize();
            request.get.audio_level_synchronize();
        });

        $('#R_BTN_REQ_DUP').on( "click", function(){
            request.set.dup();
        });

        $('#R_BTN_REQ_SCAN').on( "click", function(){
            // TODO : web.js r30.button.R_BTN_REQ_SCAN
            // #################################################
            // # VFO Mode
            // #################################################
            if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {

                    if (settings[r30.value.main_band].scan == false) {
                        if (
                            $('#R_SCAN_SELECT option').filter(':selected').val() === "AL" ||
                            $('#R_SCAN_SELECT option').filter(':selected').val() === "AW" ||
                            $('#R_SCAN_SELECT option').filter(':selected').val() === "BA" ||
                            $('#R_SCAN_SELECT option').filter(':selected').val() === "TO"
                        ) {
                            settings[r30.value.main_band].scan = true;

                            request.set.scan_start($('#R_SCAN_SELECT option').filter(':selected').val());

                            if (r30.value.main_band == constant.BAND_A) {
                                //scheduler.start.BAND_A(true);

                                r30.msg(false, 'Scan Band A started.');
                            }

                            if (r30.value.main_band == constant.BAND_B) {
                                //scheduler.start.BAND_B(true);

                                r30.msg(false, 'Scan Band B started.');
                            }
                        } else {
                            r30.msg(true, 'Scan options in VFO mode only [ALL | BAND | TONE | AUTO MW] ');
                        }

                    } else {
                        if (r30.value.main_band == constant.BAND_A) {
                            settings[constant.BAND_A].scan = false;

                            //scheduler.stop.BAND_A();

                            request.set.scan_stop();

                            r30.msg(false, 'Scan stopped.');
                        }

                        if (r30.value.main_band == constant.BAND_B) {
                            settings[constant.BAND_B].scan = false;

                            //scheduler.stop.BAND_B();

                            request.set.scan_stop();

                            r30.msg(false, 'Scan stopped.');
                        }
                    }

            }

            // #################################################
            // # Memory Mode
            // #################################################
            if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.MEM) {
                if (settings[r30.value.main_band].scan == false) {

                    let value = $('#R_SCAN_SELECT option').filter(':selected').val();

                    if (
                        value === "AL" ||
                        value === "MO" ||
                        value === "NS" ||
                        value === "GL" ||
                        value.includes("MB")
                    ) {
                        settings[r30.value.main_band].scan = true;
                        request.set.scan_start(value);
                        request.get.scan_condition();

                        r30.msg(false, 'Scan started.');

                    } else {
                        r30.msg(true, 'Scan options in MEM mode only [ALL | MODE | NEAR STATION | GROUP LINK | MEMORY GROUP ]  ');
                    }

                } else {
                    if (r30.value.main_band == constant.BAND_A) {
                        settings[constant.BAND_A].scan = false;
                        request.set.scan_stop();
                        request.get.scan_condition();

                        r30.msg(false, 'Scan stopped.');
                    }

                    if (r30.value.main_band == constant.BAND_B) {
                        settings[constant.BAND_B].scan = false;
                        request.set.scan_stop();
                        request.get.scan_condition();

                        r30.msg(false, 'Scan stopped.');
                    }
                }
            }

            // #################################################
            // # WX Mode
            // #################################################
            if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.WX) {
                // TODO : Scan Button for WX Mode
            }
        });

        $('#R_BTN_REQ_ATT').on( "click", function(){
            request.set.att();
        });

        $('#R_BTN_REQ_ANL').on( "click", function(){
            request.set.anl();
            response.anl();
        });

        $('#R_BTN_REQ_AFC').on( "click", function(){
            request.set.afc();
        });

        $('#R_BTN_REQ_VFO_MR_MX').on( "click", function(){
            request.set.operating_mode();
            response.operating_mode();
        });

        $('#R_BTN_REQ_REC').on( "click", function(){
            request.set.recording(r30.value.main_band);
        });

        $('#R_BTN_REQ_NB').on( "click", function(){
            request.set.noise_blanker_status();
        });

        $('#R_BTN_REQ_SWITCH_BAND').on( "click", function(){
            request.set.band();
            request.get.tuning_step();
            request.get.af_gain_level();
            request.get.rf_gain_level();
            request.get.squelch_level();
            request.get.scan_condition();
            response.select_band();
        });

        $('#R_BTN_REQ_SINGLE_DUAL').on( "click", function(){
            if (r30.value.dual_band == false) {
                request.set.dual_band_mode();

                request.get.display_content(true, null);

                r30.value.dual_band = true;

                request.get.scan_condition();

            } else {
                request.set.single_band_mode();

                r30.value.dual_band = false;

                request.get.scan_condition();
            }
        });

        $('#R_BTN_REQ_UP').on( "click", function(){
            if (settings[r30.value.main_band].scan == false) {
                request.set.up();
                request.get.display_content(true, r30.value.main_band);
            } else {
                request.set.up();
            }

        });

        $('#R_BTN_REQ_DOWN').on( "click", function(){
            if (settings[r30.value.main_band].scan == false) {
                request.set.down();
                request.get.display_content(true, r30.value.main_band);
            } else {
                request.set.down();
            }
        });

        $('#R_BTN_REQ_SET').on( "click", function(){
            if (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO) {
                request.set.frequency();
            } else {
                request.set.operating_mode(r30.value.main_band, constant.OPERATION_MODE.VFO);

                request.set.frequency();
            }
        });
    },
    init        : function () {
        if (socket.connected) {
            request.get.display_content(true);
            request.get.af_gain_level();
            request.get.rf_gain_level();
            request.get.squelch_level();
            request.get.audio_level_synchronize();
            request.get.scan_condition();
            request.get.display_type();
            request.get.tuning_step();
            request.get.memory_group_name();
        } else {
            r30.msg(true,'Socket failed' + socket.connected);
        }
    }
};

$(function() {
    r30.html();
    r30.button();
    r30.connect();
    r30.disconnect();

    window.onfocus = function() {
        queue.clear();
    };
    window.onblur = function() {

    };
});

