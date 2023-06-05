import winston, { Logger, createLogger, format } from "winston";
import config from "config";
import * as packageJson from "../../package.json";

const { combine, timestamp, prettyPrint } = format;

const logMeta = {
  appName: packageJson.name,
  nodeEnv: config.get("env"),
  port: config.get("port"),
};
const logger: Logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

class LoggerClass {
  debug(msg: string, data?: Object, logIndex?: Object) {
    logger.debug(msg, { ...logMeta, ...logIndex, etc: data || {} });
  }

  info(msg: string, data?: Object, logIndex?: Object) {
    logger.info(msg, { ...logMeta, ...logIndex, etc: data || {} });
  }

  error(msg: Object | any, err?: Object, logIndex?: Object) {
    logger.info(msg, { ...logMeta, ...logIndex, etc: err || {} });
  }

  warn(msg: Object | any, err?: string, logIndex?: Object) {
    logger.warn(msg, { ...logMeta, ...logIndex, etc: err || {} });
  }
}
const log = new LoggerClass();
export default log;
