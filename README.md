# clogger

> logger your project es6


## install

    npm install nclogger


## using

```javascript
import logger from 'clogger/src/logger-complied';

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

```
