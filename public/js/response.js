let response = {
    select_band :               function () {
        if (r30.value.dual_band == false) {
            if (r30.value.main_band == constant.BAND_A) {
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
            if (r30.value.main_band == constant.BAND_A) {
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
    display_type :              function (data = null) {
        if (data !== null) {
            if (data == constant.DISPLAY_TYPE.SINGLE_BAND) {
                r30.value.dual_band = false;

                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_BAND_B.hide();
                } else {
                    r30.sel.R_BAND_A.hide();
                }
            } else if (data == constant.DISPLAY_TYPE.DUAL_BAND) {

                r30.value.dual_band = true;

                r30.sel.R_BAND_A.show();
                r30.sel.R_BAND_B.show();

            }
        }
    },
    operating_mode :            function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                settings[band].operation_mode = data;

                switch(true) {
                    case (data == constant.OPERATION_MODE.VFO):
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (data == constant.OPERATION_MODE.MEM):
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (data == constant.OPERATION_MODE.WX):
                        if (band == constant.BAND_A) {
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
                    case (settings[band].operation_mode == constant.OPERATION_MODE.VFO):
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (settings[band].operation_mode == constant.OPERATION_MODE.MEM):
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (settings[band].operation_mode == constant.OPERATION_MODE.WX):
                        if (band == constant.BAND_A) {
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
                settings[r30.value.main_band].operation_mode = data;

                switch(true) {
                    case (data == constant.OPERATION_MODE.VFO):
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (data == constant.OPERATION_MODE.MEM):
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (data == constant.OPERATION_MODE.WX):
                        if (r30.value.main_band == constant.BAND_A) {
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
                    case (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.VFO):
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.MEM):
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_A_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_OPERATION_MODE_MEM.removeClass('badge-info').addClass('badge-success');
                            r30.sel.R_B_OPERATION_MODE_VFO.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_OPERATION_MODE_WX.removeClass('badge-success').addClass('badge-info');
                        }
                        break;
                    case (settings[r30.value.main_band].operation_mode == constant.OPERATION_MODE.WX):
                        if (r30.value.main_band == constant.BAND_A) {
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
    receive_mode :              function (band = null, data = null) {
        //console.log("receive_mode : " + data);
        if (band !== null) {
            if (data !== null) {
                settings[band].receive_mode = data;

                if (band == constant.BAND_A) {
                    r30.sel.R_A_FREQ_MODE.val(data).trigger("change");
                } else {
                    r30.sel.R_B_FREQ_MODE.val(data).trigger("change");
                }
            } else {
                if (band == constant.BAND_A) {
                    r30.sel.R_A_FREQ_MODE.val(settings[band].receive_mode).trigger("change");
                } else {
                    r30.sel.R_B_FREQ_MODE.val(settings[band].receive_mode).trigger("change");
                }
            }
        } else {
            if (data !== null) {
                settings[r30.value.main_band].receive_mode = data;

                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_A_FREQ_MODE.val(data).trigger("change");
                } else {
                    r30.sel.R_B_FREQ_MODE.val(data).trigger("change");
                }
            } else {
                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_A_FREQ_MODE.val(settings[r30.value.main_band].receive_mode).trigger("change");
                } else {
                    r30.sel.R_B_FREQ_MODE.val(settings[r30.value.main_band].receive_mode).trigger("change");
                }
            }
        }
    },
    s_meter :                   function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                settings[band].smeter = data;

                let value = Math.round((100 / 255) * data);

                if (band == constant.BAND_A) {
                    r30.sel.R_A_S_METER.css("width", value +"%");
                    r30.sel.R_A_S_METER.html('<span>'+ value + '</span>');
                } else {
                    r30.sel.R_B_S_METER.css("width", value +"%");
                    r30.sel.R_B_S_METER.html('<span>'+ value + '</span>');
                }
            }
        } else {
            if (data !== null) {
                settings[r30.value.main_band].smeter = data;

                let value = Math.round((100 / 255) * data);

                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_A_S_METER.css("width", value +"%");
                    r30.sel.R_A_S_METER.html('<span>'+ value + '</span>');
                } else {
                    r30.sel.R_B_S_METER.css("width", value +"%");
                    r30.sel.R_B_S_METER.html('<span>'+ value + '</span>');
                }
            }
        }

    },
    squelch_status :            function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                if (band == constant.BAND_A) {
                    if (data == constant.SQUELCH_STATUS.CLOSE) {
                        r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                    }
                } else {
                    if (data == constant.SQUELCH_STATUS.CLOSE) {
                        r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                    }
                }
            }
        } else {
            if (data !== null) {
                if (r30.value.main_band == constant.BAND_A) {
                    if (data == constant.SQUELCH_STATUS.CLOSE) {
                        r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_A_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                    }
                } else {
                    if (data == constant.SQUELCH_STATUS.CLOSE) {
                        r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_B_S_METER_SQUELCH_STATUS.removeClass('badge-info').addClass('badge-success');
                    }
                }
            }
        }

    },
    audio_level_synchronize :   function (data = null) {
        if (data !== null) {
            r30.value.audio_mode = data;

            if (data == constant.AUDIO_LEVEL_SYNCHRONIZE.LINKED) {
                // 00=A/B Link
                r30.sel.R_A_AUDIO.html('A=B').prop('title', 'Audio A=B Synchronized');
                r30.sel.R_B_AUDIO.html('A=B').prop('title', 'Audio A=B Synchronized');
            } else {
                // 01=A/B Separate
                r30.sel.R_A_AUDIO.html('A/B').prop('title', 'Audio A/B Separate');
                r30.sel.R_B_AUDIO.html('A/B').prop('title', 'Audio A/B Separate');
            }
        }

        return true;
    },
    earphone_mode :             function (data = null) {
        if (data !== null) {
            r30.value.earphone_mode = data;

            if (data == constant.EARPHONE_MODE.OFF) {
                r30.sel.R_EARPHONE_MODE.removeClass('icon-headphones');
                r30.sel.R_EARPHONE_MODE.addClass('icon-volume-medium');
                r30.sel.R_EARPHONE_MODE.prop('title', 'Speaker mode');

            } else {
                r30.sel.R_EARPHONE_MODE.addClass('icon-headphones');
                r30.sel.R_EARPHONE_MODE.removeClass('icon-volume-medium');
                r30.sel.R_EARPHONE_MODE.prop('title', 'Headphone mode');
            }
        }
    },
    antenna_mode :              function (data = null) {
        if (data !== null) {
            r30.value.antenna_mode = data;

            if (data == constant.ANTENNA_MODE.EXTERNAL) {
                r30.sel.R_ANTENNA_MODE.removeClass('icon-satellite-dish2');
                r30.sel.R_ANTENNA_MODE.addClass('icon-station');
                r30.sel.R_ANTENNA_MODE.prop('title', 'External Antenna');
            } else {
                r30.sel.R_ANTENNA_MODE.removeClass('icon-station');
                r30.sel.R_ANTENNA_MODE.addClass('icon-satellite-dish2');
                r30.sel.R_ANTENNA_MODE.prop('title', 'Internal Antenna');
            }
        }
    },
    frequency :                 function (band = null, data = null, mem_name = null, receive_mode = null) {
        if (band == constant.BAND_A) {
            r30.sel.R_A_FREQ_NAME.html('');
            r30.sel.R_B_FREQ_NAME.html('');

            if (data !== null) {
                r30.sel.R_A_FREQ_1.text('').text(data[8]);
                r30.sel.R_A_FREQ_2.text('').text(data[9]);
                r30.sel.R_A_FREQ_3.text('').text(data[6]);
                r30.sel.R_A_FREQ_4.text('').text(data[7]);
                r30.sel.R_A_FREQ_5.text('').text(data[4]);
                r30.sel.R_A_FREQ_6.text('').text(data[5]);
                r30.sel.R_A_FREQ_7.text('').text(data[2]);
                r30.sel.R_A_FREQ_8.text('').text(data[3]);
                r30.sel.R_A_FREQ_9.text('').text(data[0]);
                r30.sel.R_A_FREQ_10.text('').text(data[1]);

                count.a[1] = data[8];
                count.a[2] = data[9];
                count.a[3] = data[6];
                count.a[4] = data[7];
                count.a[5] = data[4];
                count.a[6] = data[5];
                count.a[7] = data[2];
                count.a[8] = data[3];
                count.a[9] = data[0];
                count.a[10] = data[1];
            }

            if (mem_name !== null)      {
                r30.sel.R_A_FREQ_NAME.html('').html(mem_name);
            }

            if (receive_mode !== null)  {
                response.receive_mode(constant.BAND_A, receive_mode);
            }
        }

        if (band == constant.BAND_B) {
            if (data !== null) {
                r30.sel.R_B_FREQ_1.text('').text(data[8]);
                r30.sel.R_B_FREQ_2.text('').text(data[9]);
                r30.sel.R_B_FREQ_3.text('').text(data[6]);
                r30.sel.R_B_FREQ_4.text('').text(data[7]);
                r30.sel.R_B_FREQ_5.text('').text(data[4]);
                r30.sel.R_B_FREQ_6.text('').text(data[5]);
                r30.sel.R_B_FREQ_7.text('').text(data[2]);
                r30.sel.R_B_FREQ_8.text('').text(data[3]);
                r30.sel.R_B_FREQ_9.text('').text(data[0]);
                r30.sel.R_B_FREQ_10.text('').text(data[1]);

                count.b[1] = data[8];
                count.b[2] = data[9];
                count.b[3] = data[6];
                count.b[4] = data[7];
                count.b[5] = data[4];
                count.b[6] = data[5];
                count.b[7] = data[2];
                count.b[8] = data[3];
                count.b[9] = data[0];
                count.b[10] = data[1];
            }

            if (mem_name !== null) {
                r30.sel.R_B_FREQ_NAME.html('').html(mem_name);
            }

            if (receive_mode !== null)  {
                response.receive_mode(constant.BAND_B, receive_mode);
            }
        }

        return true;
    },
    recording_condition :       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                switch (true) {
                    case (data == constant.RECORDING.STOPPED) :
                        // stopped
                        settings[band].rec = false;

                        if (band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                        }
                        break;
                    case (data == constant.RECORDING.PAUSE) :
                        // pause
                        settings[band].rec = true;

                        if (band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                        }
                        break;
                    case (data == constant.RECORDING.RUNNING) :
                        settings[band].rec = true;

                        if (band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                        }
                        break;
                }
            }
        } else {
            if (data !== null) {
                switch (true) {
                    case (data == constant.RECORDING.STOPPED) :
                        // stopped
                        settings[r30.value.main_band].rec = false;

                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-danger').addClass('badge-info');
                        }
                        break;
                    case (data == constant.RECORDING.PAUSE) :
                        // pause
                        settings[r30.value.main_band].rec = true;

                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-info').removeClass('badge-danger').addClass('badge-success');
                        }
                        break;
                    case (data == constant.RECORDING.RUNNING) :
                        settings[r30.value.main_band].rec = true;

                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                        } else {
                            r30.sel.R_B_REC.removeClass('badge-success').removeClass('badge-info').addClass('badge-danger');
                        }
                        break;
                }
            }
        }

        return true;
    },
    rf_gain :                   function (data = null) {
        if (data !== null) {
            if (data !== r30.sel.R_RF_GAIN_SLIDER.result.from) {
                // Prevents fast spikes from 0 to x
                r30.sel.R_RF_GAIN.data('from', data);
                r30.sel.R_RF_GAIN_SLIDER.update({from: data});
            }
        }

        return true;
    },
    af_gain :                   function (data = null) {
        if (data !== null) {
            if (data !== r30.sel.R_AF_GAIN_SLIDER.result.from) {
                r30.sel.R_AF_GAIN.data('from', data);
                r30.sel.R_AF_GAIN_SLIDER.update({from: data});
            }
        }

        return true;
    },
    dup :                       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                settings[band].dup = data;

                switch (true) {
                    case (data == constant.DUP.OFF) :
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                        } else {
                            r30.sel.R_B_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                        }

                        break;
                    case (data == constant.DUP.DUP_MIN) :
                        if (band == constant.BAND_A) {
                            r30.sel.R_A_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                        } else {
                            r30.sel.R_B_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                        }

                        break;
                    case (data == constant.DUP.DUP_PLU) :
                        if (band == constant.BAND_A) {
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
                settings[r30.value.main_band].dup = data;

                switch (true) {
                    case (data == constant.DUP.OFF) :
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                        } else {
                            r30.sel.R_B_DUP_MIN.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_OFF.removeClass('badge-info').addClass('badge-success');
                        }

                        break;
                    case (data == constant.DUP.DUP_MIN) :
                        if (r30.value.main_band == constant.BAND_A) {
                            r30.sel.R_A_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                        } else {
                            r30.sel.R_B_DUP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_PLU.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_DUP_MIN.removeClass('badge-info').addClass('badge-success');
                        }

                        break;
                    case (data == constant.DUP.DUP_PLU) :
                        if (r30.value.main_band == constant.BAND_A) {
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
        }

    },
    anl :                       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                settings[band].anl = data;

                if (r30.value.dual_band == true) {
                    if (band == constant.BAND_A) {
                        if (data == constant.ANL.OFF) {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    } else {
                        if (data == constant.ANL.OFF) {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    }
                } else {
                    if (r30.value.main_band == constant.BAND_A) {
                        if (data == constant.ANL.OFF) {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    } else {
                        if (data == constant.ANL.OFF) {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                        } else {
                            r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                        }
                    }
                }
            } else {
                if (r30.value.main_band == constant.BAND_A) {
                    if (settings[constant.BAND_A].anl == constant.ANL.OFF) {
                        r30.sel.R_A_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_A_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                    }
                } else {
                    if (settings[constant.BAND_B].anl == constant.ANL.OFF) {
                        r30.sel.R_B_FREQ_ANL.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_B_FREQ_ANL.removeClass('badge-info').addClass('badge-success');
                    }
                }
            }
        } else {

        }

        return true;
    },
    afc :                       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                if (band == constant.BAND_A) {
                    if (data == constant.AFC.OFF) {
                        r30.sel.R_A_AFC.removeClass('badge-success').addClass('badge-info');
                        settings[band].afc = constant.AFC.OFF;
                    } else {
                        r30.sel.R_A_AFC.removeClass('badge-info').addClass('badge-success');
                        settings[band].afc = constant.AFC.ON;
                    }
                } else {
                    if (data == constant.AFC.OFF) {
                        r30.sel.R_B_AFC.removeClass('badge-success').addClass('badge-info');
                        settings[band].afc = constant.AFC.OFF;
                    } else {
                        r30.sel.R_B_AFC.removeClass('badge-info').addClass('badge-success');
                        settings[band].afc = constant.AFC.ON;
                    }
                }
            }
        } else {
            if (data !== null) {
                if (r30.value.main_band == constant.BAND_A) {
                    if (data == constant.AFC.OFF) {
                        r30.sel.R_A_AFC.removeClass('badge-success').addClass('badge-info');
                        settings[r30.value.main_band].afc = constant.AFC.OFF;
                    } else {
                        r30.sel.R_A_AFC.removeClass('badge-info').addClass('badge-success');
                        settings[r30.value.main_band].afc = constant.AFC.ON;
                    }
                } else {
                    if (data == constant.AFC.OFF) {
                        r30.sel.R_B_AFC.removeClass('badge-success').addClass('badge-info');
                        settings[r30.value.main_band].afc = constant.AFC.OFF;
                    } else {
                        r30.sel.R_B_AFC.removeClass('badge-info').addClass('badge-success');
                        settings[r30.value.main_band].afc = constant.AFC.ON;
                    }
                }
            }
        }

        return true;
    },
    att :                       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                settings[band].att = data;

                switch (true) {
                    case (data == constant.ATT.OFF) :
                        if (band == constant.BAND_A) {
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
                    case (data == constant.ATT.ATT1) :
                        if (band == constant.BAND_A) {
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
                    case (data == constant.ATT.ATT2) :
                        if (band == constant.BAND_A) {
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
                    case (data == constant.ATT.ATT3) :
                        if (band == constant.BAND_A) {
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
                    if (r30.value.main_band == constant.BAND_A) {
                        switch (true) {
                            case (settings[constant.BAND_A].att == constant.ATT.OFF) :
                                r30.sel.R_A_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_A].att == constant.ATT.ATT1) :
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_A].att == constant.ATT.ATT2) :
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_A].att == constant.ATT.ATT3) :
                                r30.sel.R_A_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_A_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_A_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                break;
                        }
                    } else {
                        switch (true) {
                            case (settings[constant.BAND_B].att == constant.ATT.OFF) :
                                r30.sel.R_B_ATT_OFF.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_B].att == constant.ATT.ATT1) :
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_B].att == constant.ATT.ATT2) :
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-success').addClass('badge-info');
                                break;
                            case (settings[constant.BAND_B].att == constant.ATT.ATT3) :
                                r30.sel.R_B_ATT_ATT3.removeClass('badge-info').addClass('badge-success');
                                r30.sel.R_B_ATT_OFF.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT1.removeClass('badge-success').addClass('badge-info');
                                r30.sel.R_B_ATT_ATT2.removeClass('badge-success').addClass('badge-info');
                                break;
                        }
                    }
                }
            }
        } else {
            // TODO : response.get.att Band == null
        }

    },
    vsc :                       function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                switch (true) {
                    case (data == constant.VSC.OFF) :
                        if (band == constant.BAND_A) {
                            settings[constant.BAND_A].vsc = constant.VSC.OFF;
                            r30.sel.R_A_VSC.addClass('badge-info').removeClass('badge-success');
                        } else {
                            settings[constant.BAND_B].vsc = constant.VSC.OFF;
                            r30.sel.R_B_VSC.addClass('badge-info').removeClass('badge-success');
                        }
                        break;
                    case (data == constant.VSC.ON) :
                        if (band == constant.BAND_A) {
                            settings[constant.BAND_A].vsc = constant.VSC.ON;
                            r30.sel.R_A_VSC.addClass('badge-success').removeClass('badge-info');
                        } else {
                            settings[constant.BAND_B].vsc = constant.VSC.ON;
                            r30.sel.R_B_VSC.addClass('badge-success').removeClass('badge-info');
                        }
                        break;
                }
            }
        } else {
            // TODO : response.get.vsc Band == null
        }

    },
    noise_blanker_status :      function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {

                settings[band].noise_blanker = data;

                if (band == constant.BAND_A) {
                    if (data == constant.NOISE_BLANKER.OFF) {
                        r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_A_NB.removeClass('badge-info').addClass('badge-success')
                    }
                } else {
                    if (data == constant.NOISE_BLANKER.OFF) {
                        r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_B_NB.removeClass('badge-info').addClass('badge-success')
                    }
                }
            } else {
                settings[band].noise_blanker = constant.NOISE_BLANKER.OFF;
            }
        } else {
            if (data !== null) {

                settings[r30.value.main_band].noise_blanker = data;

                if (r30.value.main_band == constant.BAND_A) {
                    if (data == constant.NOISE_BLANKER.OFF) {
                        r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_A_NB.removeClass('badge-info').addClass('badge-success')
                    }
                } else {
                    if (data == constant.NOISE_BLANKER.OFF) {
                        r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                    } else {
                        r30.sel.R_B_NB.removeClass('badge-info').addClass('badge-success')
                    }
                }
            } else {

                settings[r30.value.main_band].noise_blanker = constant.NOISE_BLANKER.OFF;

                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_A_NB.removeClass('badge-success').addClass('badge-info');
                } else {
                    r30.sel.R_B_NB.removeClass('badge-success').addClass('badge-info');
                }
            }
        }

    },
    tuning_step :               function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                if (band == constant.BAND_A) {
                    r30.sel.R_A_TUNING_STEP.val(data);
                    r30.sel.R_A_TUNING_STEP.trigger('change');
                } else {
                    r30.sel.R_B_TUNING_STEP.val(data);
                    r30.sel.R_B_TUNING_STEP.trigger('change');
                }
            }
        } else {
            if (data !== null) {
                if (r30.value.main_band == constant.BAND_A) {
                    r30.sel.R_A_TUNING_STEP.val(data);
                    r30.sel.R_A_TUNING_STEP.trigger('change');
                } else {
                    r30.sel.R_B_TUNING_STEP.val(data);
                    r30.sel.R_B_TUNING_STEP.trigger('change');
                }
            }
        }

    },
    scan_type :                 function (band = null, data = null) {
        // TODO : response.js response.scan_type https://github.com/Spotterday/Webinterface_ICOM_R30/issues/25
    },
    scan_condition :            function (data = null) {
        if (data !== null && data[constant.BAND_A] !== "" && data[constant.BAND_B] !== "") {
            scheduler.stop.BAND_A();
            scheduler.stop.BAND_B();

            settings[constant.BAND_A].scan              = data[constant.BAND_A].scan;
            settings[constant.BAND_B].scan              = data[constant.BAND_B].scan;
            settings[constant.BAND_A].scan_direction    = data[constant.BAND_A].scan_direction;
            settings[constant.BAND_B].scan_direction    = data[constant.BAND_B].scan_direction;

            if (r30.value.dual_band == true) {
                if (settings[constant.BAND_A].scan == true) {
                    scheduler.start.BAND_A(true);

                    r30.sel.R_A_SCAN.addClass('badge-success').removeClass('badge-info');
                } else {
                    scheduler.start.BAND_A(false);

                    r30.sel.R_A_SCAN.removeClass('badge-success').addClass('badge-info');
                }

                if (settings[constant.BAND_B].scan == true) {
                    scheduler.start.BAND_B(true);

                    r30.sel.R_B_SCAN.addClass('badge-success').removeClass('badge-info');
                } else {
                    scheduler.start.BAND_B(false);

                    r30.sel.R_B_SCAN.removeClass('badge-success').addClass('badge-info');
                }

            } else {
                // No dual band mode - check which band is active

                if (r30.value.main_band == constant.BAND_A) {
                    if (settings[constant.BAND_A].scan == true) {
                        scheduler.start.BAND_A(true);

                        r30.sel.R_A_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        scheduler.start.BAND_A(false);

                        r30.sel.R_A_SCAN.removeClass('badge-success').addClass('badge-info');
                    }
                } else {
                    if (settings[constant.BAND_B].scan == true) {
                        scheduler.start.BAND_B(true);

                        r30.sel.R_B_SCAN.addClass('badge-success').removeClass('badge-info');
                    } else {
                        scheduler.start.BAND_B(false);

                        r30.sel.R_B_SCAN.removeClass('badge-success').addClass('badge-info');
                    }
                }

            }
        }
    },
    memory_group_list :         function (data = null) {
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

                    if (r30.value.bank_counter <= 99) {
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
    memory_group_name :         function (band = null, data = null) {

        // TODO : Check Operation Mode
        // TODO : 0009 Returned 000 . because of auto mw
        if (band !== null) {
            if (data !== null) {
                if (band == constant.BAND_A) {
                    r30.sel.R_A_MEMORY_GROUP_NAME.html('').html(r30.value.memory_banks[data.substring(2)]);
                }

                if (band == constant.BAND_B) {
                    r30.sel.R_B_MEMORY_GROUP_NAME.html('').html(r30.value.memory_banks[data.substring(2)]);
                }
            }
        }

        return true;
    },
    p_link_list :               function (data = null) {
        function minTwoDigits(n) {
            return (n < 10 ? '0' : '') + n;
        }

        let array = data.split(',');
        let text = [];
        let d = 1;

        if (array.length === 161) {
            r30.value.bank_counter = 0;
            for (let i = 1; i <= 160; i++) {

                text.push(String.fromCharCode('0x'+array[i]));

                if (d == 16) {
                    if (r30.value.bank_counter <= 9) {
                        $('#R_MEMORY_BANK_P_LINK').append($('<option>', {
                            value: minTwoDigits('PL_' + r30.value.bank_counter),
                            text: minTwoDigits(r30.value.bank_counter) + ' : ' + text.join('')
                        })).trigger('change');

                        r30.value.p_link_banks[minTwoDigits(r30.value.bank_counter)] = text.join('');
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
    skip_mode :                 function (band = null, data = null) {
        if (band !== null) {
            if (data !== null) {
                if (band == constant.BAND_A) {
                    switch (true) {
                        case (data == constant.SKIP_MODE.OFF) :
                            r30.sel.R_A_SKIP_OFF.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_A_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                        case (data == constant.SKIP_MODE.SKIP) :
                            r30.sel.R_A_SKIP_SKIP.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_A_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                        case (data == constant.SKIP_MODE.PSKIP) :
                            r30.sel.R_A_SKIP_PSKIP.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_A_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_A_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                    }

                } else {
                    switch (true) {
                        case (data == constant.SKIP_MODE.OFF) :
                            r30.sel.R_B_SKIP_OFF.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_B_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                        case (data == constant.SKIP_MODE.SKIP) :
                            r30.sel.R_B_SKIP_SKIP.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_B_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_SKIP_PSKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                        case (data == constant.SKIP_MODE.PSKIP) :
                            r30.sel.R_B_SKIP_PSKIP.addClass('badge-success').removeClass('badge-info');
                            r30.sel.R_B_SKIP_OFF.removeClass('badge-success').addClass('badge-info');
                            r30.sel.R_B_SKIP_SKIP.removeClass('badge-success').addClass('badge-info');
                            break;
                    }
                }
            }
        } else {
            // TODO : response.get.skip_mode band == null
        }

    }
};