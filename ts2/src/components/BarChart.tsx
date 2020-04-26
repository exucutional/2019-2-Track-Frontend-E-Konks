import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import * as T from '../types/Types';

interface IProps {
    data: T.IData[];
    size: T.ISize;
};

interface IMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

function BarChart(props: IProps) {
    const d3Container = useRef(null);
    const height: number = props.size.height;
    const width: number = props.size.width;
    const margin: IMargin = ({top: 20, right: 0, bottom: 30, left: 40});

    const x = d3.scaleBand()
        .domain(props.data.map((data: T.IData) => data.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y =  d3.scaleLinear()
        .domain([0, d3.max(props.data, (data: T.IData) => data.value) as number]).nice()
        .range([height - margin.bottom, margin.top])

    useEffect(() => {
        if (props.data && d3Container.current) {
            const xAxis = (g: any) => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))

            const yAxis = (g: any) => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call((g: any) => g.select(".domain").remove())

            const svg: any = d3
                .select(d3Container.current)
                .attr("viewBox", `0, 0, ${width}, ${height}`)

            svg.append('g')
                    .attr("class", "bars")
                    .attr("fill", "steelblue")
                .selectAll("rect")
                .data(props.data)
                .join("rect")
                    .attr("x", (d: T.IData) => x(d.name))
                    .attr("y", (d: T.IData) => y(d.value))
                    .attr("height", (d: T.IData) => y(0) - y(d.value))
                    .attr("width", x.bandwidth());

            svg.append("g")
                .attr("class", "x-axis")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y-axis")
                .call(yAxis);
        }
    }, [props.data, height, width, x, y, margin]);

    return (
        <svg
            width={width}
            height={height}
            ref={d3Container}
        />
    );
}

export default BarChart;
