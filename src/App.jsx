import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app-container">
      <div className="task-list-container">
        <h1 className="heading">To-Do List</h1>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
