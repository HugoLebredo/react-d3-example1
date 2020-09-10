import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import {width,height, margin} from '../data/config';

const xScale = d3.scaleBand().domain([0,1,2,3,4,5,6])
                            .range([margin.left, width - margin.right]);

const fitExpenses =  (data) => {

    var weeksExtent = d3.extent(Object.keys(data), d => new Date(d))

    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height-margin.bottom, margin.top]);
    
    var weeks = d3.timeWeek.range(weeksExtent[0],
                                d3.timeWeek.offset(weeksExtent[1],1))
    
    weeks = weeks.map(week => {
        return{
            week,
            x: margin.left,
            y: yScale(week) + height
        }
    })
    
   return(weeks);
}

export default fitExpenses;