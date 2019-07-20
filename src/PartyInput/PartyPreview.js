import React, {Component} from 'react';
import PlayersList from './PlayersList';
class PartyPreview extends Component {
    
    render(){

        return (
            <div className="partyPreview">
                <h1>PARTY PREVIEW</h1>
                <PlayersList
                    state={this.props.state}
                    onRemovePlayer={this.props.onRemovePlayer}
                />
                
            </div>
        )
    }
}

export default PartyPreview;