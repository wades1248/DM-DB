import React, {Component} from 'react';
import CreatureCard from './CreatureCard'

class EncounterPreview extends Component {
    render() {
        const EncounterXpArray = checkCreauturesXP(this.props.state.creatures)
        function checkCreauturesXP(creatures){
            if(creatures[0] !== 'error'){
                return creatures.map(creature => creature.xp)
            }else{
                return []
            }
        }
        function makeEncounterXP(EncounterXpArray) {
            if(EncounterXpArray.length !==0){
                const value = EncounterXpArray.reduce(function(total, value){return total+value})
                return <h2>Experience Earned: {value}</h2>
            }else{
                return null
            } 
        }
        const EncounterXP = makeEncounterXP(EncounterXpArray)
        const creatureList = this.props.state.creatures.map((x, i) =>
            <CreatureCard
                creature={x}
                key={i+1} />
        );
        function makePreview(creatures,EncounterXP, creatureList){
            if(creatures[0] !== 'error'){
                return(
                    <div>
                        <h1>Encounter Preview</h1>
                        {EncounterXP}
                        <h2>Creatures:</h2>
                        {creatureList}
                    </div>
                )
            }else{
                return(
                    <div>
                        <h2>Sorry, An encounter that satisfies the parameters above cannot be generated at this time</h2>
                    </div>
                )
            }
        }
        return(
            makePreview(this.props.state.creatures, EncounterXP, creatureList)
        )
    }
}
export default EncounterPreview;