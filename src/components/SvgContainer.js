import React, { Component } from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import fitExpenses from '../services/fitExpenses';

import transformTest from '../services/transformTest';
import expensesRaw from '../data/expenses';

import {width,height, radius} from '../data/config';

//var expenses = transformExpenses(expensesRaw);
var expenses = transformTest(expensesRaw);

var expensesExtent = d3.extent(expenses, d => d.Amount);

//d3 functions
//var

const colorScale = chroma.scale(['#42e9f5', 'lightblue', '#ff69b6']);
const amountScale = d3.scaleLog().domain(expensesExtent);

var simulation = d3.forceSimulation()
    //.force('center',d3.forceCenter(width/2,height/2))
    //.force('charge',d3.forceManyBody(100))
    .force('collide', d3.forceCollide(radius))
    .force('x',d3.forceX(d => d.focusX))
    .force('y',d3.forceY(d => d.focusY))
    .stop();

class SvgContainer extends Component {

    constructor(props){
        super(props);
        //this.props.expenses = fitExpenses(this.props.expenses)
        console.log(this.props.expenses);
        this.state = {selectedWeek: null};
        this.forceTick = this.forceTick.bind(this);
        simulation.on('tick',this.forceTick);
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);
        this.renderCircles();
        simulation.nodes(expenses).alpha(0.9).restart();
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
                        .attr('fill-opacity',0.25)
                        .attr('stroke-width', 3)
                        .merge(this.circles)
                        .attr('fill', d => colorScale(amountScale(d.Amount)))
                        .attr('stroke', d => colorScale(amountScale(d.Amount)));              
    }
  
    forceTick(){
        this.circles.attr('cx', d => d.x)
                    .attr('cy', d => d.y)
    }

    render(){
        return (
            <div>
                <svg width={width} height={height * 2} ref="container"></svg>
            </div>
        )
    }
}

export default SvgContainer;