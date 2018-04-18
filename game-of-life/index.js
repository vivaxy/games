/**
 * @since 20180417 16:52
 * @author vivaxy
 */

import createElements from './lib/elements.js';

createElements();
window.addEventListener('resize', () => {
  createElements();
});
