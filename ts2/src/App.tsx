import React, { useEffect, useState, ReactElement } from 'react';
import * as d3 from 'd3';
import Visualization from './components/Visualization';
import * as T from './types/Types';

interface ReadedData {
    ages: { [id: string] : number};
    nationalities: { [id: string] : number};
    positions: { [id: string] : number};
};

function buildProps(readedData: ReadedData): T.IVisualizationProps {
    let result: T.IVisualizationProps = {ages: [], nationalities: [], positions: []};
    Object.entries(readedData.ages).forEach(
        ([key, value]) => result.ages.push({name: key, value: value})
    );
    Object.entries(readedData.nationalities).forEach(
        ([key, value]) => result.nationalities.push({name: key, value: value})
    );
    Object.entries(readedData.positions).forEach(
        ([key, value]) => result.positions.push({name: key, value: value})
    );
    return result;
}

function processData(readedData: ReadedData): void {
    Object.entries(readedData.nationalities).forEach(
        ([key, value]) => {
            if (value < 10) {
                if (readedData.nationalities["Others"] === undefined) {
                    readedData.nationalities["Others"] = 0;
                }
                readedData.nationalities["Others"] += value;
                delete readedData.nationalities[key];
            }
        }
    );
    Object.entries(readedData.positions).forEach(
        ([key, value]) => {
            if (value < 100) {
                if (readedData.positions["Others"] === undefined) {
                    readedData.positions["Others"] = 0;
                }
                readedData.positions["Others"] += value;
                delete readedData.positions[key];
            }
        }
    );
}

async function readData(path: string): Promise<T.IVisualizationProps> {
    let readedData: ReadedData = {ages: {}, nationalities: {}, positions: {}};
    let result: T.IVisualizationProps = {ages: [], nationalities: [], positions: []};
    result = await d3.csv(path).then((data: d3.DSVRowArray<string>) => {
        data.forEach((entry: d3.DSVRowString) => {
            if (entry.Age) {
                readedData.ages[entry.Age] = (readedData.ages[entry.Age] || 0) + 1;
            }
            if (entry.Nationality) {
                readedData.nationalities[entry.Nationality] = (readedData.nationalities[entry.Nationality] || 0) + 1;
            }
            if (entry.Position) {
                readedData.positions[entry.Position] = (readedData.positions[entry.Position] || 0) + 1;
            }
        });
        processData(readedData);
        return buildProps(readedData);
    });
    return result;
}

/* App */
const App = (): ReactElement => {
    let defaultProps: T.IVisualizationProps = {ages: [], nationalities: [], positions: []};
    const [props, setProps] = useState(defaultProps);
    useEffect(() => {
        readData("https://raw.githubusercontent.com/amanthedorkknight/fifa18-all-player-statistics/master/2019/data.csv")
            .then((data: T.IVisualizationProps) => setProps(data));
    }, [])
    return (
        <div className="my-app">
            <Visualization ages={props.ages} nationalities={props.nationalities} positions={props.positions}/>
        </div>
    )
}

export default App;
