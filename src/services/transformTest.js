import _, { flatten, keyBy } from 'lodash';
import * as d3 from 'd3';

export var width = 900;
export var height = 500;
export var margin = {top:40, right:20, bottom:20, left:40};

const xScale = d3.scaleBand().domain([0,1,2,3,4,5,6])
                            .range([margin.left, width - margin.right]);

var selectedWeekRadius = (width - margin.left - margin.right) / 2;

const trasformTest = data => {
   
    const preprocesedData = _.chain(data)
        .filter(d => d.Amount < 0)
        .map(d => {
            const { Description } = d;
            const date = new Date(d['Trans Date'])
                return{
                    Description,
                    Amount: d.Amount < 0 ? -d.Amount : d.Amount,
                    date, 
                    WeekDay: date.getDay(),
                    }
            }
        ).groupBy(d => new Date(d3.timeWeek.floor(d.date))).value();
     
    console.log(preprocesedData);

    var weeksExtent = d3.extent(Object.keys(preprocesedData),d => new Date(d))
    const yScale = d3.scaleLinear().domain(weeksExtent)
                                    .range([height-margin.bottom, margin.top]);

    const UltimateData =_.chain(preprocesedData)
    .map((week,key) => {
        console.log(typeof(new Date(key)))
        return _.map(week,d => {
            var focusX = xScale(d.WeekDay)
            var focusY =  yScale(new Date(key)) + height
            if (key == weeksExtent[1]) {
                var perAngle = Math.PI/7
                var angle = perAngle * d.WeekDay;
                focusX = selectedWeekRadius * Math.cos(angle) + selectedWeekRadius
                focusY = selectedWeekRadius * Math.sin(angle) + margin.top
        }
            return Object.assign(d ,{
                focusX,
                focusY

            })
        })
    }).flatten().value()

    return(UltimateData);
}
    
export default trasformTest