import _ from 'lodash';
import * as d3 from 'd3';
import chroma from 'chroma-js';

import { width, height, margin } from '../data/config';

var dayHeight = 75;

var formatTime = d3.timeFormat("%d/%m");

var AmountScale = d3.scaleLog();
var colorScale = chroma.scale(['#53c3ac', '#f7e883', '#e85178']);

const xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);

const dailyAmountToCal = (Amount,selectedWeek) => {

    var AmountExtent = d3.extent(_.values(Amount));
    
    AmountScale.domain(AmountExtent);

    var weeksExtent = d3.extent(Object.keys(Amount),d => {
                d = new Date(d);
                return d3.timeWeek.floor((d))
            })
    
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height - margin.bottom, margin.top]);

    var resultado =  (_.chain(Amount)
        .map((Amount,day) => {
                day = new Date(day)
                var WeekDay = day.getDay();
                var week = d3.timeWeek.floor(day);
                var focusX = xScale(WeekDay);
                var focusY = yScale(week) + height;
                if (week.getTime() === selectedWeek.getTime()) {
                    var offset = Math.abs(3 - WeekDay);
                    focusY = height - 2 * dayHeight - 0.5 * offset * dayHeight;
                 }
                return {
                    dayText: formatTime(day),
                    Amount,
                    WeekDay,
                    focusX,
                    focusY:focusY + 150,
                    fill: colorScale(AmountScale(Amount))
                }
            }).value()
    )
 
    return resultado
}
    
export default dailyAmountToCal;