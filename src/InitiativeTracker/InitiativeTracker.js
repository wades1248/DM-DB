import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import InitiativeList from './InitiativeList';
import PlayerInitiativeInput from './PlayerInitiativeInputCard.js';


class InitiativeTracker extends Component {
    state= {
        players:this.props.state.players
    }
    onRemovePlayerFromInputList= player => {
        this.setState({
            players: this.state.players.filter(item=> item.id !== player.id)
        })
    }
    render() {
        function PartyInitiativeInput(players, removePlayer,removePlayerFromInputList,handleInitiative) {
            return(players.map((player,i) => {
                return(
                    <PlayerInitiativeInput
                        player={player}
                        key={i+1}
                        onRemovePlayer={removePlayer}
                        handleInitiative={handleInitiative}
                        onRemovePlayerFromInputList= {removePlayerFromInputList}
                    /> 
                )}     
            ))
        }
        return(
            <div>
                <h1>Initiative Tracker</h1>
                <p>Please enter the initiative of the party members below (creature initiative has been rolled for you).</p>
                {PartyInitiativeInput(this.state.players, this.props.onRemovePlayer, this.onRemovePlayerFromInputList , this.props.handleInitiative)}
                <InitiativeList
                    state={this.props.state}
                />
                <Link to='/gen'><button>Return to Generator</button></Link>
            </div>
        )
    }
}
export default withRouter(InitiativeTracker);