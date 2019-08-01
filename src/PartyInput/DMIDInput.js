import React, {Component} from 'react';

class DMIDInput extends Component {
    state= {
        error: null
    }
    handleSubmit = e => {
        e.preventDefault()
        const DMID = e.target.dmid.value;
       
        this.props.GetByDMID(DMID)
        
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <legend>Use Existing Party</legend>
                <label>DM ID
                    <input name="dmid" type="text"/> 
                </label>        
                <button type="submit">Get Party</button>
            </form>
        )
    }
}
export default DMIDInput;