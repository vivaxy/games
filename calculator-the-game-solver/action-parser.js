/**
 * @since 20180110 13:14
 * @author vivaxy
 */

module.exports = (action) => {
    return (value) => {
        if (action === 'Reverse') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            return symbol * Number(String(value * symbol).split('').reverse().join(''));
        }
        if (action === '<<') {
            return Number(String(value).slice(0, -1)) || 0;
        }
        if (action === '+/-') {
            return -value;
        }
        if (action === 'SUM') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            return symbol * String(value * symbol).split('').reduce((result, current) => {
                return Number(current) + Number(result);
            });
        }
        if (action.includes('=>')) {
            const [from, to] = action.split('=>');
            return Number(String(value).replace(new RegExp(from, 'g'), to));
        }
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

        throw new Error('Unsupported action: ' + action);
    }
};
