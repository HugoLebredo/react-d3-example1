import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import { width, height, margin } from '../data/config';

var dayHeight = 75;

const xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);

const daysToCalendar = data => {
    
    const {expenses,selectedWeek } = data;
    console.log(expenses)
    var weeksExtent = d3.extent(Object.keys(expenses),d => new Date(d));

    var days = d3.timeDay.range(weeksExtent[0],
        d3.timeDay.offset(weeksExtent[1],1))
    
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height - margin.bottom, margin.top]);

    var resultado =  (_.chain(days)
        .map(day => {
                var WeekDay = day.getDay();
                var week = d3.timeWeek.floor(day);
                var focusX = xScale(WeekDay);
                var focusY = yScale(week) + height;
                //var focusY = yScale(new Date(key)) + height;
                if (week.getTime() === selectedWeek.getTime()) {
                    var offset = Math.abs(3 - WeekDay);
                    focusY = height - 2 * dayHeight - 0.5 * offset * dayHeight;
                 }
                return Object.assign(day ,{
                    WeekDay,
                    focusX,
                    focusY:focusY + 150,
                })
            }).value()
    )
    console.log(resultado);
    return resultado
}
    
export default daysToCalendar;