import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PartyInput from './PartyInput';
import DMDBInput from './DMIDInput';
import PartyPreview from './PartyPreview';

class Main extends Component {
    render() {
        return(
            <main className='App'>
                <div class= 'welcome'>
                    <h1>Welcome to DM DB</h1>
                    <h2>An encouter generator and initiative tracker for Dungeons and Dragons 5th Edition</h2>
                    <p>Please enter your players' information usingin the form below, or if you party is already in the DB, enter your DM ID below</p>
                </div>
                <PartyInput/>
                <DMDBInput/>
                <PartyPreview/>
            </main>
        )
    }
}

export default withRouter(Main);