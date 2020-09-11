import React, { Component } from 'react';
import * as d3 from 'd3';

import Expenses from './components/Expenses';
import Categories from './components/Categories';
import parseExpenses from './services/parseExpenses';
import expensesData from './data/expenses';

import {width, height} from './data/config';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      expenses: [],
      categories:[{name:'Parking',expenses:[],total:0},
                  {name:'Restaurants',expenses:[],total:0}
                ],
      selectedWeek: null
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
        <svg width={width} height={height * 2}>
          <Expenses {...this.state}/>
          <Categories {...this.state}/>
        </svg>
       
      </div>
      )
    };
  }

  export default App;
