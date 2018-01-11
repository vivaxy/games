/**
 * @since 20180110 13:12
 * @author vivaxy
 */

const levels = require('./levels');
const actionParser = require('./action-parser');

const traverse = (actionList, moves, actions, start, goal) => {
    if (actionList.length === moves) {
        let value = start;
        for (let i = 0; i < actionList.length; i++) {
            const action = actionList[i];
            value = actionParser(action)(value);
            if (parseInt(value) !== value) {
                return null;
            }
            if (Number.isNaN(value)) {
                throw new Error('actionList: ' + actionList.join(',') + '; value: ' + value + '; action: ' + action + '; index: ' + index);
            }
        }
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
