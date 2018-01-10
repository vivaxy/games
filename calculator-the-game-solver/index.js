/**
 * @since 20180110 13:12
 * @author vivaxy
 */

const levels = require('./levels');
const actionParser = require('./action-parser');

const traverse = (actionList, moves, actions, start, goal) => {
    if (actionList.length === moves) {
        const value = actionList.reduce((currentValue, action, index) => {
            const nextValue = actionParser(action)(currentValue);
            if (Number.isNaN(nextValue)) {
                throw new Error('actionList: ' + actionList.join(',') + '; value: ' + currentValue + '; action: ' + action + '; index: ' + index);
            }
            return nextValue;
        }, start);
        if (value === goal) {
            return actionList;
        }
        return null;
    }
    return actions.reduce((result, action) => {
        // if result has been found, return at once.
        return result || traverse(actionList.concat(action), moves, actions, start, goal);
    }, null);
};

const level = Object.keys(levels).pop();
const { start, goal, actions, moves } = levels[level];
console.log(traverse([], moves, actions, start, goal).join(', '));
