import _ from 'lodash';
import * as d3 from 'd3';

const parseExpenses = data => (
    _.chain(data)

    .filter(d => d.Amount < 0)
    .map(d => {
        const { Description } = d;
        const date = new Date(d['Trans Date'])
            return{
                Description,
                Amount: d.Amount < 0 ? -d.Amount : d.Amount,
                date
                }
        }
    ).groupBy(d => d3.timeWeek.floor(d.date)).value()

)
  
export default parseExpenses;