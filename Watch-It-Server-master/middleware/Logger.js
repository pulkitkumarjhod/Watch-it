function consoleLogger(req, res, next) {
    console.log(`${req.method} request at ${req.path} from ${req.ip}`);
    next();
}

module.exports = consoleLogger;