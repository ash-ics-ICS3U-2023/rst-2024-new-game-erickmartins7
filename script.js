
    let playerScore = 0; //Assigning the score of the player
    let dealerScore = 0; //Assigning the score of the dealer
    let playerAces = 0; //Assigning the number of aces of the player since they can have different values
    let dealerAces = 0; //Assigning the number of aces of the dealer since they can have different values
    let deck = [];
    let dealerSecondCard = null;  // 'null' is serving as a placeholder to show that the dealer's second card is unknown. Important for hiding the dealers second card.
    const values = [  //This is the card and card values array. It represents each card with a file path and a point value.
        { name: 'images/2_of_clubs.png', value: 2 },
        { name: 'images/2_of_hearts.png', value: 2 },
        { name: 'images/2_of_diamonds.png', value: 2 },
        { name: 'images/2_of_spades.png', value: 2 },
        { name: 'images/3_of_clubs.png', value: 3 },
        { name: 'images/3_of_hearts.png', value: 3 },
        { name: 'images/3_of_diamonds.png', value: 3 },
        { name: 'images/3_of_spades.png', value: 3 },
        { name: 'images/4_of_clubs.png', value: 4 },
        { name: 'images/4_of_hearts.png', value: 4 },
        { name: 'images/4_of_diamonds.png', value: 4 },
        { name: 'images/4_of_spades.png', value: 4 },
        { name: 'images/5_of_clubs.png', value: 5 },
        { name: 'images/5_of_hearts.png', value: 5 },
        { name: 'images/5_of_diamonds.png', value: 5},
        { name: 'images/5_of_spades.png', value: 5 },
        { name: 'images/6_of_clubs.png', value: 6 },
        { name: 'images/6_of_hearts.png', value: 6 },
        { name: 'images/6_of_diamonds.png', value: 6 },
        { name: 'images/6_of_spades.png', value: 6 },
        { name: 'images/7_of_clubs.png', value: 7 },
        { name: 'images/7_of_hearts.png', value: 7 },
        { name: 'images/7_of_diamonds.png', value: 7 },
        { name: 'images/7_of_spades.png', value: 7},
        { name: 'images/8_of_clubs.png', value: 8 },
        { name: 'images/8_of_hearts.png', value: 8},
        { name: 'images/8_of_diamonds.png', value: 8 },
        { name: 'images/8_of_spades.png', value: 8},
        { name: 'images/9_of_clubs.png', value: 9 },
        { name: 'images/9_of_hearts.png', value: 9},
        { name: 'images/9_of_diamonds.png', value: 9 },
        { name: 'images/9_of_spades.png', value: 9},
        { name: 'images/10_of_clubs.png', value: 10 },
        { name: 'images/10_of_hearts.png', value: 10},
        { name: 'images/10_of_diamonds.png', value: 10 },
        { name: 'images/10_of_spades.png', value: 10},
        { name: 'images/jack_of_clubs.png', value: 10 },
        { name: 'images/jack_of_hearts.png', value: 10},
        { name: 'images/jack_of_diamonds.png', value: 10 },
        { name: 'images/jack_of_spades.png', value: 10},
        { name: 'images/queen_of_clubs.png', value: 10 },
        { name: 'images/queen_of_hearts.png', value: 10},
        { name: 'images/queen_of_diamonds.png', value: 10 },
        { name: 'images/queen_of_spades.png', value: 10},
        { name: 'images/king_of_clubs.png', value: 10 },
        { name: 'images/king_of_hearts.png', value: 10},
        { name: 'images/king_of_diamonds.png', value: 10 },
        { name: 'images/king_of_spades.png', value: 10},
        { name: 'images/ace_of_clubs.png', value: 11 },
        { name: 'images/ace_of_hearts.png', value: 11},
        { name: 'images/ace_of_diamonds.png', value: 11 },
        { name: 'images/ace_of_spades.png', value: 11},
    ];

    initializeDeck(); //This calls the intitializeDeck function to set up and shuffle the deck.

    document.getElementById("btn_hit").addEventListener("click", hit); //These are event listeners that have the element id of the buttons and wait for a 'click' to run the hit, stnad, and deal functions.
    document.getElementById("btn_stand").addEventListener("click", stand);
    document.getElementById("btn_deal").addEventListener("click", deal);

    function initializeDeck() {
        deck = []; //Initializes an empty array named 'deck' which will hold all the cards. Unlike the 'values' array, this one will be modified throughout the game.
        for (let i = 0; i < values.length; i++) {  //This for loop iterates through the indexes of the 'values' array.
            let value = values[i];  //Assigns the current element from the 'values' index at 'i' to the variable named 'value'.
            deck.push({ name: value.name, value: value.value });  //This line is creating an object with two properties, the name and value of the car. The .push() method is adding the new object to the 'deck' array.
        }
        shuffleDeck(); //Calls the shuffleDeck function to shuffle the deck.
    }

    function compareRandom() { //This function generates a random number.
        return Math.random() - 0.5; //Math.random() generates a random number between 0 and 1. Subtracting 0.5 shifts this range to -0.5 to 0.5, ensuring a random distribution around zero.
    }

    function shuffleDeck() {
         deck.sort(compareRandom); //The 'sort()' method sorts the elements of the 'deck' array based on the returned value of the compareRandom() function.
    }

    function deal() {
        playerScore = 0;
        dealerScore = 0;
        playerAces = 0;
        dealerAces = 0;
        dealerSecondCard = null;  //'null' is serving as a placeholder to show that the dealer's second card is unknown. Important for hiding the dealers second card.
        updateScores(true);  //Hide dealer score initially

        document.getElementById("gameMessages").textContent = ''; //Clears the previous game's messages.
        document.getElementById("playerCards").innerHTML = ''; //Clears the card container for the player.
        document.getElementById("dealerCards").innerHTML = ''; //Clears the card container for the dealer.

        for (let i = 0; i < 2; i++) { //This for loop iterates twice.
            dealCardToPlayer();
            dealCardToDealer(i === 1);  //This statement makes sure that the second card dealt to the dealer is marked as face down.
        }

        document.getElementById("btn_hit").disabled = false; //Enable the 'hit' button.
        document.getElementById("btn_stand").disabled = false; //Enable the 'stand' button.
    }

    function hit() { //This function deals a card to the player.
        dealCardToPlayer();

        if (playerScore > 21) { //This statement chcecks if the player busts and ends the game if they do.
            document.getElementById("gameMessages").textContent = "You bust!";
            endGame();
        }
    }

    function stand() {
        if (dealerSecondCard) {
            dealerSecondCard.src = dealerSecondCard.dataset.realSrc; //Shows the dealer's hidden card. 'src' is set to the image of the back of a card.
        }
        
        while (dealerScore < 17) { //Continues to deal cards ultil the dealer's score is at least 17.
            dealCardToDealer(false);
        }

        if (dealerScore > 21) { //Determines game outcome, whether that is win, lose, or tie.
            document.getElementById("gameMessages").textContent = "Dealer busts! You win!";
        } else if (dealerScore > playerScore) {
            document.getElementById("gameMessages").textContent = "Dealer wins!";
        } else if (dealerScore < playerScore) {
            document.getElementById("gameMessages").textContent = "You win!";
        } else {
            document.getElementById("gameMessages").textContent = "It's a tie!";
        }
        updateScores(false);  //Shows the dealer's score after stand.
        endGame(); //Ends the game.
    }

    function dealCardToPlayer() {
        let card = getCard();
        playerScore += card.value; //Adds the value of the card to the score.
        if (card.value ===11) { //Adjusts the score for aces if needed.
            playerAces += 1;
        }
        playerScore = adjustForAces(playerScore, playerAces);
        updateScores(true); //Updates the score.
        displayCard(card, 'playerCards'); //Displays the card.
    }

    function dealCardToDealer(isFaceDown) {
        let card = getCard();
        dealerScore += card.value; //Adds the value of the card to the score.
        if (card.value == 11) { //Adjusts the score for aces if needed.
            dealerAces += 1;
        }
        dealerScore = adjustForAces(dealerScore, dealerAces);
        displayCard(card, 'dealerCards', isFaceDown); //Displays the card with option to displace face down using the image of the back of a card.

        if (isFaceDown) {
            dealerSecondCard = document.querySelector('#dealerCards img:last-child');
            dealerSecondCard.dataset.realSrc = card.name;  // Store the real source in a data attribute
        }
    }

    function getCard() {
        if (deck.length == 0) {
            alert("The deck is empty! Reshuffling...");
            initializeDeck();
        }
        return deck.pop();
    }

    function updateScores(hideDealerScore) {
        document.getElementById("playerScore").textContent = playerScore;
        document.getElementById("dealerScore").textContent = hideDealerScore ? "?" : dealerScore;
    }

    function adjustForAces(score, aces) {
        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }
        return score;
    }

    function displayCard(card, containerId, isFaceDown = false) {
        let cardImg = document.createElement('img');
        cardImg.src = isFaceDown ? 'images/back_of_card.png' : card.name;
        document.getElementById(containerId).appendChild(cardImg);
    }

    function endGame() {
        document.getElementById("btn_hit").disabled = true;
        document.getElementById("btn_stand").disabled = true;
    }

