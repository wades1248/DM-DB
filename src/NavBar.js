import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

class NavBar extends Component {
    render(){
        return(
            <div className='NavBar'>
                <Link to='/'>DMDB</Link>
                <Link to='/instructions'>Detailed Instructions</Link>
            </div>
        )
    }
}

export default withRouter(NavBar)