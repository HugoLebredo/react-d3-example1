import React, { Component } from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import transformExpenses from '../services/transformExpenses';
import expensesRaw from '../data/expenses';

var width = 900;
var height = 900;
var radius = 20;
//var expenses = expensesRaw;
var expenses = transformExpenses(expensesRaw);
var expensesExtent = d3.extent(expenses, d => d.Amount);

//d3 functions
//var
const colorScale = chroma.scale(['#fafa6e', 'lightgreen','008ae5']);
const amountScale = d3.scaleLinear().domain(expensesExtent);
var simulation = d3.forceSimulation()
    .force('center',d3.forceCenter(width/2,height/2))
    .force('charge',d3.forceManyBody(-10))
    .force('collide', d3.forceCollide(10))
    .stop();

class ChartContainer extends Component {

    constructor(props){
        super(props);
        this.forceTick = this.forceTick.bind(this);
        simulation.on('tick',this.forceTick);
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);
        this.renderCircles();
        simulation.nodes(expenses).alpha(0.9).restart();
        console.log(expenses);
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
                        .attr('fill', d => colorScale(amountScale(d.Amount)))
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