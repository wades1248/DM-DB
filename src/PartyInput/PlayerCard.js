import React, {Component} from 'react';
import config from '../config'

class PlayerCard extends Component {
    onRemovePlayer = e => {
        e.preventDefault();
        const playerID = this.props.player.id;
        this.props.onRemovePlayer(playerID)
    }
    onDeletePlayer = e => {
        e.preventDefault();
        const playerID = this.props.player.id
        fetch(`${config.API_ENDPOINT}/players/${playerID}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            //return res.json()
        })
        .then(
         this.props.onRemovePlayer(playerID)
        )
        .catch(error => {
            console.error(error)
        })
    }
    render(){
        return(
            <li>
               <h3 className="PlayerName">{this.props.player.name}</h3>
                <p>Level:{this.props.player.level}</p>
                <p>AC:{this.props.player.ac}</p>
                <p>Passive Perception:{this.props.player.pp}</p>
                <button onClick={this.onRemovePlayer}>Remove From List</button> 
                <button onClick={this.onDeletePlayer}>Delete From Database</button>
            </li>           
        )
    }
}
export default PlayerCard;