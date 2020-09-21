import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

import { width, height, margin , radius} from '../data/config';

var dayHeight = 75;

const xScale = d3.scaleLinear().domain([0, 6])
                             .range([margin.left, width - margin.right]);

var radiusScale = d3.scaleLinear().range([radius, 2 * radius]);

const trasformTest = (data) => {
    
    const {expenses,selectedWeek }= data;

    const flatExpenses = _.chain(expenses).map(d => d).flatten().value()

    const expensesExtent = d3.extent(flatExpenses, d => d.Amount)
    
    radiusScale.domain(expensesExtent);

    var weeksExtent = d3.extent(Object.keys(expenses),d => new Date(d))
    
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height - margin.bottom, margin.top]);

    return (_.chain(expenses)
        .map((week,key) => {
            key = new Date(key);
            return _.map(week,d => {
                var WeekDay = d.date.getDay();
                var focusX = xScale(WeekDay);
                var focusY = yScale(new Date(key)) + height;
                if (key.getTime() === selectedWeek.getTime()) {
                   var offset = Math.abs(3 - WeekDay);
                   focusY = height - 2 * dayHeight - 0.5 * offset * dayHeight;

            }
                return Object.assign(d ,{
                    WeekDay,
                    radius: radiusScale(d.Amount),
                    focusX,
                    focusY:focusY + 125,
                })
            })
        }).flatten().value()
    )
}
    
export default trasformTest