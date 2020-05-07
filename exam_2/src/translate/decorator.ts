import * as T from './types'

export function memoize(fn: Function): Function {
    const cache: T.ICache = {};
    let result: string = '';
    return async (...args: any[]) => {
        const key = JSON.stringify(args);
        if (typeof cache[key] === 'undefined') {
            result = await fn(...args);
            cache[key] = result;
            return result;
        }
        return cache[key];
    }
}
