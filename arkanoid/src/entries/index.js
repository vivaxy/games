/**
 * @since 2017-02-20 10:25
 * @author vivaxy
 */

import '../lib';

if (module.hot) {
    module.hot.accept('../lib', () => {
        location.reload();
    });
}
