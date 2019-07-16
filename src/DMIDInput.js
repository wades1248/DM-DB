import React, {Component} from 'react';

class DMIDInput extends Component {
    render() {
        return(
            <form>
                <legend>Use Existing Party</legend>
                <label>DM ID</label>
                <input type="number"/>         
                <button type="submit">Get Party</button>
            </form>
        )
    }
}
export default DMIDInput;