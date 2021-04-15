module.exports = {
    db          : null,
    connected   : false,
    last_id     : null,

    connect     : function () {
        const sqlite3 = require('sqlite3');
        const color = require('chalk');

        this.db = new sqlite3.Database('./db/r30.db', (err) => {
            if (err) {
                this.connected = false;
                return console.error(color.redBright('[SQL] ' + err.message));
            }
            this.connected = true;

            console.log(color.greenBright('[SQL] Connected to the R30.db database.'));
        });

        return this;
    },
    disconnect  : function () {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            this.connected = false;
            console.log('Close the database connection.');
        });

        return this;
    },

    bank        : {
        // TODO : sql.js sql.bank.get
        get             : function () {

        },
        getByBankNr     : function (bank_nr = null) {
            if (bank_nr !== null) {
                this.db.get('SELECT bank_text FROM memory_bank WHERE bank_nr = ?', [bank_nr], (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    return row
                        ? console.log(row.bank_text)
                        : console.log(`Nothing found with the bank_nr ${bank_nr}`);

                });
            }
        },
        create  : function (bank_nr = '', bank_text = '') {
            this.db.run('INSERT INTO memory_bank (bank_nr, bank_text) VALUES (?, ?)', [bank_nr, bank_text], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        },
        update  : function (bank_id = 0, bank_nr = '', bank_text = '') {
            this.db.run('UPDATE memory_bank SET bank_nr = ?, bank_text = ? WHERE id = ?', [bank_nr, bank_text, bank_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been updated with rowid ${this.lastID}`);
            });
        },
        delete  : function (bank_id = 0) {
            this.db.run('DELETE FROM memory_bank WHERE id = ?', [bank_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been deleted with rowid ${this.lastID}`);
            });
        }
    },
    frequency   : {
        // TODO : sql.js sql.frequency.get
        get         : function () {

        },
        // TODO : sql.js sql.frequency.getById
        getById     :           function (frequencies_id = 0) {
            if (frequencies_id !== null) {
                this.db.get('SELECT frequencies_freq, frequencies_mode FROM memory_frequencies WHERE frequencies_id = ?', [frequencies_id], (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    return row
                        ? console.log(row.frequencies_freq, row.frequencies_mode)
                        : console.log(`Nothing found with the frequencies_id ${frequencies_id}`);

                });
            }
        },
        // TODO : sql.js sql.frequency.getByFreq
        getByFreq   :           function (frequencies_freq = '') {

        },
        create      :           function (frequencies_freq = '', frequencies_mode = '') {
            this.db.run('INSERT INTO memory_frequencies (frequencies_freq, frequencies_mode) VALUES (?, ?)', [frequencies_freq, frequencies_mode], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        },
        update      :           function (frequencies_id = 0, frequencies_freq = '', frequencies_mode = '') {
            this.db.run('UPDATE memory_frequencies SET frequencies_freq = ?, frequencies_mode = ? WHERE frequencies_id = ?', [frequencies_freq, frequencies_mode, frequencies_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been updated with rowid ${this.lastID}`);
            });
        },
        delete      :           function (frequencies_id = 0) {
            this.db.run('DELETE FROM memory_frequencies WHERE frequencies_id = ?', [frequencies_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been deleted with rowid ${this.lastID}`);
            });
        },
        assign_bank :           function (memory_bank_id = 0, memory_frequencies_id = 0) {
            this.db.run('INSERT INTO vt_memory_bank_frequencies (memory_bank_id, memory_frequencies_id) VALUES (?, ?)', [memory_bank_id, memory_frequencies_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        },
        assign_bank_delete :    function (vt_memory_bank_frequencies_id = 0) {
            this.db.run('DELETE FROM vt_memory_bank_frequencies_id WHERE vt_memory_bank_frequencies_id = ?', [vt_memory_bank_frequencies_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been deleted with rowid ${this.lastID}`);
            });
        }
    },
    history     : {
        // TODO : sql.js sql.history.getById
        getById : function () {

        },
        // TODO : sql.js sql.history.getByFreq
        getByFreq : function () {

        },
        // TODO : sql.js sql.history.getByDate
        getByDate : function () {

        },
        // TODO : sql.js sql.history.create
        create : function (frequencies_freq = '') {
            this.db.run('INSERT INTO history (memory_frequencies) VALUES (?)', [memory_frequencies], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        },
        // TODO : sql.js sql.history.delete
        delete : function (history_id = 0) {
            this.db.run('DELETE FROM history WHERE history_id = ?', [history_id], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                console.log(`A row has been delete with rowid ${this.lastID}`);
            });
        },
    },
    web         : {
        // TODO : sql.js sql.web.get
        get : function () {

        },
        // TODO : sql.js sql.web.getByKey
        getByKey : function () {

        },
        // TODO : sql.js sql.web.create
        create : function () {},
        // TODO : sql.js sql.web.update
        update : function () {},
        // TODO : sql.js sql.web.delete
        delete : function () {},

    }
};