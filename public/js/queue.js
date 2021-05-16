let queue   = {
    IntervalTimer       : 60,
    Store               : [],
    Scheduler           : null,
    WebSocket           : null,

    add     : function (CommandAsJson = null) {
        if (CommandAsJson !== null) {
            queue.Store.push(CommandAsJson);

            return true;
        }

        return false;
    },
    remove  : function () {
        queue.Store.shift();

        return true;
    },
    clear   : function () {
        queue.Store.splice(0, queue.Store.length);

        return true;
    },
    start   : function () {
        if (queue.WebSocket !== null) {
            if (queue.Scheduler == null) {
                queue.Scheduler = setInterval(function () {
                    if (queue.Store !== null) {
                        // console.log('[QUEUE][STORE] ' + queue.Store);
                    }

                    $('#R_QUEUE').html(queue.Store.length.toString());

                    if (queue.Store[0] !== 'undefined' && typeof queue.Store[0]!== 'undefined') {

                        // console.log('[QUEUE][SEND] ' + queue.Store[0]);

                        queue.WebSocket.emit('execute', queue.Store[0]);

                    }

                    queue.remove();

                }, queue.IntervalTimer);

                return true;

            } else {
                // console.log('[QUEUE] Scheduler already defined.');

                return false;

            }
        } else {
            // console.log('[QUEUE] No WebSocket provided.');
            return false;
        }
    },
    stop    : function () {
        if (queue.Scheduler !== null) {
            clearInterval(queue.Scheduler);

            console.log('[QUEUE] Scheduler stopped.');

            return true;
        }

        return false;
    }
};