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
                    <p>CR: {item.cr} XP: {item.xp}</p>      
                )
            }else{
                return <p>Level: {item.level}</p>
            }
        }
        return(
            <li>
                <div className="heading">
                    <div className="initTitle">
                        <h2>{this.props.item.name}</h2>
                        {showCRandXP(this.props.item)}
                        <textarea placeholder="Notes"></textarea>
                    </div>
                    <div className="initiativeDisplay">
                        <label className="radioWrapper">
                            Current Player<br/>
                            <input type='radio' name="current"/> 
                        </label>
                        <p>Initiative:</p>
                        <h3>{this.props.item.initiative}</h3>
                    </div>
                </div>
                <div className="details">
                    <p>AC: {this.props.item.ac}</p>
                    <label>HP:
                        <input className="hp" type='integer' onSubmit={this.preventSubmit}/>
                    </label>
                    {showPerception(this.props.item)}
                </div>
                {showSource(this.props.item)}
            </li>
        )
    }
}
export default InitiativeDisplayCard;