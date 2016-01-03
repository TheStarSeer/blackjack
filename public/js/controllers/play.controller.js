var app = angular.module('BlackJackModule');

app.controller('PlayController', ['$scope', 'PlayService', function($scope, PlayService){

  // Variables on Scope.
  $scope.blnBetPlaced = false;
  $scope.blnHandStarted = false;
  $scope.blnPlayAgain = false;
  $scope.blnHitTaken = false;
  $scope.blnBetClearable = false;
  $scope.dblBetAmount = 0;
  $scope.arrPlayerCards = [];
  $scope.intPlayerValue = '';
  $scope.arrComputerCards = [];
  $scope.intComputerValue = '';
  $scope.arrPlayMessage = [];

  // blnNoFurther is set once computer reaches at least 17.
  var blnNoFurther = false;


  // Builds intital deck.
  PlayService.buildNewDeck();
  $scope.arrDeck = PlayService.arrDeck;
  PlayService.getBankroll()
    .then(function(response) {
      $scope.dblBankroll = response;
      PlayService.dblBankroll = response;
    });

  // Checks to see if any result has occurred, populates some scoped variables.
  var messageCheck = function(){
    if ($scope.arrPlayMessage.length !== 0) {
      for (var message in $scope.arrPlayMessage) {
        switch ($scope.arrPlayMessage[message]) {
          case 'You win!':
            PlayService.dblBankroll += PlayService.dblBetAmount * 2;
            break;
          case 'Push':
            PlayService.dblBankroll += PlayService.dblBetAmount;
            break;
        }
      }
      $scope.blnPlayAgain = true;
      $scope.blnHandStarted = false;
      $scope.dblBankroll = PlayService.dblBankroll;
      $scope.arrComputerCards = PlayService.returnCardKeys(PlayService.arrComputerCards);
      $scope.intComputerValue = PlayService.intComputerCardValue;
      $scope.intPlayerValue = PlayService.intPlayerCardValue;
      PlayService.resetPlay();
    } else {
      $scope.blnHandStarted = true;
    }
  }

  $scope.placeBet = function(intBetAmount) {
    if (PlayService.placeBet(intBetAmount)) {
      $scope.dblBankroll = PlayService.dblBankroll;
      $scope.dblBetAmount = PlayService.dblBetAmount;
      $scope.blnBetPlaced = true;
      $scope.blnBetClearable = true;
    } else {
      alert('Sorry, but bankroll is too low.');
    }
  };

  $scope.clearBet = function() {
    PlayService.clearBet();
    $scope.dblBankroll = PlayService.dblBankroll;
    $scope.dblBetAmount = PlayService.dblBetAmount;
    $scope.blnBetPlace = false;
    $scope.blnBetClearable = false;
  }


  $scope.deal = function() {
    PlayService.dealCards();
    $scope.arrPlayerCards = PlayService.returnCardKeys(PlayService.arrPlayerCards);
    $scope.arrComputerCards = PlayService.returnCardKeys(PlayService.arrComputerCards, true);
    $scope.arrPlayMessage = PlayService.checkPlay();
    // Check $scope.arrPlayMessage population.
    messageCheck();
  };

  $scope.hit = function(strCompetitor) {
    $scope.blnHitTaken = true;
    PlayService.hit(strCompetitor);
    $scope.arrPlayerCards = PlayService.returnCardKeys(PlayService.arrPlayerCards);
    $scope.arrPlayMessage = PlayService.checkPlay();
    // Check $scope.arrPlayMessage population.
    messageCheck();
  };

  $scope.stay = function(strCompetitor) {
    $scope.arrComputerCards = PlayService.returnCardKeys(PlayService.arrComputerCards);
    blnNoFurther = PlayService.hit(strCompetitor);
    $scope.arrPlayMessage = PlayService.checkPlay(blnNoFurther);
    $scope.arrComputerCards = PlayService.returnCardKeys(PlayService.arrComputerCards);
    // Check $scope.arrPlayMessage population.
    messageCheck();
  };

  $scope.doubleDown = function() {
    // If bet is less than bankroll.
    if (PlayService.doubleDown()) {
      $scope.dblBetAmount = PlayService.dblBetAmount;
      $scope.dblBankroll = PlayService.dblBankroll;
      $scope.arrPlayerCards = PlayService.returnCardKeys(PlayService.arrPlayerCards);
      $scope.arrPlayMessage = PlayService.checkPlay();
      if ($scope.arrPlayMessage.length != 0) {
        messageCheck();
      } else {
        blnNoFurther = PlayService.hit('computer');
        $scope.arrPlayMessage = PlayService.checkPlay(blnNoFurther);
        $scope.arrPlayerCards = PlayService.returnCardKeys(PlayService.arrPlayerCards);
        $scope.arrComputerCards = PlayService.returnCardKeys(PlayService.arrComputerCards);
        messageCheck();
      }
    } else {
      // Show alert if not enough money to double.
      alert('Sorry, you don\'nt have enough money to double down.');
    }
  };

  $scope.playAgain = function() {
    $scope.intPlayerValue = '';
    $scope.intComputerValue = '';
    $scope.arrPlayMessage = PlayService.strMessage;
    $scope.blnBetPlaced = false;
    $scope.blnHandStarted = false;
    $scope.dblBetAmount = PlayService.dblBetAmount;
    $scope.arrPlayerCards = PlayService.arrPlayerCards;
    $scope.arrComputerCards = PlayService.arrComputerCards;
    $scope.blnPlayAgain = false;
    $scope.blnHitTaken = false;
    $scope.blnBetClearable = false;
    blnNoFurther = false;

  }
}]);
