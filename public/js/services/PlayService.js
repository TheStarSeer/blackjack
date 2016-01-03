var app = angular.module('BlackJackModule');

app.service('PlayService', ['$http', function($http){

  var baseUrl = "http://dev.sandbox.com:5000/api";

  // Sets service variables.
  this.arrDeck = [];
  this.dblBetAmount = 0;
  this.arrPlayerCards = [];
  this.arrComputerCards = [];
  // 0 = not finished, 1 = computer wins, 2 = player wins, 3 draw
  this.intResult = 0;

  this.intPlayerCardValue = 0;
  this.intComputerCardValue = 0;

  // Run's a request and gets user's bankroll.
  this.getBankroll = function(){
    return $http.get(baseUrl + '/user')
      .then(function(response) {
        this.dblBankroll = response.data[0].bankroll;
        return response.data[0].bankroll;
      });
  }

  // Checks for any aces and swaps the value out with one if not already done.
  this.aceFound = function(strHand) {
    var arrReturnedKeys = [];
    var arrCards = [];
    var intHandValue = 0;
    if (strHand === 'player') {
      arrReturnedKeys = this.returnCardKeys(this.arrPlayerCards, false);
      arrCards = this.arrPlayerCards;
      intHandValue = this.intPlayerCardValue;
    }
    else {
      arrReturnedKeys = this.returnCardKeys(this.arrComputerCards, false);
      arrCards = this.arrComputerCards;
      intHandValue = this.intComputerCardValue;
    }
    for (var intCardKey in arrReturnedKeys) {
      if (arrReturnedKeys[intCardKey] === 'C1' || arrReturnedKeys[intCardKey] === 'S1' ||
      arrReturnedKeys[intCardKey] === 'H1' || arrReturnedKeys[intCardKey] === 'D1') {
        for(var objKey in arrCards[intCardKey])
          if (arrCards[intCardKey][objKey] !== 1) {
            arrCards[intCardKey][objKey] = 1;
            return true;
          }
        }
      }
    return false;
  }

  // Builds the deck, single deck.
  this.buildNewDeck = function() {
    this.arrDeck = [];
    for(i = 1; i <= 4; i++) {
      for (var j = 1; j <= 13; j++) {
        var strKey = '';
        var objCard = {};
        if(i === 1) {
          strKey = "C" + j;
          if (j >= 2 && j <= 10) {
            objCard[strKey] = j;
            this.arrDeck.push(objCard);
          }
          else if (j > 10) {
            objCard[strKey] = 10;
            this.arrDeck.push(objCard);
          }
          else if (j === 1) {
            objCard[strKey] = 11;
            this.arrDeck.push(objCard);
          }
        }
        if(i === 2) {
          strKey = "S" + j;
          if (j >= 2 && j <= 10) {
            objCard[strKey] = j;
            this.arrDeck.push(objCard);
          }
          else if (j > 10) {
            objCard[strKey] = 10;
            this.arrDeck.push(objCard);
          }
          else if (j === 1) {
            objCard[strKey] = 11;
            this.arrDeck.push(objCard);
          }
        }
        if(i === 3) {
          strKey = "H" + j;
          if (j >= 2 && j <= 10) {
            objCard[strKey] = j;
            this.arrDeck.push(objCard);
          }
          else if (j > 10) {
            objCard[strKey] = 10;
            this.arrDeck.push(objCard);
          }
          else if (j === 1) {
            objCard[strKey] = 11;
            this.arrDeck.push(objCard);
          }
        }
        if(i === 4) {
          strKey = "D" + j;
          if (j >= 2 && j <= 10) {
            objCard[strKey] = j;
            this.arrDeck.push(objCard);
          }
          else if (j > 10) {
            objCard[strKey] = 10;
            this.arrDeck.push(objCard);
          }
          else if (j === 1) {
            objCard[strKey] = 11;
            this.arrDeck.push(objCard);
          }
        }
      }
    }
  };

  // If bet amount less than bankroll take that money from bankroll and add to
  // bet.
  this.placeBet = function(intAmount) {
    if(intAmount <= this.dblBankroll) {
      this.dblBetAmount += intAmount;
      this.dblBankroll -= intAmount;
      return true;
    } else {
      return false;
    }
  };

  // This clears the bet.
  this.clearBet = function() {
    this.dblBankroll += this.dblBetAmount;
    this.dblBetAmount = 0;
  };

  // Deals two cards for player and computer.
  this.dealCards = function(){
    this.strHandType = 'standard';
    this.strResult = '';
    for (var i = 0; i < 2; i++) {
      this.arrComputerCards.push(this.getRandomCard()[0]);
    }
    for (var i = 0; i < 2; i++) {
      this.arrPlayerCards.push(this.getRandomCard()[0]);
    }
  };

  // Returns random card from 1 to size of deck, removes that card and returns it.
  this.getRandomCard = function() {
    var intRandomNumber = Math.floor(Math.random() * (this.arrDeck.length));
    return this.arrDeck.splice(intRandomNumber, 1);
  };

  // Returns an array of object keys (card name).
  this.returnCardKeys = function(arrCards, blnIsStartCards) {
    blnIsStartCards = blnIsStartCards || false;
    var arrReturnedKeys = [];
    if (blnIsStartCards) {
      arrReturnedKeys.push('demo');
      for (var key in arrCards[1]) {
        arrReturnedKeys.push(key);
      }
    } else {
      for (var i = 0; i < arrCards.length; i++) {
        for (var key in arrCards[i]) {
          arrReturnedKeys.push(key);
        }
      }
    }
    return arrReturnedKeys;
  };

  // Returns an array of cards name.
  this.returnCardNames = function(arrCards) {
    var arrReturnedNames = [];
      for (var i = 0; i < arrCards.length; i++) {
        var strCardName = '';
        for (var key in arrCards[i]) {
          switch (key[0]) {
            case 'S':
              strCardName = 'Spades';
              break;
            case 'D':
              strCardName = 'Diamonds';
              break;
            case 'C':
              strCardName = 'Clubs';
              break;
            case 'H':
              strCardName = 'Hearts';
              break;
          }
          switch (key.match(/[0-9].*/)[0]) {
            case '1':
              strCardName = strCardName.replace (/^/, 'Ace of ');
              break;
            case '2':
              strCardName = strCardName.replace (/^/, 'Two of ');
              break;
            case '3':
              strCardName = strCardName.replace (/^/, 'Three of ');
              break;
            case '4':
              strCardName = strCardName.replace (/^/, 'Four of ');
              break;
            case '5':
              strCardName = strCardName.replace (/^/, 'Five of ');
              break;
            case '6':
              strCardName = strCardName.replace (/^/, 'Six of ');
              break;
            case '7':
              strCardName = strCardName.replace (/^/, 'Seven of ');
              break;
            case '8':
              strCardName = strCardName.replace (/^/, 'Eight of ');
              break;
            case '9':
              strCardName = strCardName.replace (/^/, 'Nine of ');
              break;
            case '10':
              strCardName = strCardName.replace (/^/, 'Ten of ');
              break;
            case '11':
              strCardName = strCardName.replace (/^/, 'Jack of ');
              break;
            case '12':
              strCardName = strCardName.replace (/^/, 'Queen of ');
              break;
            case '13':
              strCardName = strCardName.replace (/^/, 'King of ');
              break;
          }

          arrReturnedNames.push(strCardName);
        }
    }
    return arrReturnedNames;
  };

  // returns the total card value.
  this.returnCardValues = function(arrCards) {
    var arrReturnedValues = [];
      for (var i = 0; i < arrCards.length; i++) {
        for (var key in arrCards[i]) {
          arrReturnedValues.push(arrCards[i][key]);
        }
      }
    return arrReturnedValues.reduce(function(a, b) {
      return a + b;
    });
  };

  // Check to see for a winner. blnNoFurther = no more cards being taken.
  this.checkPlay = function(blnNoFurther) {
    this.intPlayerCardValue = this.returnCardValues(this.arrPlayerCards);
    this.intComputerCardValue = this.returnCardValues(this.arrComputerCards);
    if (blnNoFurther) {
      if (this.intPlayerCardValue > 21) {
        if (this.aceFound('player')) {
          this.checkPlay(true);
        } else {
          this.intResult = 1;
        }
      }
      else if (this.intComputerCardValue > 21) {
        if (this.aceFound('computer')) {
          this.checkPlay(true);
        } else {
          this.intResult = 2;
        }
      }
      else if (this.intComputerCardValue > this.intPlayerCardValue && this.intComputerCardValue <= 21) {
        this.intResult = 1;
      }
      else if(this.intComputerCardValue < this.intPlayerCardValue) {
        this.intResult = 2;
      }
      else if(this.intComputerCardValue === this.intPlayerCardValue) {
        this.intResult = 3;
      }
    }
    else {
      if (this.intComputerCardValue === 21 && this.intPlayerCardValue !== 21) {
        this.intResult = 1;
      }
      else if (this.intComputerCardValue !== 21 && this.intPlayerCardValue === 21) {
        if (this.arrComputerCards.length > 2) {
          this.intResult = 2;
        }
        else if (this.arrComputerCards.length === 2 && this.arrPlayerCards.length === 2) {
          this.intResult = 2;
        }
      }
      else if (this.intComputerCardValue === 21 && this.intPlayerCardValue === 21) {
        this.intResult = 3;
      }
      else if (this.intComputerCardValue > 21) {
        if (this.aceFound('computer')) {
          this.checkPlay();
        } else {
          this.intResult = 2;
        }
      }
      else if (this.intPlayerCardValue > 21) {
        if (this.aceFound('player')) {
          this.checkPlay();
        } else {
          this.intResult = 1;
        }
      }
    }
    return this.returnMessage();
  };

  // Checks for a result and returns array of strings. Also checks to see if cards
  // need to be reshuffled and does if necessary (less than or equal to 12 cards left).
  this.returnMessage = function() {
    var arrMessage = [];
    switch (this.intResult) {
      case 1:
        arrMessage.push('You lose!');
        if (this.shuffleCards()) {
          arrMessage.push('Cards reshuffled.');
        }
        break;
      case 2:
        arrMessage.push('You win!');
        if (this.shuffleCards()) {
          arrMessage.push('Cards reshuffled.');
        }
        break;
      case 3:
        arrMessage.push('Push');
        if (this.shuffleCards()) {
          arrMessage.push('Cards reshuffled.');
        }
        break;
      default:
        arrMessage = [];
    }
    return arrMessage;
  }

  // Resets some object variables.
  this.resetPlay = function() {

    this.postBackInformation();
    this.dblBetAmount = 0;
    this.arrPlayerCards = [];
    this.arrComputerCards = [];
    this.intResult = 0;
    this.intPlayerCardValue = '';
    this.intComputerCardValue = '';
    this.strMessage = '';
  }

  this.postBackInformation = function() {
    var strResult = '';

    switch (this.intResult) {
      case 1:
        strResult = 'lost';
        break;
      case 2:
        strResult = 'won';
        break;
      case 3:
        strResult = 'push';
        break;
    }

    var arrComputerCardNames = this.returnCardNames(this.arrComputerCards);
    var arrPlayerCardNames = this.returnCardNames(this.arrPlayerCards);
    var objHand = {
      playerCardKeys : arrPlayerCardNames,
      computerCardKeys : arrComputerCardNames,
      playerHandValue : this.intPlayerCardValue,
      computerHandValue : this.intComputerCardValue,
      handType : this.strHandType,
      betAmount : this.dblBetAmount,
      result: strResult
    };

    $http.post(baseUrl + '/hand', objHand)
      .then(function(response){
        console.log(response.data);
      });

    var objUser = {
      bankroll : this.dblBankroll
    };

    $http.put(baseUrl + '/user', objUser)
      .then(function(response) {
        console.log(response.data);
      });
  }

  // Reshuffles cards if necessary.
  this.shuffleCards = function() {
    if (this.arrDeck.length <= 12) {
      this.buildNewDeck();
      return true;
    }
    return false;
  }

  // Player takes one card, computer takes card until 17.
  this.hit = function(strCompetitor) {
    switch (strCompetitor) {
      case 'player':
        this.arrPlayerCards.push(this.getRandomCard()[0]);
        break;
      case 'computer':
        this.intComputerCardValue = this.returnCardValues(this.arrComputerCards);
        while (this.intComputerCardValue < 17) {
          this.arrComputerCards.push(this.getRandomCard()[0]);
          this.checkPlay(false);
        }
        return true;
        break;
    }
  }

  // Adds the double to bet, player takes one card.
  this.doubleDown = function() {
    if(this.dblBetAmount <= this.dblBankroll) {
      this.strHandType = 'double-down';
      this.dblBankroll -= this.dblBetAmount;
      this.dblBetAmount += this.dblBetAmount;
    } else {
      return false;
    }
    this.arrPlayerCards.push(this.getRandomCard()[0]);
    return true;
  };

}]);
