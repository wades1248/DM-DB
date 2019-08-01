import React, {Component} from 'react';
import config from '../config';

class PartyInput extends Component {
    state= {
        error: null
    };

    validatePlayer = event => {
        event.preventDefault()
        this.setState({
            error: null
        })
        const {playerName, playerLevel, ac, pp, dmid } = event.target
        const player = {
            name: playerName.value,
            level: playerLevel.value, 
            ac: ac.value,
            pp: pp.value,
            dmid: dmid.value
        }
        const testName= player.name.trim();
        const testDmId= player.dmid.trim();
        if(testName.length === 0) {
             const nameError = 'Please Enter a Valid Character Name.';
            this.setState({
                error: nameError
            });
        }else if(testDmId.length === 0){
            const dmIdError = 'Please Enter a Valid DM ID.'
            this.setState({
                error: dmIdError
            });
        }else{
            fetch(`${config.API_ENDPOINT}/players`, {
                method: 'POST',
                body: JSON.stringify(player),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${config.API_KEY}`
                }
            })
                .then(res => {
                    if(!res.ok) {
                        return res.json().then(error => {
                            throw error
                        })
                    }
                    return res.json()
                })
                .then(res => 
                    this.handleSubmit(res)
                    )
            
        }        
    }

    handleSubmit = (player) =>{
        this.props.onAddPlayer(player)
    };

    render() {
        return(
        <form className= 'newPartyForm' onSubmit={this.validatePlayer}>
          <legend>Player Info:</legend>
          <label>Character Name
            <input name='playerName' type="text" placeholder= 'Pidwick Stumbleduck' required />
          </label>
          <div className='error'>{this.state.error}</div>
          <label>Level
            <select name='playerLevel' required defaultValue='1'>
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
            </select>
          </label>                    
          <br/>
          <label>AC
          <select name='ac' required defaultValue='12'>
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
              <option value='26'>26</option>
              <option value='27'>27</option>
              <option value='28'>28</option>
              <option value='29'>29</option>
              <option value='30'>30</option>
            </select>
          </label>
            <br/>          
          <label> Passive Perception
          <select name='pp' required defaultValue='12'>
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
              <option value='26'>26</option>
              <option value='27'>27</option>
              <option value='28'>28</option>
              <option value='29'>29</option>
              <option value='30'>30</option>
            </select>
          </label>
            <br/>
            <label>DM ID
            <input type='text' name='dmid' placeholder='Spencer1234' required/>
          </label>
            <br/>          
          <button type="submit" name='addPlayer'>
            Add Player
          </button>
        </form>
        )
    }
}

export default PartyInput;