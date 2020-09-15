import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import Expenses from './components/Expenses';
import Day from './components/Day';
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
                  {name:'Restaurants',expenses:[],total:0},
                  {name:'Travels',expenses:[],total:0}
                ],
      selectedWeek: null,
      daysOfWeek: null
    };

    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.editDate = this.editDate.bind(this);
    this.linkToCategory = this.linkToCategory.bind(this);
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

  editDate(expense, day){
      console.log(expense)
      expense.date = day.date;
      console.log(expense)
      this.forceUpdate();
  }

  linkToCategory(expense, category){
    if (_.includes(category.expenses, expense)){
      category.expenses = _.without(category.expense, expense);
    } else {
      category.expenses.push(expense)
    }

    category.total = _.sumBy(category.expenses,'Amount');
    this.forceUpdate();
  }
    //add a link between the category and the expense

  render(){
    var formatweek = d3.timeFormat('%d %B %Y')(this.state.selectedWeek)
    var links = []

    _.each(this.state.categories, category => {
      _.each(category.expenses, expense => {
          if (d3.timeWeek.floor(expense.date).getTime() === this.state.selectedWeek.getTime()){
            links.push({
              source: expense,
              target: category
            })
          }
      })
    })

    var props = {
        linkToCategory: this.linkToCategory,
        editDate: this.editDate,
        links: links,
      }

    var style = {
      margin: 'auto'
    }
    
    return(
      <div className="App" style={style}>
        <h1 style={{textAlign: 'center'}}>
          <span style={{cursor: 'pointer'}} onClick = {this.prevWeek}>←</span>
          Weef of {formatweek}
          <span style={{cursor: 'pointer'}}  onClick = {this.nextWeek}>→</span>
        </h1>
        <svg width={width} height={height * 3}>
          <Day {...props} {...this.state}/>
          <Expenses {...props} {...this.state}/>
          <Categories {...props} {...this.state}/>
        </svg>
       
      </div>
      )
    };
  }

  export default App;
