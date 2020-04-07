var card, value, state, roundScore, activePlayer, currentGame, numberOfTurns;

//this function will setup the initial envieroment.
initGame();

//the "ask for a card" event listener.
document.querySelector('.action').addEventListener('click', ()=>{
    //if currentGame === true, the players can actually play the game.
    if (currentGame) {
        //this is how we add a random value everytime we ask for a card.
        card = Math.ceil(Math.random() * 13);

        //since every card above ten has a value of 10 we must use an if statement alongside with a value var to solve this problem.
        value = card;

        if (card >= 10) {
            //this is how we solve such a problem!
            value = 10;
        };

        //now let's render the card based on its value.
        const markup = `
        <div class="card"><img src="./images/${card}.png" alt="card" class="card"></div>
        `;

        document.querySelector('.player-' + activePlayer + '-game').insertAdjacentHTML('beforeend', markup);
        
        roundScore += value;

        document.querySelector('#score-' + activePlayer).textContent = roundScore;

        if (roundScore >= 21) {
            //if a player scores more than 21 its turn will instantly end.
            changeTurn();
        };

    };
});

//here we add an event listener on the "init button", so it can run our initGame function and reset everything once it's clicked.
document.querySelector('.init').addEventListener('click', initGame);

//here we add our change turn function to our 'end turn' button. By doing this, any player could finish its turn wherenever he desires.
document.querySelector('.end').addEventListener('click', changeTurn);

//here we are setting the events that will take place anytime somebody change turns by clicking the end turn button, or by scoring above 21 points.
function changeTurn() {
    
    //here we are saving the actual score into the global score, and rendering the whole thing.
    score[activePlayer] += roundScore;
    document.getElementById('global-score-' + activePlayer).textContent = score[activePlayer];

    //here we stablish the condition for player changes using a ternary operator. 
    activePlayer === 0 ?  activePlayer = 1 : activePlayer = 0;

    //this function will determine a winner.
    if (score[1] > 0) {
        if (score[0] > score[1] && score[0] <= 21 || score[1] > 21) {
            document.querySelector('.player-0-status').style.display = 'initial';
            currentGame = false;
        } else if (score[1] > score[0] && score[1] <= 21 || score[0] > 21) {
            document.querySelector('.player-1-status').style.display = 'initial';
            currentGame = false;
        };
    };

    //we also, must set the roundScore down to 0. By doing such a thing, the next player score will start at 0 and not at the previous player final score.
    roundScore = 0;

    document.querySelector('.player-0-container').classList.toggle('active');
    document.querySelector('.player-1-container').classList.toggle('active');

};

//here we setting down the enviroment for a new game.
function initGame() {
    score = [0,0]
    roundScore = 0;
    activePlayer = 0;
    currentGame = true;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('global-score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('global-score-1').textContent = '0';
    document.querySelector('.player-0-container').classList.remove('active');
    document.querySelector('.player-1-container').classList.remove('active');
    document.querySelector('.player-0-name').classList.remove('winner-player');
    document.querySelector('.player-1-name').classList.remove('winner-player');
    document.querySelector('.player-0-container').classList.add('active');
    document.querySelector('.player-0-status').style.display = 'none';
    document.querySelector('.player-1-status').style.display = 'none';
    document.querySelector('.player-0-game').innerHTML = '';
    document.querySelector('.player-1-game').innerHTML = '';
};


