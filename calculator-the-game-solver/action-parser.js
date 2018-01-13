/**
 * @since 20180110 13:14
 * @author vivaxy
 */

module.exports = (action) => {
    return ({ value, actions }) => {
        if (action === 'Reverse') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            return { value: symbol * Number(String(value * symbol).split('').reverse().join('')), actions };
        }
        if (action === '<<') {
            return { value: Number(String(value).slice(0, -1)) || 0, actions };
        }
        if (action === '+/-') {
            return { value: -value, actions };
        }
        if (action === 'SUM') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            return {
                value: symbol * String(value * symbol).split('').reduce((result, current) => {
                    return Number(current) + Number(result);
                }),
                actions,
            };
        }
        if (action === '<Shift') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            const valueString = String(value * symbol);
            return { value: symbol * Number(valueString.slice(1) + valueString[0]), actions };
        }
        if (action === 'Shift>') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            const valueString = String(value * symbol);
            return { value: symbol * Number(valueString.slice(-1) + valueString.slice(0, -1)), actions };
        }
        if (action === 'Mirror') {
            let symbol = 1;
            if (value < 0) {
                symbol = -1;
            }
            const valueString = String(value * symbol);
            return { value: symbol * Number(valueString + valueString.split('').reverse().join('')), actions };
        }
        if (action.startsWith('Store')) {
            if (action === 'Store') {
                // todo
            }
        }
        if (action.startsWith('[+]')) {
            return {
                value,
                actions: actions.map((act) => {
                    const v = Number(action.slice(3));
                    if (act.startsWith('x^')) {
                        return 'x^' + String(Number(act.slice(1)) + v);
                    }
                    if (act.startsWith('+')) {
                        return '+' + String(Number(act.slice(1)) + v);
                    }
                    if (act.startsWith('-')) {
                        return '-' + String(Number(act.slice(1)) + v);
                    }
                    if (act.startsWith('x')) {
                        return 'x' + String(Number(act.slice(1)) + v);
                    }
                    if (act.startsWith('/')) {
                        return '/' + String(Number(act.slice(1)) + v);
                    }
                    if (String(Number(act)) === act) {
                        return String(Number(act) + v);
                    }
                    return act;
                }),
            };
        }
        if (action.startsWith('x^')) {
            return { value: Math.pow(value, Number(action.slice(2))), actions };
        }
        if (action.startsWith('+')) {
            return { value: value + Number(action.slice(1)), actions };
        }
        if (action.startsWith('-')) {
            return { value: value - Number(action.slice(1)), actions };
        }
        if (action.startsWith('x')) {
            return { value: value * Number(action.slice(1)), actions };
        }
        if (action.startsWith('/')) {
            return { value: value / Number(action.slice(1)), actions };
        }
        if (action.includes('=>')) {
            const [from, to] = action.split('=>');
            return { value: Number(String(value).replace(new RegExp(from, 'g'), to)), actions };
        }
        if (String(Number(action)) === action) {
            return { value: Number(String(value) + action), actions };
        }

        throw new Error('Unsupported action: ' + action);
    }
};
