import { storageKeys } from '../main/configs';

/**
 * @since 20180124 11:44
 * @author vivaxy
 */

export default ({ fingerprint }) => {
    const username = localStorage.getItem(storageKeys.USERNAME);
    if (username) {
        return username;
    }
    const defaultUsername = fingerprint.slice(0, 10);
    localStorage.setItem(storageKeys.USERNAME, defaultUsername);
    return defaultUsername;
};
