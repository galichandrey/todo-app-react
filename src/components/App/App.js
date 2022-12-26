import React from 'react';

import Header from '../Header'
import Footer from "../Footer";
import TaskList from '../TaskList';

import './App.css';

const App = () => {

  const TASKS = [
    {taskText: 'Completed task', status: 'completed', taskCreationDate: 'created 17 seconds ago'},
    {taskText: 'Editing task', status: 'editing', taskCreationDate: 'Now'},
    {taskText: 'Active task', status: 'active', taskCreationDate: 'created 5 minutes ago'}
  ];

  return (
    <section class="todoapp">
    
    <Header />

    <section class="main">
      <TaskList tasks={TASKS}/>
      <Footer />
    </section>

  </section>
  );
}

export default App;