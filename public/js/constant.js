let constant = {
    BAND_A  : 0,
    BAND_B  : 1,
    AUDIO_LEVEL_SYNCHRONIZE : {
        LINKED : 0,
        SEPARATE : 1,
    },
    EARPHONE_MODE : {
        OFF : 0,
        ON : 1,
    },
    ANTENNA_MODE : {
        EXTERNAL : 0,
        INTERNAL : 1,
    },
    RECORDING : {
        STOPPED : 0,
        PAUSE : 1,
        RUNNING : 2,
    },
    NOISE_BLANKER : {
        OFF : 0,
        ON : 1
    },
    DISPLAY_TYPE : {
        SINGLE_BAND : 0,
        DUAL_BAND : 1,
    },
    SQUELCH_STATUS : {
       CLOSE : 0,
       OPEN : 1,
    },
    RECEIVE_MODE    : {
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
    OPERATION_MODE  : {
        VFO : 0,
        MEM : 1,
        WX : 2,
    },
    SKIP_MODE       : {
        OFF : 0,
        SKIP : 1,
        PSKIP : 2
    },
    TUNING_STEP : {
        0 : "0.01 kHz",
        1 : "0.1 kHz",
        2 : "1 kHz",
        3 : "3.125 kHz",
        4 : "5 kHz",
        5 : "6.25 kHz",
        6 : "8.33 kHz",
        7 : "9 kHz",
        8 : "10 kHz",
        9 : "12.5 kHz",
        10 : "15 kHz",
        11 : "20 kHz",
        12 : "25 kHz",
        13 : "30 kHz",
        14 : "50 kHz",
        15 : "100 kHz",
        16 : "125 kHz",
        17 : "200 kHz"
    },
    VSC             : {
        OFF:0,
        ON:1,
    },
    AFC             : {
        OFF : 0,
        ON : 1
    },
    DUP             : {
        OFF : 0,
        DUP_MIN : 1,
        DUP_PLU : 2,
    },
    ANL             : {
        OFF : 0,
        ON : 1
    },
    ATT             : {
        OFF : 0,
        ATT1 : 1,
        ATT2 : 2,
        ATT3 : 3
    },
    DTCS            : {
        OFF : 0,
        ON : 1,
        DTCS_R : 2
    },
    DSQL            : {
        OFF : 0,
        NAC : 1
    }
};