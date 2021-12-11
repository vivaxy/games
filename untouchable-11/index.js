/**
 * @since 2021-11-28
 * @author vivaxy
 * TODO
 *  - support flip block
 *  - support rotate block
 *  - support snap to grid
 *  - support winning check
 *  - support mobile
 */
import * as blocks from './service/blocks.js';
import * as input from './service/input.js';

const $root = document.getElementById('root');
blocks.init($root);
input.init($root, blocks);
