import makeCreatures from './Creatures';
import playerThreshold from './PlayerThreshold';
import CRXP from './CRXP';

function Generator(params) {
    const Creatures = makeCreatures();
    const {difficulty, environment, creatureNum, players } = params
    const rawCreatures = Creatures;
    const envCreatures =environmentalFilter(environment, rawCreatures);
    const encounterCreatures = difficultyFilter(difficulty, creatureNum, players, envCreatures, CRXP);
    console.log(encounterCreatures);
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
function difficultyFilter(difficulty, creatureNum, players, envCreatures, CRXP){
    const upperLimit =generateUpperDifficulty(difficulty, players)
    const lowerLimit =generateLowerDifficulty(difficulty, players)
    const creatureNumCoefficient = convertCreautureNum(creatureNum);
    const multiply = (a,b,c)=> {return(a*b*c)};
    const evenSplitCreatures = envCreatures.filter(creature => multiply(creature.XP,creatureNum, creatureNumCoefficient) > lowerLimit && multiply(creature.XP, creatureNum, creatureNumCoefficient) < upperLimit)        
    /*const oneBigWithXLittle = oneBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const twoBigWithXLittle = twoBigXLittle(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const oneThirdWithFiller = oneThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const twoThirdWithFiller = twoThridFiller(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures);
    const AllEncounters = evenSplitCreatures.concat(oneBigWithXLittle, twoBigWithXLittle, oneThirdWithFiller, twoThirdWithFiller)*/
    const q = procedurallyGenerate (lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures,)
   
    return q

    
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
/*
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
    
}*/
function procedurallyGenerate (lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures){
    console.log(upperLimit)
    const countsperCRunfiltered = counterPerCr(upperLimit, creatureNumCoefficient, creatureNum, CRXP)
    const countsPerCRfiltered = countsPerCRfilter(countsperCRunfiltered)
    const finalCRarray = generateEncouterCRarray(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, countsPerCRfiltered)
    console.log(countsPerCRfiltered)
    return finalCRarray
}
function counterPerCr(upperLimit, creatureNumCoefficient, creatureNum, CRXP){
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
function generateEncouterCRarray(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, envCreatures, CRXP, countsPerCRfiltered){
    let encounterCRs=[]
    const CRsArray= Object.keys(countsPerCRfiltered)
    for(let x= CRsArray.length-1; x>= 0; x--){
        const CRvalue= CRsArray[x]
        const calculcatedXP =(CRvalue*(countsPerCRfiltered[CRvalue])*creatureNumCoefficient)
        if(calculcatedXP >lowerLimit && encounterCRs.length === 0){
            for(let z = 0; z< countsPerCRfiltered[CRvalue]; z++){
                encounterCRs.push(parseInt(CRvalue))
            }
        };
        if(encounterCRs.length < creatureNum ){
            encounterCRs = []
        }
        if(x===0 && encounterCRs.length === 0){
            const bossCRs = makeBossEncounter(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, CRXP, CRsArray);
            encounterCRs= bossCRs
        }
    }
    return(encounterCRs)
}
function makeBossEncounter(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, CRXP, CRsArray){
    console.log(upperLimit)
    const boss= CRsArray[(CRsArray.length-1)] 
    const minionNum= creatureNum-1;
    const minionUpperLimit= upperLimit- parseInt(boss)
    const minionLowerLimit= lowerLimit- parseInt(boss)
    const countsperCRunfiltered = counterPerCr(CRXP, minionUpperLimit, creatureNumCoefficient, minionNum)
    const countsPerCRfiltered = countsPerCRfilter(countsperCRunfiltered)
    let encounterCRs=[]
    const minionsArray= Object.keys(countsPerCRfiltered)
    for(let x= minionsArray.length-1; x>= 0; x--){
        const CRvalue= minionsArray[x]
        const calculcatedXP =(CRvalue*(countsPerCRfiltered[CRvalue])*creatureNumCoefficient)
        if(calculcatedXP >minionLowerLimit && encounterCRs.length === 0){
            for(let z = 0; z< countsPerCRfiltered[CRvalue]; z++){
                encounterCRs.push(parseInt(CRvalue))
            }
            encounterCRs.push(parseInt(boss))
        }
        if(encounterCRs.length < creatureNum ){
            encounterCRs = []
        }
        if(x===0 && encounterCRs.length === 0){
            const bossCRs = make2BossEncounter(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum, CRXP);
            encounterCRs= bossCRs
        }
    }
    return encounterCRs    
}
function make2BossEncounter(lowerLimit, upperLimit, creatureNumCoefficient, creatureNum,CRXP, CRsArray){
    console.log('ruuuuun')
    const boss1= CRsArray[CRsArray.length-1]
    const boss2= CRsArray[CRsArray.length-1] 
    const minionNum= creatureNum-2;
    const minionUpperLimit= upperLimit- (parseInt(boss1)+parseInt(boss2))
    const minionLowerLimit= lowerLimit- (parseInt(boss1)+parseInt(boss2))
    const countsperCRunfiltered = counterPerCr(CRXP, minionUpperLimit, creatureNumCoefficient, minionNum)
    const countsPerCRfiltered = countsPerCRfilter(countsperCRunfiltered)
    let encounterCRs=[]
    const minionsArray= Object.keys(countsPerCRfiltered)
    for(let x= minionsArray.length-1; x>= 0; x--){
        const CRvalue= minionsArray[x]
        const calculcatedXP =(CRvalue*(countsPerCRfiltered[CRvalue])*creatureNumCoefficient)
        if(calculcatedXP >minionLowerLimit && encounterCRs.length === 0){
            for(let z = 0; z< countsPerCRfiltered[CRvalue]; z++){
                encounterCRs.push(parseInt(CRvalue))
            }
            encounterCRs.push(parseInt(boss1, boss2))
        };
        if(encounterCRs.length < creatureNum ){
            encounterCRs = []
        }
        if(x===0 && encounterCRs.length === 0){
            //const bossCRs = make2BossEncounter(CRsArray, upperLimit, lowerLimit, creatureNum, creatureNumCoefficient, CRXP,);
            //encounterCRs= bossCRs
        }
    }
    return encounterCRs    
}
export default Generator;