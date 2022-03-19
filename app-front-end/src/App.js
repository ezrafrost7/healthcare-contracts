import React, { Component } from 'react';
import './App.css';
import Block from './components/block';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h3>Welcome to the Healthcare App</h3>
          <p>
            Your data will be loaded here
          </p>
          <div className='block'>
            <Block/>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
