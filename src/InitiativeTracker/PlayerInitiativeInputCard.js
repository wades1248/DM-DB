import React, {Component} from 'react'


class PlayerInitiativeInput extends Component {
    onRemovePlayer = e => {
        e.preventDefault();
        const player = this.props.player;
        this.props.onRemovePlayerFromInputList(player)
    }
    onSubmit = e => {
        e.preventDefault();
        const  {initiative} = e.target
        const player = {
            id: this.props.player.id,
            name: this.props.player.name,
            level: this.props.player.level,
            ac: this.props.player.ac,
            pp: this.props.player.pp,
            initiative: parseInt(initiative.value)
        }
        this.props.handleInitiative(player);
        this.props.onRemovePlayerFromInputList(player);
    }
    render(){
        return(
            <form className="enterInitiatives" onSubmit={this.onSubmit}>
               <h3 className="PlayerName" name='playerName' value={this.props.player.name}>{this.props.player.name}</h3>
                <p name='level' value={this.props.player.level}>Level:{this.props.player.level}</p>
                <p name='AC' value={this.props.player.ac}>AC:{this.props.player.ac}</p>
                <p name='PP'value={this.props.player.pp}>Passive Perception:{this.props.player.pp}</p>
                <select name='initiative' required defaultValue='15'>
                    <option value='0'>Critical Fail</option>
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
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                    <option value='41'>41</option>
                    <option value='42'>42</option>
                    <option value='43'>43</option>
                    <option value='44'>44</option>
                    <option value='45'>45</option>
                    <option value='100'>Critical</option>
                </select>
                <button type='submit'>Add Player</button>
                <button type='button' onClick={this.onRemovePlayer}>Remove</button> 
            </form>
        )
    }
}

export default PlayerInitiativeInput;