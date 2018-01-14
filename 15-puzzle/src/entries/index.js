/**
 * @since 2017-02-20 10:25
 * @author vivaxy
 */

import '../Index';

if (module.hot) {
    module.hot.accept('../Index', () => {
        location.reload();
    });
}
