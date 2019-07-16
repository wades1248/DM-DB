import makeCreatures from './Creatures';
import playerThreshold from './PlayerThreshold';

function Generator(params) {
    const Creatures = makeCreatures();
    const {difficulty, environment, creatureNum, players } = params
    const rawCreatures = Creatures;
    const envCreatures =environmentalFilter(environment, rawCreatures);
    const encounterCreatures = difficultyFilter(difficulty, creatureNum, players, envCreatures);
    console.log(encounterCreatures);
    console.log(creatureNum);
    
}
function environmentalFilter(environment, creatures) {
    if(environment !== 'any'){
        let filterCreatures = creatures.filter(creature => 
           creature[environment] === true
       )
       console.log(filterCreatures);
       return(filterCreatures);
   }
   else{
       let filterCreatures = creatures;
       return(filterCreatures);
   }

}
function difficultyFilter(difficulty, creatureNum, players, envCreatures){
    const upperLimit =generateUpperDifficulty(difficulty, players)
    const lowerLimit =generateLowerDifficulty(difficulty, players)
    const creatureNumCoefficient = convertCreautureNum(creatureNum);
    const multiply = (a,b,c)=> {return(a*b*c)};
    const evenSplitCreatures = envCreatures.filter(creature => multiply(creature.XP,creatureNum, creatureNumCoefficient) > lowerLimit && multiply(creature.XP, creatureNum, creatureNumCoefficient) < upperLimit)        
    const oneBigWithXLittle = oneBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const twoBigWithXLittle = twoBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const oneThirdWithFiller = oneThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const twoThirdWithFiller = twoThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const AllEncounters = evenSplitCreatures.concat(oneBigWithXLittle, twoBigWithXLittle, oneThirdWithFiller, twoThirdWithFiller)
    return (AllEncounters);
}
function generateLowerDifficulty(difficulty, players){
    if(difficulty === 'easy'){
        return 0;
    }else{
        const lowerLimitArray = players.map(player => (
            playerThreshold[player.level][difficulty]
        ));
        
        const lowerLimit = lowerLimitArray.reduce(function(total, value){return total+value});
        return(lowerLimit);
    }
}
function generateUpperDifficulty(difficulty, players){
    if(difficulty === 'deadly') {
        return (1000000)
    }else{
        const convertedDifficulty = convertToUpperLimit(difficulty)
        const upperLimitArray= players.map(player => (
            playerThreshold[player.level][convertedDifficulty]
        ));
        const lowerLimit = upperLimitArray.reduce(function(total, value){return total+value});
        return(lowerLimit)
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
        return('hard')
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
function oneBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    const half = (a) => {return(a/2)};
    const multiply = (a,b,c)=> {return(a*b*c)};
    const littleCreatureNum = creatureNum-1;
    const bigCreatures = envCreatures.filter(creature => multiply(creature.XP,1, creatureNumCoefficient) > half(lowerLimit) && multiply(creature.XP, 1, creatureNumCoefficient) < half(upperLimit));
    const littleCreatures = envCreatures.filter(creature => multiply(creature.XP,littleCreatureNum, creatureNumCoefficient) > half(lowerLimit) && multiply(creature.XP, littleCreatureNum, creatureNumCoefficient) < half(upperLimit))
    
    function bigCreaturesAddQuantity (bigCreatures, ) {
        if(bigCreatures.length > 0) {
            bigCreatures.map(creature => {creature.Bquantity=1; return creature;
        }) 
            return bigCreatures;
        }else{return null;}};
    
    function littleCreaturesAddQuantity (littleCreatures, littleCreatureNum ) {
        if(littleCreatures.length > 0) {
            littleCreatures.map(creature => {creature.Lquantity=littleCreatureNum; return littleCreatures;
        })
            return littleCreatures;
        }else{return null;}};

    const oneBigCreatureWithQuantity = bigCreaturesAddQuantity(bigCreatures);
    const littleCreaturesWithQuantity = littleCreaturesAddQuantity(littleCreatures, littleCreatureNum);
    const bigXLittle = {oneBigCreatureWithQuantity,littleCreaturesWithQuantity};
    if(oneBigCreatureWithQuantity !== null && littleCreaturesWithQuantity !== null){
        return (bigXLittle);
    }else{
        return [];
        };
    
}
function twoBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    const half = (a) => {return(a/2)};
    const multiply = (a,b,c)=> {return(a*b*c)};
    const littleCreatureNum = creatureNum-2;
    const bigCreatures = envCreatures.filter(creature => multiply(creature.XP,2, creatureNumCoefficient) > half(lowerLimit) && multiply(creature.XP, 2, creatureNumCoefficient) < half(upperLimit));
    const littleCreatures = envCreatures.filter(creature => multiply(creature.XP,littleCreatureNum, creatureNumCoefficient) > half(lowerLimit) && multiply(creature.XP, littleCreatureNum, creatureNumCoefficient) < half(upperLimit))
    
    function bigCreaturesAddQuantity (bigCreatures, ) {
        if(bigCreatures.length > 0) {
            bigCreatures.map(creature => {creature.BBquantity=2; return creature;
        }) 
            return bigCreatures;
        }else{return null;}};
    
    function littleCreaturesAddQuantity (littleCreatures, littleCreatureNum ) {
        if(littleCreatures.length > 0) {
            littleCreatures.map(creature => {creature.LLquantity=littleCreatureNum; return littleCreatures;
        })
            return littleCreatures;
        }else{return null;}};

    const twoBigCreaturesWithQuantity = bigCreaturesAddQuantity(bigCreatures);
    const littleCreaturesWithQuantity = littleCreaturesAddQuantity(littleCreatures, littleCreatureNum);
    const bigXLittle = {twoBigCreaturesWithQuantity,littleCreaturesWithQuantity};
    if(twoBigCreaturesWithQuantity !== null && littleCreaturesWithQuantity !== null){
        return (bigXLittle);
    }else{
        return [];
        };
    
}
function oneThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    const third = (a) => {return(a/3)};
    const twoThirds = (a) => {return(2*a/3)};
    const multiply = (a,b,c)=> {return(a*b*c)};
    const littleCreatureNum = creatureNum-1;
    const bigCreatures = envCreatures.filter(creature => multiply(creature.XP,1, creatureNumCoefficient) > third(lowerLimit) && multiply(creature.XP, 1, creatureNumCoefficient) < third(upperLimit));
    const littleCreatures = envCreatures.filter(creature => multiply(creature.XP,littleCreatureNum, creatureNumCoefficient) > twoThirds(lowerLimit) && multiply(creature.XP, littleCreatureNum, creatureNumCoefficient) < twoThirds(upperLimit))
    
    function bigCreaturesAddQuantity (bigCreatures, ) {
        if(bigCreatures.length > 0) {
            bigCreatures.map(creature => {creature.BBBquantity=1; return creature;
        }) 
            return bigCreatures;
        }else{return null;}};
    
    function littleCreaturesAddQuantity (littleCreatures, littleCreatureNum ) {
        if(littleCreatures.length > 0) {
            littleCreatures.map(creature => {creature.LLLquantity=littleCreatureNum; return littleCreatures;
        })
            return littleCreatures;
        }else{return null;}};

    const thirdBigCreaturesWithQuantity = bigCreaturesAddQuantity(bigCreatures);
    const littleCreaturesWithQuantity = littleCreaturesAddQuantity(littleCreatures, littleCreatureNum);
    const bigXLittle = {thirdBigCreaturesWithQuantity,littleCreaturesWithQuantity};
    if(thirdBigCreaturesWithQuantity !== null && littleCreaturesWithQuantity !== null){
        return (bigXLittle);
    }else{
        return [];
        };
    
}
function twoThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    const third = (a) => {return(a/3)};
    const twoThirds = (a) => {return(2*a/3)};
    const multiply = (a,b,c)=> {return(a*b*c)};
    const littleCreatureNum = creatureNum-2;
    const bigCreatures = envCreatures.filter(creature => multiply(creature.XP,2, creatureNumCoefficient) > twoThirds(lowerLimit) && multiply(creature.XP, 2, creatureNumCoefficient) < twoThirds(upperLimit));
    const littleCreatures = envCreatures.filter(creature => multiply(creature.XP,littleCreatureNum, creatureNumCoefficient) > third(lowerLimit) && multiply(creature.XP, littleCreatureNum, creatureNumCoefficient) < third(upperLimit))
    
    function bigCreaturesAddQuantity (bigCreatures, ) {
        if(bigCreatures.length > 0) {
            bigCreatures.map(creature => {creature.BBBBquantity=1; return creature;
        }) 
            return bigCreatures;
        }else{return null;}};
    
    function littleCreaturesAddQuantity (littleCreatures, littleCreatureNum ) {
        if(littleCreatures.length > 0) {
            littleCreatures.map(creature => {creature.LLLLquantity=littleCreatureNum; return littleCreatures;
        })
            return littleCreatures;
        }else{return null;}};

    const twoThirdBigCreaturesWithQuantity = bigCreaturesAddQuantity(bigCreatures);
    const littleCreaturesWithQuantity = littleCreaturesAddQuantity(littleCreatures, littleCreatureNum);
    const bigXLittle = {twoThirdBigCreaturesWithQuantity,littleCreaturesWithQuantity};
    if(twoThirdBigCreaturesWithQuantity !== null && littleCreaturesWithQuantity !== null){
        return (bigXLittle);
    }else{
        return [];
        };
    
}
export default Generator;