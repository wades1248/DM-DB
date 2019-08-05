import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Instructions extends Component{
    render(){
        return(
            <div>
                <div className='mainInstrctions'>
                    <p>To use this application effectively, be sure to have a copy of the Monster manual and Player Handbook nearby.</p>
                    <p>If you are new to Dungeons and Dragons, or have never played before, there are some things you should know before you continue.
                    To begin with, an encounter is any time the players encounter something in-game. This app is creates randomized combat encounters
                    that are appropriate for the number of players entered with respect for each individual character's level. There is also an 
                    initiative-tracker built in to this app. If you are unfamiliar, initiative is how the Dungeon Master keeps track of turn order
                    durring an encounter. For the purposes of this app, AC will refer to armor class. Passive perception and AC inputs will not 
                    effect the way encounters are generated, and are simply present to help the Dungeon Master keep track of these statistics 
                    while using the Initiative Tracker. Please use the link to the Basic Rules below if you are unsure of what any of the 
                    above-mentioned means.
                    </p>
                    <a href='https://media.wizards.com/2018/dnd/downloads/DnD_BasicRules_2018.pdf' target='blank'>Basic Rules</a> 
                </div>
                <button onClick={this.props.history.goBack}>Back</button>
            </div>
        )
    }
}
export default withRouter(Instructions)