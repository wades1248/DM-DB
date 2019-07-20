import React, {Component} from 'react';

class CreatureCard extends Component{
    render(){
        return (
            <li className='CreatureCard'>
                <h3 className='CreatureName'>{this.props.creature.name}</h3>
                <p>CR: {this.props.creature.CR}</p>
                <p>Experience: {this.props.creature.XP}</p>
                <p>AC: {this.props.creature.AC}</p>
                <p>{this.props.creature.source}</p>
            </li>
        )
    }
}

export default CreatureCard;