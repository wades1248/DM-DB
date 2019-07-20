import React, {Component} from 'react';
import InitiativeDisplayCard from './InitiativeDisplayCard';

class InitiativeList extends Component {
    render() {
        const InitiativeList = this.props.state.initiative.map((item, i) =>
                <InitiativeDisplayCard
                item={item}
                key={i+1}
                />
            )

        return (
            <div className="list">
                {InitiativeList}
            </div>
        )
    }
}

export default InitiativeList;