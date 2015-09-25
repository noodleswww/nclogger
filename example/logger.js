
import logger from '../index';

logger.log('log');
logger.info('info');

// only for debug
logger.debug('debug');

logger.warn('warn');
logger.error('error');

// mock error
var err = new Error();
err.name = 'errName';
err.data = 'errData';
logger.error(err);
