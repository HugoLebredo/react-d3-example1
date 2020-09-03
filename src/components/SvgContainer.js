import React, { Component } from 'react';
import * as d3 from 'd3';

var expenses = [
    {
        name: "Coffee",
        amount: 40,
        date: new Date()
    },
    {
        name: "Sandwich",
        amount: 58,
        date: new Date()
    },
    {
        name: "Carrot",
        amount: 10,
        date: new Date()
    }
];

var width = 900;
var height = 400;
var radius = 20;
var simulation = d3.forceSimulation()
    .force('center',d3.forceCenter(width/2,height/2))
    //.force('charge',d3.forceManyBody())
    .force('collide', d3.forceCollide(radius))
    .stop();

class ChartContainer extends Component {

    constructor(props){
        super(props);
        this.forceTick = this.forceTick.bind(this);
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);
        this.renderCircles();
        //simulation.on('tick',this.forceTick);
        simulation.nodes(expenses).alpha(0.9).restart();
        simulation.on('tick',this.forceTick);

    }

    componentDidUpdate(){
        this.renderCircles();
    }

    renderCircles(){
        //draw expenses circles
        this.circles = this.container.selectAll('circle')
            .data(expenses,d => d.name);

        //exit
        this.circles.exit().remove();

        //enter + update
        this.circles = this.circles.enter().append('circle')
                        .merge(this.circles)
                        .attr('r',d => radius)
                        .attr('opacity',0.5);
    }

    forceTick(){
        this.circles.attr('cx', d => d.x)
                    .attr('cy', d => d.y)
    }

    render(){
        return (
            <div>
                <h1>Elemento Svg</h1>
                <svg width={width} height={height} ref="container"></svg>
            </div>
        )
    }
}

export default ChartContainer;