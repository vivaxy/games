/**
 * @since 20180124 11:41
 * @author vivaxy
 */

import '../manage';

if (module.hot) {
    module.hot.accept('../manage', () => {
        location.reload();
    });
}

