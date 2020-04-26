import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import * as T from '../types/Types';

interface IProps {
    data: T.IData[];
    size: T.ISize;
};

function BubbleChart(props: IProps) {
    const d3Container = useRef(null);
    const height: number = props.size.height;
    const width: number = props.size.width;

    const pack = (data: T.IData[]) => d3.pack()
        .size([width - 2, height - 2])
        .padding(3)
        (d3.hierarchy({children: data})
        .sum((d: any) => d.value))

    const format = d3.format(",d");

    const color = d3.scaleOrdinal()
        .domain(props.data.map((data: T.IData) => data.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), props.data.length).reverse())

    useEffect(() => {
        if (props.data && d3Container.current) {
            const root = pack(props.data);

            const svg: any = d3
                .select(d3Container.current)
                .attr("viewBox", `0, 0, ${width}, ${height}`)
                .attr("font-size", 10)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle");

            const leaf = svg.selectAll("g")
                .data(root.leaves())
                .join("g")
                  .attr("transform", (d: any) => `translate(${d.x + 1},${d.y + 1})`);

            leaf.append("circle")
                .attr("r", (d: any) => d.r)
                .attr("fill-opacity", 0.7)
                .attr("fill", (d: any) => color(d.data.group));

            leaf.append("text")
                    .attr("clip-path", (d: any) => d.clipUid)
                .selectAll("tspan")
                .data((d: {data: T.IData}) => d.data.name === undefined ? "" : d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
                .join("tspan")
                    .attr("x", 0)
                    .text((d: any) => d);

            leaf.append("title")
                    .text((d: any) => `${d.data.title === undefined ? "" : `${d.data.title}
            `}${format(d.value)}`);

        }
    }, [props.data, color, format, height, width]);

    return (
        <svg
            width={width}
            height={height}
            ref={d3Container}
        />
    );
}

export default BubbleChart;
