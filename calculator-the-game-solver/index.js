/**
 * @since 20180110 13:12
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');

const levels = require('./levels');
const actionParser = require('./action-parser');

const traverse = (actionList, moves, actions, start, goal) => {
    if (actionList.length === moves) {
        let value = start;
        let currentActionList = [...actionList];
        for (let i = 0; i < currentActionList.length; i++) {
            const action = currentActionList[i];
            const result = actionParser(action)({ value, actions: currentActionList.slice(i + 1) });
            value = result.value;
            currentActionList = [...currentActionList.slice(0, i + 1), ...result.actions];
            // 小数
            if (parseInt(value) !== value) {
                return null;
            }
            // 过长
            if (String(value).length > 6) {
                return null;
            }
            if (Number.isNaN(value)) {
                throw new Error('actionList: ' + currentActionList.join(',') + '; value: ' + value + '; action: ' + action + '; index: ' + i);
            }
        }
        if (value === goal) {
            return currentActionList;
        }
        return null;
    }
    return actions.reduce((result, action) => {
        // if result has been found, return at once.
        return result || traverse(actionList.concat(action), moves, actions, start, goal);
    }, null);
};

(async () => {
    const levelKeyList = Object.keys(levels);
    // const levelKeyList = Object.keys(levels).slice(-1);
    const answers = levelKeyList.reduce((object, level) => {
        const { start, goal, actions, moves } = levels[level];
        return { ...object, [level]: traverse([], moves, actions, start, goal) };
    }, {});
    console.log(answers[levelKeyList.pop()].join(', '));
    await fse.outputFile(path.join(__dirname, 'answers.json'), JSON.stringify(answers, null, 4));
})();
