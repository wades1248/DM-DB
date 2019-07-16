import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import EncounterPreview from './EncounterPreview';
import Generator from './Generator'

class EncounterGenerator extends Component {
    
    handleSubmit= event => {
        event.preventDefault();
        const {difficulty, environment, creatureNum } = event.target;
        const players=this.props.state.players
        const params = {
            difficulty: difficulty.value, 
            environment: environment.value,
            creatureNum: creatureNum.value, 
            players: players
        }
        
        Generator(params);
    }

    render() {
        return(
            <div>
                <div className='header'>
      <h1>Encounter Generator</h1>
      <p>Using the information provided for your party we will generate a random encounter given the parameters set below</p>
    </div>
    <form className="encounterParams" onSubmit={this.handleSubmit}>
      <legend className='formHead'>Options</legend>
      <label>Difficulty</label>
        <select name='difficulty' defaultValue='moderate'>
          <option value='easy'>Easy</option>
          <option value='medium'>Moderate</option>
          <option value='hard'>Hard</option>
          <option value='deadly'>Deadly</option>
          {/*<option value='impossible'>Impossible</option>*/}
        </select>      
      <label>Environment</label>
        <select name='environment' defaultValue='any'>
          <option value='any'>Any</option>
          <option value='artic'>Artic</option>
          <option value='coastal'>Coastal</option>
          <option value='desert'>Desert</option>
          <option value='forest'>Forest</option>
          <option value='grasslands'>Grassland</option>
          <option value='hill'>Hill</option>
          <option value='mountain'>Mountain</option>
          <option value='swamp'>Swamp</option>
          <option value='underdark'>Underdark</option>
          <option value='underWater'>Under Water</option>
          <option value='urban'>Urban</option>
        </select>
      <br/>
      <label>Number of Creatures</label>
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
      <br/>
      <button type="submit">Generate Encounter</button>
    </form>
    <EncounterPreview
        state={this.props.state}
    />
    </div>
    )
    }
}

export default withRouter(EncounterGenerator);