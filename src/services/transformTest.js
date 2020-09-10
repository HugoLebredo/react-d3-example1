import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import { width, height, margin, daysOfTheWeek } from '../data/config';

const xScale = d3.scaleBand().domain(_.map(daysOfTheWeek,0))

                             .range([margin.left, width - margin.right]);


var selectedWeekRadius = (width - margin.left - margin.right) / 2;

const trasformTest = (data,selectedWeek) => {
    console.log(data);
    var weeksExtent = d3.extent(Object.keys(data),d => new Date(d))
    
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height - margin.bottom, margin.top]);

    const UltimateData =_.chain(data)
    .map((week,key) => {
        selectedWeek = new Date(selectedWeek)
        key = new Date(key)
        return _.map(week,d => {
            var focusX = xScale(d.WeekDay);
            var focusY = yScale(new Date(key)) + height;
                
            if (key.getTime() === selectedWeek.getTime()) {

                var perAngle = Math.PI/6;
                var angle = Math.PI - perAngle * d.WeekDay;
                focusX = selectedWeekRadius * Math.cos(angle) + selectedWeekRadius + margin.left
                focusY = selectedWeekRadius * Math.sin(angle) + margin.top
        }
            return Object.assign(d ,{
                focusX,
                focusY,

            })
        })
    }).flatten().value()

    return(UltimateData);
}
    
export default trasformTest