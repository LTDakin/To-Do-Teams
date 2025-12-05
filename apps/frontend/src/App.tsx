import React from 'react';
import './App.css';
import { Checkbox } from 'antd';

function App() {
  return (
    <div className="App">
      <div>
        <h1>ToDo's</h1>
        <Checkbox checked={true} >Sample ToDo Item</Checkbox>
        <Checkbox checked={true} >Sample ToDo Item</Checkbox>
        <Checkbox checked={true} >Sample ToDo Item</Checkbox>
        <Checkbox checked={true} >Sample ToDo Item</Checkbox>
        <Checkbox checked={true} >Sample ToDo Item</Checkbox>
      </div>
    </div>
  );
}

export default App;
