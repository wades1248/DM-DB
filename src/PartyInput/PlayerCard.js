import React, {Component} from 'react';

class PlayerCard extends Component {
    onRemovePlayer = e => {
        e.preventDefault();
        const playerID = this.props.player.id;
        this.props.onRemovePlayer(playerID)
    }
    render(){
        return(
            <li>
               <h3 className="PlayerName">{this.props.player.name}</h3>
                <p>Level:{this.props.player.level}</p>
                <p>AC:{this.props.player.AC}</p>
                <p>Passive Perception:{this.props.player.PP}</p>
                <button onClick={this.onRemovePlayer}>Remove</button> 
            </li>           
        )
    }
}
export default PlayerCard;