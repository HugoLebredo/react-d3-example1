import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import { width, height, margin } from '../data/config';

const xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);

var selectedWeekRadius = (width - margin.left - margin.right) / 2;

const trasformTest = (data) => {
    
    const {expenses,selectedWeek }= data;

    var weeksExtent = d3.extent(Object.keys(expenses),d => new Date(d))
    
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height - margin.bottom, margin.top]);

    return (_.chain(expenses)
        .map((week,key) => {
            console.log()
            key = new Date(key);
            return _.map(week,d => {
                var WeekDay = d.date.getDay();
                var focusX = xScale(WeekDay);
                var focusY = yScale(new Date(key)) + height;
                if (key.getTime() === selectedWeek.getTime()) {
                    var perAngle = Math.PI/6;
                    var angle = Math.PI - perAngle * WeekDay;
                    focusX = selectedWeekRadius * Math.cos(angle) + selectedWeekRadius + margin.left
                    focusY = selectedWeekRadius * Math.sin(angle) + margin.top
            }
                return Object.assign(d ,{
                    WeekDay,
                    focusX,
                    focusY,
                })
            })
        }).flatten().value()
    )
}
    
export default trasformTest