/**
 * @since 2018-03-11 11:03:16
 * @author vivaxy
 */

import test from 'ava';

import CanvasUnitConverter from '../CanvasUnitConverter';

test('default coords mapping', (t) => {
    const canvasUnitConverter = new CanvasUnitConverter();
    t.deepEqual(canvasUnitConverter.cartesianToCanvasCoords({ x: 0, y: 0 }), { x: 0, y: 0 });
});
