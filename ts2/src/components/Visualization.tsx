import React, { ReactHTMLElement} from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import BarChart from './BarChart';
import PieChart from './PieChart';
import BubbleChart from './BubbleChart';

import * as T from '../types/Types';

const Container: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    background: whitesmoke
`;

const Topic: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    align-self: flex-start;
    font: bold normal 50px monospace;
    color: dimgrey;
    margin: 30px;
    width: 90vw;
    border-bottom: ridge;
`;

const Header: StyledComponent<any, ReactHTMLElement<HTMLDivElement>, HTMLDivElement> = styled.div`
    display: flex;
    align-self: center;
    font: bold normal 60px monospace;
    color: white;
    width: 95vw;
    border-bottom: solid;
    justify-content: center;
    padding: 20px;
    padding-left: 50px;
    padding-right: 50px;
    background: steelblue;
`;

const Visualization: React.FunctionComponent<T.IVisualizationProps> = props => {
    return (
        <Container>
            <Header>FIFA 19 complete player dataset</Header>
            <Topic>Ages</Topic>
            <BarChart data={props.ages} size={{width: 1000, height: 800}}/>
            <Topic>Nationalities</Topic>
            <BubbleChart data={props.nationalities} size={{width: 1000, height: 1000}}/>
            <Topic>Positions</Topic>
            <PieChart data={props.positions} size={{width: 1000, height: 1000}}/>
        </Container>
    );
}

export default Visualization;
