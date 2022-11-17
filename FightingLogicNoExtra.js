function initialize(userFighter, compFighter){
    player = new Fighter("john", 6, 6, 6, 30, "imgs/narwal.jpg");
    computer = new Fighter("Computer", 6, 6, 6, 30, "imgs/wheatleyCrab.jpg");
    setFighterStatsAtStart(player);
    setFighterStatsAtStart(computer);
    playerEngStart = player.energy.value;
    computerEngStart = computer.energy.value;
    console.log(player.energy.value);
    console.log(playerEngStart);
    playerNameDis = document.getElementById("playerName");
    playerStatsDis = document.getElementById("playerStats");
    playerImgDis = document.getElementById("playerIMG");
    playerLogDis = document.getElementById("playerLog");
    computerNameDis = document.getElementById("computerName");
    computerStatsDis = document.getElementById("computerStats");
    computerImgDis = document.getElementById("computerIMG");
    computerLogDis = document.getElementById("computerLog");
    playerSpecialMoveButton = document.getElementById("playerSpecialMove");
    buttonsDis = document.getElementById("buttons");
    playerSpecialMoveButton.style.display = 'none';
    player.log+="Starting Stats: </br>";
    player.log+=currentStats(player) + "</br>";
    computer.log+="Starting Stats: </br>";
    computer.log+=currentStats(computer) + "</br>";
    display();
}

class TurnChoice{
    static Attack = new TurnChoice("attack");
    static Defend = new TurnChoice("defend");
    static Special = new TurnChoice("special");
    constructor(option) {
        this.option = option;

    }

}
class Fighter{
    constructor(name, strength, cunning, speed, energy, img) {
        this.name = name;
        this.strength = {value: strength};
        this.strength.title= "str"
        this.cunning = {value: cunning};
        this.cunning.title = "cun";
        this.speed = {value: speed};
        this.speed.title = "spd";
        this.energy = {value: energy};
        this.energy.title = "eng";
        this.weakEnough = false;
        this.turn = "";
        this.img = img;
        this.log = name + " created </br>";
    }

    calcAttack = () =>
    {
        console.log(this.name + " Attack Power: ");
        return (this.strength.value + this.speed.value + this.cunning.value)/randomNum(1,3);
    }

    calcSpecial = () =>
    {
        console.log(this.name + "Special Power: ");
        return (this.strength.value + this.speed.value)/randomNum(1,3)
    }

    calcDefence = (defend) =>
    {
        console.log(this.name + " Defense Power: ");
        if(defend){
            return this.speed.value + this.cunning.value;
        } else{
            return this.speed.value + randomNum(1, 6);
        }
    }
}

function setFighterStatsAtStart(Fighter)
{
    chooseIncreaseOrDecrease(Fighter);
    setStatsAtStartMath(Fighter);
}

//chooses at the start of the round how stats for a fighter will change
function chooseIncreaseOrDecrease(Fighter)
{
    let stats = [Fighter.strength, Fighter.cunning, Fighter.speed, Fighter.energy];
    let statsLengthNow = stats.length -1;
    //console.log(statsLengthNow);
    for (let i = 0; i < 2; i++) {
        let pos = randomNum(0, statsLengthNow - i);
        //console.log(pos);
        stats[pos].startChange = 1;
        stats.splice(pos,1);
    }
    for (const current of stats) {
        current.startChange = -1;
    }
    stats = [Fighter.strength, Fighter.cunning, Fighter.speed, Fighter.energy];
    for (const current of stats) {
        console.log(Fighter.name + ":");
        let whatIsStartChange = "";
        if(current.startChange > 0){
            whatIsStartChange = "increase";
        } else {
            whatIsStartChange = "decrease";
        }
        console.log(current.title + " change: " + whatIsStartChange);
    }

}

function setStatsAtStartMath(Fighter)
{
    let stats = [Fighter.strength, Fighter.cunning, Fighter.speed, Fighter.energy];
        for (const element of stats) {

               console.log(element.title + "\'s temp starting value: " + element.value);
               if (element.title === "eng") {
                   var change = randomNum(0, 6);
                   change *= element.startChange;
                   element.value += change;
               } else {

                   var change = randomNum(0, 1);
                   change *= element.startChange;
                   element.value += change;
               }
               console.log(element.title + "\'s change: " + change);
               console.log(element.title + "\'s real starting value: " + element.value);


    }

}

