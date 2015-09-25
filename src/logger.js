import fs from 'fs';
import os from 'os';
import moment from 'moment';
import util from 'util';
import colors from 'colors';

colors.setTheme({
    silly : 'rainbow',
    input : 'grey',
    verbose : 'cyan',
    prompt : 'red',
    info : 'green',
    data : 'blue',
    help : 'cyan',
    warn : 'yellow',
    debug : 'magenta',
    error : 'red'
});
class Logger {
    constructor() {
        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }
        this.env = process.env.NODE_ENV || 'development';
        this.isConsolePrint = this.env !== 'test';
    }

    log() {
        this.writeLog('info', arguments);
    }

    info() {
        this.writeLog('info', arguments);
    }

    debug() {
        this.writeLog('debug', arguments);
    }

    warn() {
        this.writeLog('warn', arguments);
    }

    error() {
        this.writeLog('error', arguments);
    }

    writeLog(type, args) {
        var isFilePrint = type !== 'debug';
        if (!isFilePrint && !this.isConsolePrint) {
            return;
        }
        var infos = Array.prototype.slice.call(args);
        var logs = infos.pop();
        switch (type) {
            case 'info':
            case "debug":
                logs = logs.gray;
                break;
            case 'warn':
                logs = logs.yellow;
                break;
        }
        logs = this.format(logs);
        if (isFilePrint) {
            fs.appendFile('./logs/' + this.env + '.log', logs + "\n");
        }
        if (this.isConsolePrint) {
            console.log(logs);
        }
    }

    format(msg) {
        var ret = '';
        if (!msg) {
            return ret;
        }
        var date = moment();
        var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
        if (msg instanceof Error) {
            var err = {
                name : msg.name,
                data : msg.data
            };
            err.stack = msg.stack;
            ret = util.format('%s %s: %s\nHost: %s\nData: %j\n%s\n\n',
                time,
                err.name,
                err.stack,
                os.hostname(),
                err.data,
                time
            );
        } else {
            ret = time + ' ' + util.format.apply(util, arguments) + '\n';
        }
        return ret;
    }
}

export default new Logger();