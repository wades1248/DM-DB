import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './PartyInput/Welcome';
import EncouterGenerator from './Encounter/EncouterGenerator';
import InitiativeTracker from './InitiativeTracker/InitiativeTracker';
import UpdatePlayer from './PartyInput/EditPlayer';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    players:[],
    creatures:[],
    initiative:[],
    allPlayers:[],
    allCreatures: [],
    error: {}
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
          initiative:(Math.floor(Math.random()*20)+creature.dexmod+1)
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
  removeFromInitiative = item => {
    this.setState({
      initiative: this.state.initiative.filter(i => (i.name && i.id) !== (item.name && item.id))
    })
  }
  clearInitiative = () => {
    this.setState({
      initiative: []
    })
  }
  GetByDMID = DMID => {
     const allPlayers = this.state.allPlayers
     const partyPlayers = allPlayers.filter(player => player.dmid === DMID)
     this.setState({
       players: partyPlayers
     })
  }
  updatePlayer = player => {
    this.removePlayer(player.id)
    this.addPlayer(player)
  }
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/players`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(res => this.setState({allPlayers: res}))
    .catch(error => {
      console.error(error)
      this.setState({error})
    })
    fetch(`${config.API_ENDPOINT}/creatures`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(res => this.setState({allCreatures: res}))
    .catch(error => {
      console.error(error)
      this.setState({error})
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
              GetByDMID={this.GetByDMID}
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
          <Route
            path='/update/:playerID'
            render={(props) => 
              <UpdatePlayer
                {...props}
                onUpdatePlayer={this.updatePlayer}
              />
            }
          />
        </div>
      </main>
    )
  }
}

export default App;
