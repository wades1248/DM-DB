import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PlayerCard from './PlayerCard';

class PartyPreview extends Component {
    
    render(){
        const PlayerList = this.props.state.players.map((player, i) => 
            <PlayerCard
                player={player}
                key={i+1}
                onRemoveNewPlayer={this.props.onRemoveNewPlayer}
            />
        )
        return (
            <div className="partyPreview">
                <h1>PARTY PREVIEW</h1>
                <div>{PlayerList}</div>
                <Link to='/gen'><button type="button">DONE</button></Link>
            </div>
        )
    }
}

export default PartyPreview;