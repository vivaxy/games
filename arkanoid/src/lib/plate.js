/**
 * @since 20180109 21:11
 * @author vivaxy
 */

import Element from './element';
import { plateWidth, plateHeight, plateBottomSpacing } from './common';

export default class Plate extends Element {
    constructor({ ctx, size }) {
        super({ ctx, size });
        this.x = size.width / 2 - plateWidth / 2;
        this.y = size.height - plateBottomSpacing;
        this.width = plateWidth;
        this.height = plateHeight;
        this.color = 'rgb(0, 255, 0)';
    }

}
