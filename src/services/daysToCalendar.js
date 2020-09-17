import _ from 'lodash';
import * as d3 from 'd3';

import { width, height, margin } from '../data/config';

var dayHeight = 75;

const xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);

const daysToCalendar = data => {
    
    const {expenses,selectedWeek } = data;

    var days = (_.chain(expenses)
                .map( node =>  node ).flatten().value());
    
    var daysExtent = d3.extent(days, d => new Date(d.date));

    var backDays = d3.timeDay.range(daysExtent[0],
                                    d3.timeDay.offset(daysExtent[1],1));
    
    var weekExtent = d3.extent(backDays, d => d3.timeWeek(d));
                    
    var yScale = d3.scaleLinear().domain(weekExtent)
                    .range([height - margin.bottom, margin.top]);

    var test = (_.chain(backDays)
                    .map( day => {
                        var week = d3.timeWeek.floor(day);
                        var WeekDay = day.getDay();
                        var focusX = xScale(WeekDay);
                        var focusY = yScale(week) + height  + 150;
                        return ({
                            focusX,
                            focusY
                        })
                    }).value()
                )
              
    for (var i = 0; i < 7; i++){
        var offset = Math.abs(3 - i);
        var focusX = xScale(i);
        var focusY = height - 2 * dayHeight - 0.5 * offset * dayHeight + 150;
        test.push({focusX,focusY})
    }
  
    return test
}
    
export default daysToCalendar;