import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';

import {width, height, colors } from '../data/config';

var amountScale =  d3.scaleLinear().domain([0,1000]);
var colorScale = chroma.scale(['#53c3ac', '#f7e883', '#e85178']);
var simulation = d3.forceSimulation()
    .alphaDecay(0.001)
    .velocityDecay(0.3)
    .force('collide', d3.forceCollide(d => d.radius + 15))
    .force('x',d3.forceX(d => d.focusX))
    .force('y',d3.forceY(d => d.focusY))
    .stop();

var drag = d3.drag();

class App extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.forceTick = this.forceTick.bind(this);

        this.dragStart = this.dragStart.bind(this);
        this.dragExpense = this.dragExpense.bind(this);
        this.dragEnd = this.dragEnd.bind(this);

        simulation.on('tick',this.forceTick);
        drag.on('start', this.dragStart)
            .on('drag', this.dragExpense)
            .on('end', this.dragEnd);

    }

    componentDidMount(){
        //this.container = d3.select(this.useRef.contenedor);
        this.container = d3.select(this.refs.container);
        this.calculateData();
        this.renderLinks();
        this.renderCircles();

        //start simulation every time this event will be called
        simulation.nodes(this.props.categories).alpha(0.9).restart();
    }

    componentDidUpdate(){
        this.calculateData();
        this.renderLinks();
        this.renderCircles();
    }

    calculateData(){
        this.categories = _.map(this.props.categories, category => {
            return Object.assign(category,{
                focusX:width /2,
                focusY: height /3,
                radius:70,
                fill: colorScale(amountScale(category.total)),
                fill2: colorScale(amountScale(5000))
            })
        })

    }

    renderLinks(){
        this.lines = this.container.selectAll('path')
        .data(this.props.links);
  
      // exit
        this.lines.exit().remove();
  
      // enter + update
        this.lines = this.lines.enter().insert('path', 'g')
            .attr('stroke', colors.black)
            .attr('stroke-width', 0.5)
            .attr('fill', 'none')
            .merge(this.lines);
    }

    renderCircles(){
        //update
        this.circles = this.container.selectAll('g')
            .data(this.categories);
        //debugger
        //exit
        this.circles.exit().remove();
        
        //enter
        var enter = this.circles.enter().append('g');
        enter.append('circle')

            //.attr('fill',d => amountScale(d.total))
            .attr('stroke-width',1)
            .attr('stroke', d => d.total ? colors.black : colors.gray)
            .attr('fill', d => d.total ? amountScale(d.total): colors.gray);

        
        enter.append('text')
            .attr('text-anchor','middle')
            .attr('dy','.35em')
            .style('font-family', 'CatMule Caps')
            .attr('fill', colors.black);
        
        //enter + update selection
        this.circles = enter.merge(this.circles);
        this.circles.select('circle')
            .attr('r', d => d.radius)
            .attr('stroke', d => d.total ? colors.black : '')
            .attr('fill', d => d.total ? d.fill: colors.gray);

        this.circles.select('text')
            .text(d => d.name);
    }

    forceTick(){
        this.circles.attr('transform', d => 'translate('+[d.x,d.y]+')');
        //
        this.lines
            .attr('transform', d => {
                var angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x);
                angle *= (180 / Math.PI);
                return'translate(' + [d.source.x, d.source.y] + ')rotate(' + angle + ')';
            }).attr('d', d => {
                var direction = d.source.date.getDay() < 3 ? -1 : 1;
                // calculate distance between source and target
                var dist = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                return 'M0,0 Q' + [dist / 2, direction * dist / 3] + ' ' + [dist, 0];
            });
        //simple line depreciated
        /*this.lines.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
        */
    }
    dragStart(event) {
        simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    
        //this.deleteIcon.style('display', 'block');
      }
    
      dragExpense(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
    
      dragEnd(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;

      } 
    render() {
        return (
            <g ref="container"/>
        );
    }
}

export default App;