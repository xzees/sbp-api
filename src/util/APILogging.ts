// import LogManager from 'managers/LogManager';
import morgan from 'morgan'

// export const requestLogging = (req, res, next) => {
//   LogManager.default.sendLog(req, 'Gateway-Request')
//   next()
// }

export const morganLogging = morgan('tiny')