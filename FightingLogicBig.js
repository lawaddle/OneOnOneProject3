function intialize(userFighter, compFighter){
    player = {name: userFighter.FighterName,
        strength: userFighter.FighterStrength,
        cunning: userFighter.FighterCunning,
        speed: userFighter.FighterSpeed,
        energy: userFighter.FighterEnergy,
        img: userFighter.FighterImg
    }
    computer = {name: compFighter.FighterName,
        strength: compFighter.FighterStrength,
        cunning: compFighter.FighterCunning,
        speed: compFighter.FighterSpeed,
        energy: compFighter.FighterEnergy,
        img: compFighter.FighterImg
    }
}
