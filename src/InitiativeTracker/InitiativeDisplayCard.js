import React, {Component} from 'react';

class InitiativeDisplayCard extends Component {
    preventSubmit= event => event.preventDefault();
    
    render(){
        function showPerception(item){
            if(item.pp){
                return(
                    <p>Passive Perception: {item.pp}</p>
                )
            }else{
                return null
            }
        }
        function showSource(item){
            if(item.source){
                return(
                    <p>Source: {item.source}</p>
                )
            }else{
                return null
            }
        }
        function showCRandXP(item){
            if(item.cr){
                return(
                    <p>CR: {item.cr}  XP: {item.xp}</p>
                )
            }else{
                return null
            }
        }
        return(
            <li>
                <p>Initiative: {this.props.item.initiative}</p>
                <h3>{this.props.item.name}</h3>
                {showCRandXP(this.props.item)}
                <p>AC: {this.props.item.ac}</p>
                <label>HP</label>
                <input type='integer' onSubmit={this.preventSubmit}/>
                {showPerception(this.props.item)}
                {showSource(this.props.item)}
            </li>
        )
    }
}
export default InitiativeDisplayCard;