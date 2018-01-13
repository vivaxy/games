const test = require('ava');

const actionParser = require('../action-parser');

test('action-parser.js', (t) => {
    const value = 0;
    const actions = ['2', '3', '[+]1'];
    t.deepEqual(actionParser('[+]1')({ value, actions }), { value: 0, actions: ['3', '4', '[+]1'] });
});
