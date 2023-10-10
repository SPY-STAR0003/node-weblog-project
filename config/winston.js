
const winston = require('winston');
const route = require('app-root-path');

const loggerOptions = {
    file : {
        filename : `${route.path}/logs/err.json`,
        level : "info",
        format : winston.format.json(),
        handleExceptions : true,
    }, 
    console : {
        handleExceptions : true,
        level : "debug",
        format : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
}

const logger = winston.createLogger({
    transports : [
        new winston.transports.File(loggerOptions.file),
        new winston.transports.Console(loggerOptions.console)
    ],
    exitOnError : false
})

logger.stream = {
    write : function(msg) {
        logger.info(msg)
    }
}

module.exports = logger