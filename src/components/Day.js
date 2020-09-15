import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import transformTest from '../services/transformTest';
import daysToCalendar from '../services/daysToCalendar';
import dailyAmountToCal from '../services/dailyAmountToCal';

import {width, height, margin, colors} from '../data/config';

var dayWidth = 50;
var dayHeight = 80;
var topPadding = 150;

var xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);
var yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);

class Day extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.container = d3.select(this.refs.container);
        this.calculateData();
        //this.renderBacks();
        this.renderDays();
    }

    componentDidUpdate(){
        this.calculateData();
        //this.renderBacks();
        this.renderDays();
    }

    calculateData(){
        this.expenses = transformTest(this.props);
        this.days = daysToCalendar(this.props)

        var weeksExtent = d3.extent(this.expenses, d => d3.timeWeek.floor(d.date))
        
        yScale.domain(weeksExtent);
 
        this.totalsByDay = _.chain(this.expenses)
            .groupBy(d => d3.timeDay.floor(d.date))
                .reduce((obj, expenses, date) => {
                     obj[date] = _.sumBy(expenses, 'Amount');
                    return obj;
                }, {}).value();


        this.totalsByDay = dailyAmountToCal(this.totalsByDay,this.props.selectedWeek);

        console.log(this.totalsByDay)
        
    }

    renderBacks() {
        this.rects = this.container.selectAll('.back')
                .data(this.days, d => d.name)
    
        //exit
        this.rects.exit().remove();

        //enter
        this.rects = this.rects.enter().insert('rect', '.day')
            .attr('x',-dayWidth)
            .attr('y',-dayHeight)
            .attr('width',dayWidth * 2)
            .attr('height',dayHeight * 1.5)
            .attr('transform', d => 'translate(' + [d.focusX, d.focusY] + ')')
            .attr('fill', colors.gray);
    }

    renderDays() {

        this.dailyAmount = this.container.selectAll('.days')
            .data(this.totalsByDay, d => d.name);

        //exit
        this.dailyAmount.exit().remove();

        //enter
        this.dailyAmount = this.dailyAmount.enter().insert('rect', '.day')
            .attr('x',-dayWidth)
            .attr('y',-dayHeight)
            .attr('width',dayWidth * 2)
            .attr('height',dayHeight * 1.5)
            .attr('transform', d => 'translate(' + [d.focusX, d.focusY] + ')')
            .attr('fill', d => d.fill);
            //.attr('fill', d =>colorScale(AmountScale(d.Amount)));

    }

    calculateDayPosition(date, shouldSelectedWeekCurve) {
        var dayOfWeek = date.getDay();
        var week = d3.timeWeek.floor(date);
        var x = xScale(dayOfWeek);
        var y = yScale(week) + height + 2 * dayHeight;
    
        if (shouldSelectedWeekCurve &&
          week.getTime() === this.props.selectedWeek.getTime()) {
          var offset = Math.abs(3 - dayOfWeek);
          y = height - 2 * dayHeight - 0.5 * offset * dayHeight;
        }
        y += topPadding;
    
        return {x, y, date};
    }

    render() {
        return (

               <g ref='container' />
        );
    }
}

export default Day;