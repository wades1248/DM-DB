import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './PartyInput/Welcome';
import EncouterGenerator from './Encounter/EncouterGenerator';
import InitiativeTracker from './InitiativeTracker/InitiativeTracker'
import './App.css';

class App extends Component {
  state = {
    players:[],
    creatures:[],
    initiative:[],
  };

  addPlayer = player => {
    this.setState({
      players:[...this.state.players, player]
    })
  }

  removePlayer = playerID => {
    this.setState({
      players: this.state.players.filter(p => p.id !== playerID)
    })
  }

  handleEncounter = encounterCreatures => {
    if(encounterCreatures[0] !== undefined){
      this.setState({
        creatures: encounterCreatures
      })
      this.setState({
      initiative: (encounterCreatures.map(creature => {
        return{
          ...creature,
          initiative:(Math.floor(Math.random()*20)+creature.DexMod+1)
        }
      })).sort((a,b)=> (a.initiative < b.initiative)? 1 : -1)
    })}
    else{
      this.setState({
        creatures: ['error']
      })
    }
  }
  handleInitiative = player => {
    this.setState({
      initiative: [...this.state.initiative, player].sort((a,b)=> (a.initiative < b.initiative)? 1 : -1)
    });
  }
  
  clearInitiative = () => {
    this.setState({
      initiative: []
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
              onRemovePlayer={this.removePlayer}
              state={this.state}
            />}
          />
          <Route
            path='/gen'
            render={() =>
              <EncouterGenerator
                state={this.state}
                handleEncounter={this.handleEncounter}
                clearInitiative={this.clearInitiative}
              />
            }
          />
          <Route
            path='/tracker'
            render={() =>
              <InitiativeTracker
                state={this.state}
                onRemovePlayer={this.removePlayer}
                handleInitiative={this.handleInitiative}
              />
            }
          />
        </div>
      </main>
    )
  }
}

export default App;
