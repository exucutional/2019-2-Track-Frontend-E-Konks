export interface ISize {
    width: number;
    height: number;
};

export interface IData {
    name: string;
    value: number;
};

export interface IVisualizationProps {
    ages: IData[];
    nationalities: IData[];
    positions: IData[];
};