async function turn(playerTurnChoice)
{
    player.turn = playerTurnChoice.option;
    console.log("player move choice: " + player.turn);

    if(player.weakEnough === true){
        computer.turn = "special";
    } else
    {
        computer.turn = (randomNum(0, 1) === 0) ? "defend" : "attack";
    }
    console.log("computer move choice: " + computer.turn);


    if((player.turn === "attack" || player.turn === "special") && (computer.turn === "attack" || computer.turn === "special"))
    {
        bothAttack();
    } else if (player.turn === "defend" && computer.turn === "defend")
    {
        bothDefend();
    } else
    {
        if(player.turn === "attack")
        {
            oneDefend(player, computer);
        } else
        {
            oneDefend(computer, player);
        }
    }

    if(player.energy.value < 0 || (player.energy.value*2) <= computer.energy.value)
    {
        player.weakEnough = true;
    } else
    {
        player.weakEnough = false;
    }

    if(computer.energy.value < 0 || (computer.energy.value*2) <= player.energy.value)
    {
        computer.weakEnough = true;
        playerSpecialMoveButton.style.display = 'block';
    } else
    {
        computer.weakEnough = false;
        playerSpecialMoveButton.style.display = 'none';
    }

    display();
    await delay(200);
}

function bothAttack(playSpecial, compSpecial) {
    let playAttack = player.calcAttack(), compAttack = computer.calcAttack();
    let playAttackLog = "</br>" + player.name + " is attacking </br>";
    let compAttackLog = "</br>" + computer.name + " is attacking </br>";
    if(player.turn === "special")
    {
        playAttack = player.calcSpecial();
        playAttackLog = "</br>" + player.name + " is using their special move </br>";
    }
    if(computer.turn === "special")
    {
        compAttack = computer.calcSpecial();
        compAttackLog =  "</br>" + computer.name + " is using their special move </br>";
    }
    player.log+=playAttackLog;
    computer.log+=compAttackLog;
    let playDef = player.calcDefence(false),
        compDef = computer.calcDefence(false);
    console.log("playAttack: " + playAttack);
    //player.log+="</br> Player Attack Value: " + playAttack + "</br>";
    console.log("playDef: " + playDef);
    //player.log+="Player Defense Value: " + playDef + "</br>";
    console.log("compAttack " + compAttack);
    //computer.log+="</br> Computer Attack Value: " + compAttack + "</br>";
    console.log("compDef: " + compDef);
    //computer.log+="Computer Defense Value: " + compDef + "</br>";

    let gameWinner = "";
    if(playAttack > compDef)
    {
        if(player.turn !== "special") {
            let damage = playAttack - compDef;
            console.log("computer damage taken: " + (damage))
            computer.energy.value -= (damage);
            player.log+=player.name + " did " + damage + " damage to " + computer.name + "</br>";
        } else {
            console.log("player's special move successful");
            gameWinner+=player.name;
        }
    } else
    {
        let currentEngValComp = computer.energy.value;
        computer.energy.value+= randomNum(1,6);
        if(computer.energy.value > computerEngStart)
        {
            computer.energy.value = computerEngStart;
        }
        console.log("computer recovery: " + (computer.energy.value-currentEngValComp));
        player.log+=computer.name + " recovered " + (computer.energy.value-currentEngValComp) +
            " due to " + player.name + "\'s attack </br>";
    }

    if(compAttack > playDef){
        if(computer.turn !== "special")
        {
            let damage = (compAttack - playDef);
            console.log("player damage taken: " + damage);
            player.energy.value-= damage;
            computer.log+=computer.name + " did " + damage + " damage to " + player.name + "</br>";

        } else
        {
            console.log("computer's special was successful");
            gameWinner+=computer.name;
        }
    } else
    {
        let currentEngValPlay = player.energy.value;
        player.energy.value+= randomNum(1,6);
        if(player.energy.value > playerEngStart)
        {
            player.energy.value = playerEngStart;
        }
        console.log("player recovery: " + (player.energy.value-currentEngValPlay));
        computer.log+=player.name + " recovered " + (player.energy.value-currentEngValPlay) +
            " due to " + computer.name + "\'s attack </br>";
    }
    if(gameWinner !== "")
    {
        if(gameWinner !== player.name && gameWinner !== computer.name)
        {
            sessionStorage.setItem("gameWinner", "draw");
        } else if (gameWinner === player.name)
        {
            sessionStorage.setItem("gameWinner", player.name);
        } else {
            sessionStorage.setItem("gameWinner", computer.name);
        }
        window.location.href = "WinnerScreen.html";
    }
}

