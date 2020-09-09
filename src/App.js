import React, { Component } from 'react';
import * as d3 from 'd3';

import SvgContainer from './components/SvgContainer';
import parseExpenses from './services/parseExpenses';
import expensesData from './data/expenses';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      expenses: [],
      selectedWeek:null
    }
  }

  componentWillMount(){
    var expenses = parseExpenses(expensesData);
    var selectedWeek = d3.max(expenses,day => d3.timeWeek.floor(day.date));
    this.setState({expenses, selectedWeek});
  }
  render(){
      var formatweek = d3.timeFormat('%d %B %Y')(this.state.selectedWeek)
    return(
      <div>
        <h2>
          <span onClick = {this.prevWeek}>←</span>
          {formatweek}
          <span onClick = {this.nextWeek}>→</span>
        </h2>
        <SvgContainer {...this.state}/>
      </div>
      )
    };
  }

  export default App;
