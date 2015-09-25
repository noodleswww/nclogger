# clogger

> logger your project es6


## install

    npm install clogger


## using

```javascript
import logger from 'clogger';

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
