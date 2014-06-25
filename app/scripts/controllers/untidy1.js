'use strict';

angular.module('integrationApp')

.controller('UntidyCtrl1', function ($scope, $famous, $timeout) {
  var Transitionable   = $famous['famous/transitions/Transitionable'];
  var SpringTransition = $famous['famous/transitions/SpringTransition'];
  var EventHandler     = $famous['famous/core/EventHandler'];
  var Transform        = $famous['famous/core/Transform'];
  var Easing           = $famous['famous/transitions/Easing'];
  var Timer            = $famous['famous/utilities/Timer'];

  Transitionable.registerMethod('spring', SpringTransition);

  var springTransition1 = {
      method: 'spring',  period: 1500,
      dampingRatio: 0.6, velocity: 0.003
  };
  var springTransition2 = {
      method: "spring",  period: 1300,
      dampingRatio: 0.8, velocity: 0.004
  };

  $scope.evt = new EventHandler();

  var screenTransitionable = new Transitionable(0);
  var clockTransitionable  = new Transitionable(0);
  var barsTransitionable   = new Transitionable(0);

  $scope.transitionStates = {
    screenScale: function() { return [screenTransitionable.get(), screenTransitionable.get(), 1]; },
    titleTranslate: [130, 35, 0],
    hamburgerTranslate: [-115, -230, 2],
    arrowTranslate: [115, -230, 2],
    searchTranslate: [0, -165, 4],
    barsTranslate: function() { return [0, 45 * barsTransitionable.get(), 2]; }
  };

  // define bars
  var bars = 4;
  $scope.bars = {};
  for(var i = 0; i < bars; i++) {
    (function(i){
      $scope.bars[i] = {};
      $scope.bars[i].transitionable = new Transitionable(0);
      $scope.bars[i].exTrans = new Transitionable(0);
      $scope.bars[i].translate = function() {
        return [0, 550 - ( 625 * $scope.bars[i].transitionable.get() - 100 * i ), 2];
      };
      $scope.bars[i].opacity = function() {
        // hacky way to hide bars until screenScale hits full
        if($scope.bars[i].transitionable.get() > 0.4) {
          return $scope.bars[i].transitionable.get();
        }
        return 0;
      };
      $scope.bars[i].rotate = function() {
        return 0;
      };
    })(i);
  }
  // icon bg colors
  $scope.bars[0].bgCol = '#FA726C';
  $scope.bars[1].bgCol = '#BAD174';
  $scope.bars[2].bgCol = '#3BA686';
  $scope.bars[3].bgCol = '#5F6F8C';

  $scope.inTransitionFunction = function (done) {
    function _transition() {
      // set screen
      screenTransitionable.set(1, {
        curve: Easing.inOutSine,
        duration: 500
      }, function() {
          console.log('screenTranslate finished');
      });
      // set bars
      for(var i = 0; i < bars; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.bars[i].transitionable.set(1, springTransition2, function() {
              if(i+1 === bars) {
                console.log('i\'m done');
                done();
              }
            });
          }, 1000 + (100 * i));
        })(i);
      }
    }
    Timer.setTimeout(_transition, 500);
  };

  // expose to window for test
  window.flipperOut = $scope.outTransitionFunction = function (done) {
    // set bars
    for(var i = 0; i < bars; i++) {
      (function(i) {
        Timer.setTimeout(function() {
          $scope.bars[i].transitionable.set(0, {
            curve: Easing.inBack,
            duration: 800
          }, function() {
            if(i+1 === bars) {
              console.log('i\'m done');
              // set screen
              screenTransitionable.set(0, {
                curve: Easing.inOutSine,
                duration: 500
              }, function() {
                console.log('i\'m out');
                done();
              });
            }
          });
        }, (50 * i) - 50);
      })(i);
    }
  };

  $scope.flip=function(){}; // not sure if still needed

  var _expanded = false;
  window.expand = $scope.expand = function() {
    console.log('toggle expand');
    if(!_expanded) {
      barsTransitionable.set(1, {
        curve: Easing.outBack,
        duration: 250
      });
    } else {
      barsTransitionable.set(0, {
        curve: Easing.outBack,
        duration: 250
      });
    }

    _expanded = !_expanded;
  }; 
});