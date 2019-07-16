import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import InitiativeList from './InitiativeList';

class InitiativeTracker extends Component {
    render() {
        return(
            <div>
                <h1>Initiative Tracker</h1>
                <p>Please enter the initiative of the party members below(creauture initiate has been rolled for you).</p>
                <form class="enterInitiatives">
                <div>
                    <h2>PLAYER</h2>
                    <p>SOME STATS</p>
                    <label>Initiative</label>
                    <input type="number"/>                   
                </div>
                <button type="submit">Order List</button>
                <button>Hide</button>
                </form>
                <InitiativeList/>
                <Link to='/gen'><button>Return to Generator</button></Link>
            </div>
        )
    }
}
export default withRouter(InitiativeTracker);