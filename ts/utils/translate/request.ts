const fetch = require("node-fetch");

import * as T from './types'
import * as C from './constants'

export async function translate(params: T.ITranslateParams): Promise<T.ITranslateRequestAnswer> {
    let response = await fetch(encodeURI(`${C.TRANSLATE_URL}?key=${C.TRANSLATE_API_KEY}&text=${params.text}&lang=${params.lang}`))
    .then((response: { json: () => any; }) => response.json());
    return {
        text: response.text,
        status: response.code,
    };
}
