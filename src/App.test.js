import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Welcome from './PartyInput/Welcome'
import EncounterGenerator from './Encounter/EncouterGenerator'
import InitinativeTracker from './InitiativeTracker/InitiativeTracker'
import Instructions from './Instructions'
import NavBar from './NavBar'

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Welcome Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App>><Welcome /></App>, div);
  ReactDOM.unmountComponentAtNode(div); 
})

it('Encounter Generator Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App>><EncounterGenerator /></App>, div);
  ReactDOM.unmountComponentAtNode(div); 
})

it('Initiative tracker Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App>><InitinativeTracker /></App>, div);
  ReactDOM.unmountComponentAtNode(div); 
})

it('Instructions Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App>><Instructions /></App>, div);
  ReactDOM.unmountComponentAtNode(div); 
})

it('NAv Bar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App>><NavBar /></App>, div);
  ReactDOM.unmountComponentAtNode(div); 
})


