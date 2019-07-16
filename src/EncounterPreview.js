import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EncounterPreview extends Component {
    render() {
        return(
            <div>
                <h1>Encounter Preview</h1>
                <h2>Converted Experience(Difficulty):  2000</h2>
                <h2>Experience Earned: 1000</h2>
                <h2>Creatures:</h2>
                <p>Here will be a list of the creatures returned from the generator, complete with their page number in the Monster Manual</p>
                <Link to='/'><button>Back</button></Link>
                <Link to='/tracker'><button>NEXT</button></Link>
            </div>
        )
    }
}
export default EncounterPreview;