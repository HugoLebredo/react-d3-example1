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
    };

    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  componentWillMount(){
    var expenses = parseExpenses(expensesData);
    var selectedWeek = d3.max(Object.keys(expenses),d => new Date(d));
    this.setState({expenses, selectedWeek});
  }

  prevWeek(){
    var selectedWeek = d3.timeWeek.offset(this.state.selectedWeek,-1);
    this.setState({selectedWeek});
      }

  nextWeek(){
    var selectedWeek = d3.timeWeek.offset(this.state.selectedWeek,1);
    this.setState({selectedWeek});
  }

  render(){
      var formatweek = d3.timeFormat('%d %B %Y')(this.state.selectedWeek)
    return(
      <div>
        <h2>
          <span style={{cursor: 'pointer'}} onClick = {this.prevWeek}>←</span>
          {formatweek}
          <span style={{cursor: 'pointer'}}  onClick = {this.nextWeek}>→</span>
        </h2>
        <SvgContainer {...this.state}/>
      </div>
      )
    };
  }

  export default App;
