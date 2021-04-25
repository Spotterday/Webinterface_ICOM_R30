let scheduler = {
    scheduler_a : null,
    scheduler_b : null,
    IntervalTimer : 350,
    start : {
        BAND_A : function (scanMode = false) {
            if (scanMode === true) {
                if (scheduler.scheduler_a == null) {
                    //console.log("Start Scheduler A [SCAN]");

                    scheduler.scheduler_a = setInterval(function(){
                        request.get.display_content(false, constant.BAND_A);
                    }, scheduler.IntervalTimer);
                } else {
                    //console.log("Start Scheduler A [SCAN] - FAILED");
                }
            } else {
                if (scheduler.scheduler_a == null) {
                    //console.log("Start Scheduler A ");

                    scheduler.scheduler_a = setInterval(function(){
                        request.get.s_meter_v2(constant.BAND_A);
                    }, scheduler.IntervalTimer);
                } else {
                    //console.log("Start Scheduler A - FAILED");
                }

            }
        },
        BAND_B : function (scanMode = false) {
            if (scanMode === true) {
                //console.log("Start Scheduler B [SCAN]");
                scheduler.scheduler_b = setInterval(function(){
                    request.get.display_content(false, constant.BAND_B);
                }, scheduler.IntervalTimer);
            } else {
                if (scheduler.scheduler_b == null) {
                    //console.log("Start Scheduler B ");

                    scheduler.scheduler_b = setInterval(function(){
                        request.get.s_meter_v2(constant.BAND_B);
                    }, scheduler.IntervalTimer);
                } else {
                    console.log("Start Scheduler B - FAILED");
                }
            }
        }
    },
    stop : {
        BAND_A : function () {
            if (scheduler.scheduler_a !== null) {
                //console.log("Stopped Scheduler A");
                clearInterval(scheduler.scheduler_a);
                scheduler.scheduler_a = null;
            }
        },
        BAND_B : function () {
            if (scheduler.scheduler_b !== null) {
                //console.log("Stopped Scheduler B");
                clearInterval(scheduler.scheduler_b);
                scheduler.scheduler_b = null;
            }

        }
    },
    check : {
        BAND_A : function () {
            return scheduler.scheduler_a !== null;
        },
        BAND_B : function () {
            return scheduler.scheduler_b !== null;
        }
    }
};