import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import PlayerCard from './PlayerCard';

class PlayersList extends Component{
    render(){
        function showLink(array){
            if(array.length !== 0){
                return(
                    <Link to='/gen'><button type="button">DONE</button></Link> 
                )
            }
            else{
                return(
                    <p>Please Enter At Least One Player</p>
                )
            }
        }
        const players =this.props.state.players.map((player, i) => 
            <PlayerCard
                player={player}
                key={i+1}
                onRemovePlayer={this.props.onRemovePlayer}
            />);
        return(
            <div>
                {players}
                {showLink(this.props.state.players)}
            </div>
        )       
    }
}
export default PlayersList;