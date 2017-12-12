/**
 * @since 2017-02-20 10:25
 * @author vivaxy
 */

// https://flappybird.me/static/games/flappy-bird_1/

import '../FlappyBird';

if (module.hot) {
    module.hot.accept('../FlappyBird', () => {
        location.reload();
    });
}
