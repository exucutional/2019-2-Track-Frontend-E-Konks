import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import * as T from '../types/Types';

interface IProps {
    data: T.IData[];
    size: T.ISize;
};

function PieChart(props: IProps) {
    const d3Container = useRef(null);
    const height: number = props.size.height;
    const width: number = props.size.width;

    const radius: number = Math.min(width, height) / 2 * 0.8;
    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1)

    const color = d3.scaleOrdinal()
        .domain(props.data.map((data: T.IData) => data.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), props.data.length).reverse())

    const pie = d3.pie()
        .sort(null)
        .value((data: any) => data.value);

    useEffect(() => {
        if (props.data && d3Container.current) {
            const arcs = pie(props.data as any);

            const svg: any = d3
                .select(d3Container.current)
                .attr("viewBox", `${-width / 2}, ${-height / 2}, ${width}, ${height}`)

            svg.append("g")
                    .attr("stroke", "white")
                .selectAll("path")
                .data(arcs)
                .join("path")
                    .attr("fill", (d: {data: T.IData}) => color(d.data.name))
                    .attr("d", arc)
                .append("title")
                    .text((d: {data: T.IData}) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

            svg.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 12)
                    .attr("text-anchor", "middle")
                .selectAll("text")
                .data(arcs)
                .join("text")
                    .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`)
                    .call((text: any) => text.append("tspan")
                        .attr("y", "-0.4em")
                        .attr("font-weight", "bold")
                        .text((d: {data: T.IData}) => d.data.name))
                    .call((text: any) => text.filter((d: any) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                        .attr("x", 0)
                        .attr("y", "0.7em")
                        .attr("fill-opacity", 0.7)
                        .text((d: {data: T.IData}) => d.data.value.toLocaleString()));
        }
    }, [props.data, arc, arcLabel, color, height, pie, width]);

    return (
        <svg
            width={width}
            height={height}
            ref={d3Container}
        />
    );
}

export default PieChart;
