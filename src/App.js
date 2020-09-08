import React from 'react';
import SvgContainer from './components/SvgContainer';

import parseExpenses from './services/parseExpenses';
import expensesRaw from './data/expenses';

import './App.css';

function App() {
  return (
        <SvgContainer expenses = {parseExpenses(expensesRaw)}/>
  );
}

export default App;
