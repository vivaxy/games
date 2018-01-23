/**
 * @since 2017-01-31 17:19
 * @author vivaxy
 */

const ip = require('ip');

exports.DEVELOPMENT_IP = ip.address();
exports.DEVELOPMENT_PORT = 3010;
exports.DIST_PATH = 'dist';
