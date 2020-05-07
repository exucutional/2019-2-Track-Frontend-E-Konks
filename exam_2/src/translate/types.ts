export interface ITranslateParams {
    lang: string | [string, string];
    text: string;
};

export interface ITranslateRequestAnswer {
    status: number;
    text: string;
};

export interface ICache {
    [key:string]: string;
};