function oneDefend(attacker, defender) {
    let attackerAttack = attacker.calcAttack();
    let defenderDefend = defender.calcDefence(true);
    defender.log+="</br>" + defender.name + " is defending </br>";
    if(attacker.turn === "special")
    {
        attacker.log+= "</br>" + attacker.name + " is using their special move </br>";
    } else {
        attacker.log+= "</br>" + attacker.name + " is attacking </br>";
    }
    if(attackerAttack > defenderDefend && attacker.turn !== "special"){
        defender.energy.value-= (attackerAttack-defenderDefend);
        attacker.log+=attacker.name + " did " + (attackerAttack-defenderDefend) + " damage to " + defender.name + "</br>";
        defender.log+=defender.name + " took " + (attackerAttack-defenderDefend) + " damage from " + attacker.name + "'s attack</br>";
    } else if(attackerAttack > defenderDefend && attacker.turn === "special"){
        sessionStorage.setItem("gameWinner", attacker.name);
        window.location.href = "WinnerScreen.html";
    } else {
        let oldDefendEnergy = defender.energy.value;
        if(defender == computer)
        {
           var defendStartEng = computerEngStart;
        } else
        {
            var defendStartEng = playerEngStart;
        }
        defender.energy.value+= randomNum(1,6);
        if(defender.energy.value > defendStartEng)
        {
            defender.energy.value = defendStartEng;
        }
        defender.log+= defender.name + " recovered " + (defender.energy.value-oldDefendEnergy) + " energy from " +
            attacker.name + "\'s failed attack</br>";
       attacker.log+= attacker.name + "\'s attack failed and " + defender.name + " recovered " + (defender.energy.value-oldDefendEnergy) + " energy from the attack</br>";
    }
}

function bothDefend()
{
    player.log+="</br>" + player.name + " is defending </br>";
    computer.log+="</br>" + computer.name + " is defending </br>";
    let oldPlayerEnergy = player.energy.value;
    let oldCompEnergy = computer.energy.value;
    player.energy.value+= randomNum(1,6);
    if(player.energy.value > playerEngStart)
    {
        player.energy.value = playerEngStart;
    }
    player.log+=player.name + " recovered " + (player.energy.value-oldPlayerEnergy) + " energy</br>";
    computer.energy.value+= randomNum(1,6);
    if(computer.energy.value > playerEngStart)
    {
        computer.energy.value = computerEngStart;
    }
    computer.log+=computer.name + " recovered " + (computer.energy.value-oldCompEnergy) + " energy</br>";
}

function randomNum(min,max)
{
    return Math.floor(Math.random() * (max-min+1))+ min;
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);});
}

function currentStats(Fighter)
{
    let fighterStats = "Strength: " + Fighter.strength.value + "</br>";
    fighterStats+= "Cunning: " + Fighter.cunning.value + "</br>";
    fighterStats+= "Speed: " + Fighter.speed.value + "</br>";
    fighterStats+= "Energy: <span>" + Fighter.energy.value + "</span></br>";
    return fighterStats;
}

function display()
{


    playerImgDis.src = player.img;
    playerNameDis.innerHTML = player.name;
    playerStatsDis.innerHTML = currentStats(player);
    playerLogDis.innerHTML = player.log;

    computerImgDis.src = computer.img;
    computerNameDis.innerHTML = computer.name;
    computerStatsDis.innerHTML = currentStats(computer);
    computerLogDis.innerHTML = computer.log;


}

