import React, {Component} from 'react';
import config from '../config';

class UpdatePlayer extends Component {
    state= {
        error: null,
        player: {}
    };
    playerID= this.props.match.params
    postPlayer = event => {
        const playerID= this.props.match.params.playerID
        event.preventDefault()
        this.setState({
            error: null
        })
        const {playerLevel, ac, pp, } = event.target
        const player = {
            level: playerLevel.value, 
            ac: ac.value,
            pp: pp.value
        }

        fetch(`${config.API_ENDPOINT}/players/${playerID}`, {
            method: 'PATCH',
            body: JSON.stringify(player),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                console.log(res)
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
            
            })
            .then(res => 
                fetch(`${config.API_ENDPOINT}/players/${playerID}`, {
                method: 'GET',
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
                .then(res => {
                    console.log(res)
                    this.handleSubmit(res)
                })
                .then(this.props.history.push('/'))  )  
    }        


    handleSubmit = (player) =>{
        this.props.onUpdatePlayer(player)
    };
    onCancel= () => {
        this.props.history.push('/')
    }

    componentDidMount(){
        const playerID= this.props.match.params.playerID
        fetch(`${config.API_ENDPOINT}/players/${playerID}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(error => Promise.reject(error))
            return res.json()
        })
        .then(responseData => {
            this.setState({
                player: responseData
            })
        })
        .catch(error => {
            console.error(error)
            //this.setState({error:error})
        })

    }

    render() {

        return(
        <form className= 'editPlayerForm' onSubmit={this.postPlayer}>
          <legend>Edit Player:</legend>
          <label>Character Name</label>
          <h2>{this.state.player.name}</h2>
          <div className='error'>{this.state.error}</div>
          <label>Level</label>
            <select name='playerLevel' defaultValue={'1'}>
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
          <br/>
          <label>AC</label>
          <select name='ac' defaultValue='12'>
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
            <br/>          
          <label> Passive Perception</label>
          <select name='pp' defaultValue='12'>
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
            <br/>        
          <button type="submit" name='updatePlayer'>
            Update
          </button>
          <button onClick={this.onCancel}>Cancel</button>
        </form>
        )
    }
}

export default UpdatePlayer;