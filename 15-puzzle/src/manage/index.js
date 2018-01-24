/**
 * @since 20180124 11:42
 * @author vivaxy
 */

import Fingerprint2 from 'fingerprintjs2';

import '../styles/manage.pcss';
import fetch from '../lib/fetch';
import getUsername from '../lib/getUsername';
import { storageKeys } from '../main/configs';

const input = document.querySelector('#username');
const submit = document.querySelector('.js-submit-button');

new Fingerprint2().get(async(fingerprint) => {
    input.value = getUsername({ fingerprint });
    input.disabled = false;
    submit.disabled = false;
});

submit.addEventListener('click', () => {
    if (submit.disabled) {
        return;
    }
    submit.disabled = true;
    new Fingerprint2().get(async(fingerprint) => {
        await fetch({
            path: '/api/15-puzzle/change-username',
            data: { username, fingerprint },
        });
        localStorage.setItem(storageKeys.USERNAME, username);
        submit.disabled = false;
    });
});
