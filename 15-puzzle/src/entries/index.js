/**
 * @since 2017-02-20 10:25
 * @author vivaxy
 */

import '../main';

if (module.hot) {
    module.hot.accept('../main', () => {
        location.reload();
    });
}
