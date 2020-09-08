import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import {width,height, margin} from '../data/config';

const xScale = d3.scaleBand().domain([0,1,2,3,4,5,6])
                            .range([margin.left, width - margin.right]);

const fitExpenses =  (data) => {
    
    var data = _.chain(data).groupBy(d => d3.timeWeek.floor(d.date)).value();

    var weeksExtent = d3.extent(Object.keys(data), d => new Date(d))

    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height-margin.bottom, margin.top]);

    const UltimateData =_.chain(data)
                        .map((week,key) => {
                            return _.map(week,d => {
                                return Object.assign(d ,{
                                    WeekDay: d.date.getDay(),
                                    focusX: xScale(d.WeekDay),
                                    focusY: yScale(new Date(key)) + height,
                                })
                            })
                        }).flatten().value()

    return(UltimateData);
}

export default fitExpenses;