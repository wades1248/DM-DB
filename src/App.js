import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './Welcome';
import EncouterGenerator from './EncouterGenerator';
import InitiativeTracker from './InitiativeTracker'
import './App.css';

class App extends Component {
  state = {
    players:[],
    creatures:[],
    initiative:[]
  };

  addPlayer = player => {
    this.setState({
      players:[...this.state.players, player]
    })
  }

  removeNewPlayer = playerID => {
    this.setState({
      players: this.state.players.filter(p => p.id !== playerID)
    })
  }

  encouterGenerate = encounterCreatures => {
    this.setState({
      creatures: encounterCreatures
    })
  }

  render(){
    return(
      <main className='App'>
        <div className='content'>
          <Route
            exact path = '/'
            render={() =>
            <Welcome
              onAddPlayer={this.addPlayer}
              onRemoveNewPlayer={this.removeNewPlayer}
              state={this.state}
            />}
          />
          <Route
            path='/gen'
            render={({history}) =>
              <EncouterGenerator
                state={this.state}
                encounterGenerate={this.encouterGenerate}
              />
            }
          />
          <Route
            path='/tracker'
            render={({history}) =>{
              return <InitiativeTracker/>
            }}
          />
        </div>
      </main>
    )
  }
}

export default App;
