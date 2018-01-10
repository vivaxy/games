/**
 * @since 20180110 13:12
 * @author vivaxy
 */

const levels = require('./levels');
const actionParser = require('./action-parser');

const level = Object.keys(levels).pop();

const traverse = (actionList, moves, actions, calculate) => {
    if (actionList.length === moves) {
        if (calculate(actionList)) {
            return actionList;
        }
        return null;
    }
    return actions.reduce((result, action) => {
        return traverse(actionList.concat(action), moves, actions, calculate) || result;
    }, null);
};

const solve = () => {
    const { start, goal, actions, moves } = levels[level];

    return traverse([], moves, actions, (actionList) => {
        const v = actionList.reduce((value, action, index) => {
            const nextValue = actionParser(action)(value);
            if (Number.isNaN(nextValue)) {
                throw new Error('actionList: ' + actionList.join(',') + '; value: ' + value + '; action: ' + action + '; index: ' + index);
            }
            return nextValue;
        }, start);
        if (v === goal) {
            return actionList;
        }
        return null;
    });
};

console.log(solve());
