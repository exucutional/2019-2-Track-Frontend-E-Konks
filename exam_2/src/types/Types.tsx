export interface IInputTextProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export interface IInputLanguage {
    lang: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
}
