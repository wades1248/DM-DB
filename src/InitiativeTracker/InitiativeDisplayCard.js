import React, {Component} from 'react';

class InitiativeDisplayCard extends Component {
    render(){
        function showPerception(item){
            if(item.PP){
                return(
                    <p>Passive Perception: {item.PP}</p>
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
        return(
            <li>
                <p>Initiative: {this.props.item.initiative}</p>
                <h3>{this.props.item.name}</h3>
                <p>AC: {this.props.item.AC}</p>
                {showPerception(this.props.item)}
                {showSource(this.props.item)}
            </li>
        )
    }
}
export default InitiativeDisplayCard;