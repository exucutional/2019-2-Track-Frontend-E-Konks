import * as T from './types'
import * as request from './request'

export async function translate(params: T.ITranslateParams): Promise<string> {
    let result = await request.translate(params);
    if (result.status === 200) {
        return result.text;
    }
    return `Error ${result.status}`;
}
