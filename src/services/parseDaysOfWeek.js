import _ from 'lodash';

import {width, margin} from '../data/config';

var selectedWeekRadius = (width - margin.left - margin.right) / 2;

var perAngle = Math.PI/6;

const parseDaysOfWeek = (daysOfWeek) => {

    const daysParsed = _.map(daysOfWeek, date => {
                            var [dayOfweek, name] = date;
                            var angle = Math.PI - perAngle * dayOfweek;
                            var cx =  selectedWeekRadius * Math.cos(angle) + selectedWeekRadius + margin.left;
                            var cy =  selectedWeekRadius * Math.sin(angle) + margin.top;
                            return { 
                                name, cx, cy, dayOfweek, radius: 60
                            }
    })

    return(daysParsed);
}

export default parseDaysOfWeek;