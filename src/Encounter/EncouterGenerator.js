import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import EncounterPreview from './EncounterPreview';
import Generator from './Generator'

class EncounterGenerator extends Component {
    
    handleSubmit= event => {
        event.preventDefault();
        const {difficulty, environment, creatureNum } = event.target;
        const players=this.props.state.players
        const allCreatures = this.props.state.allCreatures
        const params = {
            difficulty: difficulty.value, 
            environment: environment.value,
            creatureNum: creatureNum.value, 
            players: players,
            allCreatures: allCreatures
        }
        
        const encounter= Generator(params);
        this.props.handleEncounter(encounter);
    }
    componentDidMount(){
      this.props.clearInitiative();
      this.props.clearEncounter();
    }

    render() {
        const creatures= this.props.state.creatures
        function renderPreview(creatures, state){
            if(creatures.length !==0){
                return <EncounterPreview
                    state={state}
                />
            }else{
                return null
            }
            
        }
        const Preview = renderPreview(creatures, this.props.state)
        return(
            <div>
                <div className='header'>
      <h1>Encounter Generator</h1>
      <p className="instructions">Using the information provided for your party we will generate a random encounter given the parameters set below
      or if you'd like you may skip straight to the Initiative Tracker by clicking "Next".</p>
    </div>
    <form className="encounterParams" onSubmit={this.handleSubmit}>
      <legend className='formHead'>Options</legend>
      <label>Difficulty
        <select name='difficulty' defaultValue='moderate'>
          <option value='easy'>Easy</option>
          <option value='medium'>Moderate</option>
          <option value='hard'>Hard</option>
          <option value='deadly'>Deadly</option>
        </select>  
        </label>    
      <label>Environment
        <select name='environment' defaultValue='any'>
          <option value='any'>Any</option>
          <option value='artic'>Arctic</option>
          <option value='coastal'>Coastal</option>
          <option value='desert'>Desert</option>
          <option value='forest'>Forest</option>
          <option value='grasslands'>Grassland</option>
          <option value='hill'>Hill</option>
          <option value='mountain'>Mountain</option>
          <option value='swamp'>Swamp</option>
          <option value='underdark'>Underdark</option>
          <option value='underwater'>Under Water</option>
          <option value='urban'>Urban</option>
        </select>
      </label>
      <br/>
      <label>Number of Creatures
        <select name='creatureNum' defaultValue='1'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
            <option value='16'>16</option>
            <option value='17'>17</option>
            <option value='18'>18</option>
            <option value='19'>19</option>
            <option value='20'>20</option>
            <option value='21'>21</option>
            <option value='22'>22</option>
            <option value='23'>23</option>
            <option value='24'>24</option>
            <option value='25'>25</option>
        </select>
      </label>
      <br/>
      <button type="submit">Generate Encounter</button>
    </form>
    {Preview}
    <Link to='/'><button className="nav">Back</button></Link>
    <Link to='/tracker'><button className="nav">Next</button></Link>
    </div>
    )
    }
}

export default withRouter(EncounterGenerator);