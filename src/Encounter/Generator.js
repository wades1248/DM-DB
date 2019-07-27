//import makeCreatures from './Creatures';
import playerThreshold from './PlayerThreshold';
import CRXP from './CRXP';

function Generator(params) {
    //const Creatures = makeCreatures();
    const {difficulty, environment, creatureNum, players, allCreatures } = params
    const rawCreatures = allCreatures;
    const envCreatures =environmentalFilter(environment, rawCreatures);
    const randomEnvCreatures = shuffleArray(envCreatures);
    const encounterXParray = difficultyFilter(difficulty, creatureNum, players, envCreatures, CRXP);
    const encounter = makeEncounterArray(encounterXParray, randomEnvCreatures)
    return encounter;
}
function environmentalFilter(environment, creatures) {
    if(environment !== 'any'){
        let filterCreatures = creatures.filter(creature => 
           creature[environment] === true
       )
       return(filterCreatures);
   }
   else{
       let filterCreatures = creatures;
       return(filterCreatures);
   }

}
function difficultyFilter(difficulty, creatureNum, players, envCreatures, CRXP){
    const upperLimit =generateUpperDifficulty(difficulty, players)
    const lowerLimit =generateLowerDifficulty(difficulty, players)
    const creatureNumCoefficient = convertCreautureNum(creatureNum);
    const xpArray = procedurallyGenerate (lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures)
   
    return xpArray

    
}
function generateLowerDifficulty(difficulty, players){

        const lowerLimitArray = players.map(player => (
            playerThreshold[player.level][difficulty]
        ));
        
        const lowerLimit = lowerLimitArray.reduce(function(total, value){return total+value});
        return(lowerLimit);

}
function generateUpperDifficulty(difficulty, players){
    const convertedDifficulty = convertToUpperLimit(difficulty)
        const upperLimitArray= players.map(player => (
            playerThreshold[player.level][convertedDifficulty]
        ));
        const upperLimit = upperLimitArray.reduce(function(total, value){return total+value},0);
    if(difficulty === 'deadly') {
        return (2*upperLimit)
    }else{
        return(upperLimit)
    }
}
function convertToUpperLimit(difficulty) {
    if(difficulty === 'easy'){
        return('medium')
    }
    if(difficulty ==='medium'){
        return('hard')
    }else if(difficulty === 'hard'){
        return('deadly')
    }else if(difficulty === 'deadly'){
        return('deadly')
    }
}
function convertCreautureNum(creatureNum) {
    if(creatureNum < 2){
        return(1)
    }else if(creatureNum < 3){
        return(1.5)
    }else if(creatureNum <7){
        return(2)
    }else if(creatureNum <11){
        return(2.5)
    }else if(creatureNum < 15){
        return(3)
    }else{
        return(4)
    }
}
function procedurallyGenerate (lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    const countsperCRunfiltered = counterPerCr(upperLimit, creatureNumCoefficient, creatureNum, CRXP)
    const finalCRarray = tryAllpossibilities(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, countsperCRunfiltered)
    return finalCRarray
}
function counterPerCr(upperLimit, creatureNumCoefficient, creatureNum,){
    let countsperCRunfiltered = []
    for(let j =1; j <=creatureNum; j++){    
        for(let i = 0; i < CRXP.length; i++){
            if((CRXP[i]*creatureNumCoefficient*j) <= upperLimit){
                countsperCRunfiltered.push( CRXP[i])
            }
        }       
    };
    return countsperCRunfiltered;
}
function countsPerCRfilter(array){
    const uniqueSet = new Set(array)
    const uniqueArray= [...uniqueSet]
    let counts = {};
    for(let i =0; i < uniqueArray.length; i++){
            const countItem= uniqueArray[i];
            const countValue = array.filter(item => item === countItem).length
            counts[countItem] =countValue;
        
    };
    return counts;

}
function tryAllpossibilities(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, countsperCRunfiltered){
    const countsPerCRfiltered = countsPerCRfilter(countsperCRunfiltered)
    const CRsArray= Object.keys(countsPerCRfiltered)
    let encounterCRs=[]
  
    for(let bossPosition = 0; bossPosition < (CRsArray.length-1); bossPosition++){
    for(let bossNum = 0; creatureNum >= bossNum; bossNum++){
            
            const boss= CRsArray[(bossPosition)]
            const minionNum= (creatureNum-bossNum);
            const minionUpperLimit= (upperLimit- (parseInt(boss)*bossNum*creatureNumCoefficient))
            const minionLowerLimit= (lowerLimit- (parseInt(boss)*bossNum*creatureNumCoefficient))
            const countsperCRunfiltered = counterPerCr(minionUpperLimit, creatureNumCoefficient, minionNum)
            const countsPerCRfiltered = countsPerCRfilter(countsperCRunfiltered)
            const minionsArray= Object.keys(countsPerCRfiltered)
            for(let x= minionsArray.length-1; x>= 0; x--){
                const CRvalue= minionsArray[x]
                const calculcatedXP =(CRvalue*(countsPerCRfiltered[CRvalue])*creatureNumCoefficient)
                if(calculcatedXP >minionLowerLimit && encounterCRs.length === 0){
                    for(let z = 0; z< countsPerCRfiltered[CRvalue]; z++){
                        encounterCRs.push(parseInt(CRvalue))

                    }
                    for(let h = 1; h <= bossNum; h++ ){
                        encounterCRs.push(parseInt(boss))
                    } 
                }
            if(encounterCRs.length < creatureNum ){
                    encounterCRs = []
            }else{break;}
            } 

        }
  
    }
    return encounterCRs
}
function shuffleArray (array){
    for(let i = array.length -1; i > 0; i--){
        let j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
function makeEncounterArray(encounterXParray, randomEnvCreatures){
    const encounter = encounterXParray.map(x=> randomEnvCreatures.find(creature => creature.xp===x))
    return encounter;
}
export default Generator;