import React, { Component } from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';
import _ from 'lodash';

import fitExpenses from '../services/fitExpenses';
import transformTest from '../services/transformTest';
import parseDaysOfWeek from '../services/parseDaysOfWeek';

import {width, height, margin, radius, daysOfTheWeek} from '../data/config';

//d3 functions
const colorScale = chroma.scale(['#42e9f5', 'lightblue', '#ff69b6']);
const amountScale = d3.scaleLog();

var simulation = d3.forceSimulation()
    .alphaDecay(0.001)
    .velocityDecay(0.3)
    //.force('center',d3.forceCenter(width/2,height/2))
    //.force('charge',d3.forceManyBody(100))
    .force('collide', d3.forceCollide(radius))
    .force('x',d3.forceX(d => d.focusX))
    .force('y',d3.forceY(d => d.focusY))
    .stop();

var drag = d3.drag();

class Expenses extends Component {

    constructor(props){
        super(props);
        this.state = {selectedWeek: null};
        this.forceTick = this.forceTick.bind(this);

        this.dragStart = this.dragStart.bind(this);
        this.dragExpense = this.dragExpense.bind(this);
        this.dragEnd = this.dragEnd.bind(this);

        simulation.on('tick',this.forceTick);
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);
        this.calculateData();
        this.renderDayCircles();
        this.renderWeeks();
        this.renderCircles();
        simulation.nodes(this.expenses).alpha(0.9).restart();

        //This other examples drag is used in componentWillmount
        drag.on('start',this.dragStart)
        .on('drag',this.dragExpense)
        .on('end',this.dragEnd);
    }

    componentDidUpdate(){
        //Needed for the transition when we do click iver the arrows
        this.calculateData();
        this.renderCircles();

        simulation.nodes(this.expenses).alpha(0.9).restart();
    }


    calculateData(){
        this.expenses = transformTest(this.props);
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
                        .call(drag)
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

        var daysRadius = 60;
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
  
    forceTick() {
        this.circles.attr('cx', d => d.x)
                    .attr('cy', d => d.y)
    }
    
    dragStart(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
  
    dragExpense(event) {
        this.dragged = null;

        event.subject.fx = event.x;
        event.subject.fy = event.y;

        var expenseX = event.x;
        var expenseY = event.y;
        var expense = event.subject;
       
        //checking if the position of the expense is into some category area
        // If is true the expense and category are assigned to the global variable "dragged"
        //it isnt required div the radius. Its a way to drag the expense to the center 
        //of the category center for doing the append
        _.each(this.props.categories, category => {
            var {x, y, radius} = category
            if(x - radius/2 < expenseX && x + radius/2 > expenseX &&
                y - radius/2 < expenseY && y + radius/2 > expenseY) {
                    this.dragged = {expense, category};
                }
            }
         )
    }
    
    dragEnd(event) {
        
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;

        //The value of "dragged" is sent only when the drag ends
        if (this.dragged){
            var {expense, category} = this.dragged;     
            this.props.linkToCategory(expense, category);
        }
        this.dragged = null;
    }

    render(){
        return (
 
                <g ref="container"></g>

        )
    }
}

export default Expenses;