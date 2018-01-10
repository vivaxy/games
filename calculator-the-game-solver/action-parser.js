/**
 * @since 20180110 13:14
 * @author vivaxy
 */

module.exports = (action) => {
    return (value) => {
        if (action.startsWith('+')) {
            return value + Number(action.slice(1));
        }
        if (action.startsWith('-')) {
            return value - Number(action.slice(1));
        }
        if (action.startsWith('x')) {
            return value * Number(action.slice(1));
        }
        if (action.startsWith('/')) {
            return value / Number(action.slice(1));
        }
        if (String(Number(action)) === action) {
            return Number(String(value) + action);
        }
        if (action === 'Reverse') {
            if (value < 0) {
                return -Number(String(value).slice(1).split('').reverse().join(''))
            }
            return Number(String(value).split('').reverse().join(''));
        }
        if (action === '+/-') {
            return -value;
        }
    }
};
