import React, { Component } from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import fitExpenses from '../services/fitExpenses';

import transformTest from '../services/transformTest';
import parseDaysOfWeek from '../services/parseDaysOfWeek';

import expensesRaw from '../data/expenses';

import {width, height, margin, radius, daysOfTheWeek} from '../data/config';

//d3 functions

const colorScale = chroma.scale(['#42e9f5', 'lightblue', '#ff69b6']);
const amountScale = d3.scaleLog();

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
        
        this.state = {selectedWeek: null};
        this.forceTick = this.forceTick.bind(this);
        simulation.on('tick',this.forceTick);
    }

    componentDidMount(){
        //console.log(this.props.expenses);
        this.container = d3.select(this.refs.container);
        this.calculateData();
        this.renderDayCircles();
        this.renderWeeks();
        this.renderCircles();
        simulation.nodes(this.expenses).alpha(0.9).restart();
    }

    componentDidUpdate(){
        this.calculateData();
        this.renderDayCircles();
        this.renderWeeks();
        this.renderCircles();
    }

    calculateData(){
        this.expenses = transformTest(expensesRaw);
        this.weeks = fitExpenses(this.props.expenses);
        this.daysofweek = parseDaysOfWeek(daysOfTheWeek);
        var expensesExtent = d3.extent(this.expenses, d => d.Amount);
        amountScale.domain(expensesExtent);
    }

    renderCircles(){
        //draw expenses circles
        this.circles = this.container.selectAll('.expenses')
            .data(this.expenses,d => d.name);

        //exit
        this.circles.exit().remove();

        //enter + update
        this.circles = this.circles.enter().append('circle')
                        .classed('expenses',true)
                        .merge(this.circles)
                        .attr('r',d => radius)
                        .attr('fill-opacity',0.25)
                        .attr('stroke-width', 3)
                        .merge(this.circles)
                        .attr('fill', d => colorScale(amountScale(d.Amount)))
                        .attr('stroke', d => colorScale(amountScale(d.Amount)));              
    }

    renderDayCircles(){
        var days = this.container.selectAll('.days')
                        .data(this.daysofweek, d => d.name)
                        .enter().append('g')
                        .classed('days',true)
                        .attr('transform', d => 'translate('+[d.cx,d.cy]+')');

        var daysRadius = 80;
        var fontSize = 15;

        days.append('circle')
            .attr('r',d => daysRadius)
            .attr('opacity',0.25)
            .attr('fill','#97FFD1');

        days.append('text')
            .attr('y',daysRadius + fontSize)
            .attr('text-anchor','middle')
            .attr('dy','.35em')
            .attr('fill','#06DD88')
            .attr('font-weight',600)
            .text(d => d.name);

    }

    renderWeeks(){
        var weeks = this.container.selectAll('.weeks')
                .data(this.weeks, d => d.name)
                .enter().append('g')
                .classed('week',true)
                .attr('transform', d => 'translate('+[d.x,d.y]+')');
        
        var regHeight = 10

        weeks.append('rect')
            .attr('width', width - margin.left - margin.right)
            .attr('height', regHeight)
            .attr('fill', 'pink')
            .attr('opacity',0.25);
        
        var weekFormat = d3.timeFormat('%m/%d')

        weeks.append('text')
            .attr('text-anchor','end')
            .attr('dy','.35em')
            .text(d => weekFormat(d.week));

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