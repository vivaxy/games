/**
 * @since 2018-03-11 11:03:16
 * @author vivaxy
 */

import test from 'ava';

import UnitConverter from '../UnitConverter';

test('default coords mapping, from cartesian to canvas', (t) => {
    const unitConverter = new UnitConverter({
        canvas: { width: 100, height: 100 },
        cartesian: { width: 100, height: 100 },
    });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 0, y: 0 }), { x: 50, y: 50 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: 50 }), { x: 100, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: 50 }), { x: 0, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: -50 }), { x: 0, y: 100 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: -50 }), { x: 100, y: 100 });
    t.deepEqual(unitConverter.cartesianToCanvasLength({ width: 100, height: 100 }), { width: 100, height: 100 });
});

test('coords mapping with ratio, from cartesian to canvas', (t) => {
    const unitConverter = new UnitConverter({
        canvas: { width: 200, height: 200 },
        cartesian: { width: 100, height: 100 },
    });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 0, y: 0 }), { x: 100, y: 100 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: 50 }), { x: 200, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: 50 }), { x: 0, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: -50 }), { x: 0, y: 200 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: -50 }), { x: 200, y: 200 });
    t.deepEqual(unitConverter.cartesianToCanvasLength({ width: 100, height: 100 }), { width: 200, height: 200 });
});

test('coords mapping with ratio, from cartesian to canvas', (t) => {
    const unitConverter = new UnitConverter({
        canvas: { width: 100, height: 100 },
        cartesian: { width: 100, height: 200 },
    });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 0, y: 0 }), { x: 50, y: 50 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: 100 }), { x: 100, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: 100 }), { x: 0, y: 0 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: -50, y: -100 }), { x: 0, y: 100 });
    t.deepEqual(unitConverter.cartesianToCanvasCoords({ x: 50, y: -100 }), { x: 100, y: 100 });
    t.deepEqual(unitConverter.cartesianToCanvasLength({ width: 100, height: 200 }), { width: 100, height: 100 });
});

test('default angle mapping, from cartesian to canvas', (t) => {
    const unitConverter = new UnitConverter();
    t.is(unitConverter.cartesianToCanvasAngle(0), -0);
    t.is(unitConverter.cartesianToCanvasAngle(Math.PI / 2), -Math.PI / 2);
    t.is(unitConverter.cartesianToCanvasAngle(-Math.PI / 2), Math.PI / 2);
    t.is(unitConverter.cartesianToCanvasAngle(Math.PI), -Math.PI);
    t.is(unitConverter.cartesianToCanvasAngle(-Math.PI), Math.PI);
});

test('coords mapping with ratio, from canvas to cartesian', (t) => {
    const unitConverter = new UnitConverter({
        canvas: { width: 100, height: 100 },
        cartesian: { width: 200, height: 200 },
    });
    t.deepEqual(unitConverter.canvasToCartesianCoords({ x: 0, y: 0 }), { x: -100, y: 100 });
    t.deepEqual(unitConverter.canvasToCartesianCoords({ x: 100, y: 0 }), { x: 100, y: 100 });
    t.deepEqual(unitConverter.canvasToCartesianCoords({ x: 100, y: 100 }), { x: 100, y: -100 });
    t.deepEqual(unitConverter.canvasToCartesianCoords({ x: 0, y: 100 }), { x: -100, y: -100 });
    t.deepEqual(unitConverter.canvasToCartesianCoords({ x: 50, y: 50 }), { x: 0, y: 0 });
    t.deepEqual(unitConverter.canvasToCartesianLength({ width: 100, height: 100 }), { width: 200, height: 200 });
});

test('default angle mapping, from canvas to cartesian', (t) => {
    const unitConverter = new UnitConverter();
    t.is(unitConverter.canvasToCartesianAngle(0), -0);
    t.is(unitConverter.canvasToCartesianAngle(Math.PI / 2), -Math.PI / 2);
    t.is(unitConverter.canvasToCartesianAngle(-Math.PI / 2), Math.PI / 2);
    t.is(unitConverter.canvasToCartesianAngle(Math.PI), -Math.PI);
    t.is(unitConverter.canvasToCartesianAngle(-Math.PI), Math.PI);
});
