/**
 * @since 2018-09-17 08:07:30
 * @author vivaxy
 */

import Config from './lib/config.js';
import Klotski from './lib/klotski.js';

requestAnimationFrame(() => {
  const config = new Config();
  new Klotski(config);
});
