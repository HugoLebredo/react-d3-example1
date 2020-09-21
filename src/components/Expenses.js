import React, { Component } from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';
import _ from 'lodash';

import fitExpenses from '../services/fitExpenses';
import transformTest from '../services/transformTest';

import {width, height, margin, radius, daysOfTheWeek, colors} from '../data/config';

var dayWidth = 50;
var dayHeight = 80;
var fontSize = 10;

//d3 functions
const amountScale = d3.scaleLog();

var simulation = d3.forceSimulation()
    .alphaDecay(0.001)
    .velocityDecay(0.3)
    //.force('center',d3.forceCenter(width/2,height/2))
    //.force('charge',d3.forceManyBody(100))
    .force('collide', d3.forceCollide(radius + 5))
    .force('x',d3.forceX(d => d.focusX))
    .force('y',d3.forceY(d => d.focusY))
    .stop();

var drag = d3.drag();


var tooltip2 = d3.select("#div_customContent")
  .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");


class Expenses extends Component {

    constructor(props){
        super(props);
        this.state = {selectedWeek: null};

        this.forceTick = this.forceTick.bind(this);

        this.dragStart = this.dragStart.bind(this);
        this.dragExpense = this.dragExpense.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        //this.mouseOver = this.mouseOver.bind(this);
        
        simulation.on('tick',this.forceTick);
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);

        //crate tooltip shape
        this.tooltip = d3.select(this.refs.container).append('g');
        this.tooltip.append('rect')
          .attr('height', fontSize + 4)
          .attr('y', -fontSize / 2 - 2)
          .attr('opacity', 0.85)
          .attr('fill', colors.white);
        this.tooltip.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .attr('fill', colors.black)
          .style('font-size', fontSize)
          .style('pointer-events', 'none');

        this.calculateData();
        //this.renderDayCircles();
        //this.renderWeeks();
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

        //render week days of top
        var selectedWeekRadius = (width - margin.left - margin.right) / 2;
        var perAngle = Math.PI/6;  
        
        this.days  = _.map(daysOfTheWeek, date => {
            var [dayOfweek, name] = date;
            var angle = Math.PI - perAngle * dayOfweek;
            var cx =  selectedWeekRadius * Math.cos(angle) + selectedWeekRadius + margin.left;
            var cy =  selectedWeekRadius * Math.sin(angle) + margin.top;
            return { 
                date:  d3.timeDay.offset(this.props.selectedWeek,dayOfweek),
                name, cx, cy,  radius: 60
            }
        })

        this.expenses = transformTest(this.props);
        this.weeks = fitExpenses(this.props.expenses);

        var expensesExtent = d3.extent(this.expenses, d => d.Amount);
        amountScale.domain(expensesExtent);
    }

    renderCircles(){
        //draw expenses circles
        this.circles = this.container.selectAll('.expense')
            .data(this.expenses,d => d.name);
        //exit
        this.circles.exit().remove();

        //enter + update
        this.circles = this.circles.enter().append('circle')
                        .classed('expense',true)
                        .attr('fill', colors.white)
                        //.style('cursor', 'grab')
                        .attr('r',d => d.radius)
                        .attr('fill-opacity',1)
                        .attr('stroke-width', 2)
                        .call(drag)
                        //.on('mouseover', this.mouseOver)
                        //.on("mouseover", d => tooltip2.style("visibility", "visible"))
                        //.on('mouseleave', () => this.hover.style('display', 'none'))
                        .on("mouseout", d => tooltip2.style("visibility", "hidden"))
                        .merge(this.circles)
                        .attr('stroke', d => d.categories ? colors.black : '');              
    }

    //Depreciated
    renderDayCircles(){
        var days = this.container.selectAll('.days')
                        .data(this.days, d => d.name)
                        .enter().append('g')
                        .classed('days',true)
                        .attr('transform', d => 'translate('+[d.cx,d.cy]+')');

        var fontSize = 15;

        days.append('circle')
            .attr('r',d => d.radius)
            .attr('opacity',0.25)
            .attr('fill','#97FFD1');

        days.append('text')
            .attr('y',d => d.radius + fontSize)
            .attr('text-anchor','middle')
            .attr('dy','.35em')
            .attr('fill','#06DD88')
            .attr('font-weight',600)
            .text(d => d.name);
    }

    //Depreciated
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
            if(x - radius < expenseX && x + radius > expenseX &&
                y - radius < expenseY && y + radius > expenseY) {
                    this.dragged = {expense, category, type: 'category'};
                }
            }
         );
 
        // calculate if the expense is being overlap another dayweek
        _.each(this.days, day => {
            var {cx, cy, dayOfweek} = day
            if(cx <expenseX  &&  expenseX < cx + dayWidth  &&
            cy < expenseY && expenseY < cy + dayHeight ) {
                this.dragged = {expense, day, type: 'day'};
                }
            } 
         );
    }
    
    dragEnd(event) {
        
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;

        //The value of "dragged" is sent only when the drag ends
        if (this.dragged && this.dragged.type == 'category'){
            var {expense, category} = this.dragged;     
            this.props.linkToCategory(expense, category);
        } else if (this.dragged && this.dragged.type == 'day'){
            var {expense, day} = this.dragged;
            this.props.editDate(expense, day);
        }

        this.dragged = null;
    }

///////////////
/*
d3.select("expense")
  .on("mouseover", function(){return tooltip2.style("visibility", "visible");})
  .on("mousemove", function(){return tooltip2.style("top", (event.pageY-2390)+"px").style("left",(event.pageX-800)+"px");})
  .on("mouseout", function(){return tooltip2.style("visibility", "hidden");});


*//////////////
    render(){
        return (
                <g ref="container"/>
        )
    }
}

export default Expenses;