import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PartyInput from './PartyInput';
import DMDBInput from './DMIDInput';
import PartyPreview from './PartyPreview';

class Welcome extends Component {
    render() {
        return(
            <div className='Welcome'>
                <div className= 'welcomeBanner'>
                    <h1>Welcome to DM DB</h1>
                    <h2>An encouter generator and initiative tracker for Dungeons and Dragons 5th Edition</h2>
                    <p>Please enter your players' information using the form below, or if you party is already in the DB, enter your DM ID below</p>
                </div>
                <PartyInput
                    onAddPlayer={this.props.onAddPlayer}
                    state={this.props.state}
                />
                {/*<DMDBInput/>*/}
                <PartyPreview
                    state={this.props.state}
                    onRemovePlayer={this.props.onRemovePlayer}
                />
            </div>
        )
    }
}

export default withRouter(Welcome);