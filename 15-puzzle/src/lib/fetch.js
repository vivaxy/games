/**
 * @since 20180124 10:25
 * @author vivaxy
 */

import 'whatwg-fetch';

const getHost = () => {
    if (location.host === 'vivaxy.github.io') {
        return 'https://coddee.1000-100.com';
    }
    return 'http://127.0.0.1:8080';
};

export default async({ path, data }) => {
    const resp = await fetch(`${getHost()}${path}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json;charset=utf-8', },
    });
    return await resp.json();
};
