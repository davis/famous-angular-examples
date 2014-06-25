'use strict';

//

angular.module('integrationApp')

.controller('UntidyCtrl1', function ($scope, $famous, $timeout) {
  var Transitionable   = $famous['famous/transitions/Transitionable'];
  var SpringTransition = $famous['famous/transitions/SpringTransition'];
  var EventHandler     = $famous['famous/core/EventHandler'];
  var Transform        = $famous['famous/core/Transform'];
  var Easing           = $famous['famous/transitions/Easing'];
  var Timer            = $famous['famous/utilities/Timer'];

  Transitionable.registerMethod('spring', SpringTransition);
  $scope.evt = new EventHandler();

  var _expanded;
  window.expand = $scope.expand = function() {
    console.log('toggle expand');
    if(!_expanded) {
      t9ables.barsTransitionable.set(1, TRANSITIONS.outBack250);
    } else {
      t9ables.barsTransitionable.set(0, TRANSITIONS.outBack250);
    }
    _expanded = !_expanded;
  }; 

  // make some useful transitions available
  var TRANSITIONS = {
    inBack800:        { curve: Easing.inBack, duration: 800 },
    inOutSine500:     { curve: Easing.inOutSine, duration: 500 },
    outBack250:       { curve: Easing.outBack, duration: 250 },
    springTransition: { method: "spring",  period: 1300, dampingRatio: 0.8, velocity: 0.004 }
  };

  // intialize transitionables
  var t9ables = {
    screenScale:         new Transitionable(0),
    screenOpacity:       new Transitionable(0),
    barsTransitionable:  new Transitionable(0),
    clockTransitionable: new Transitionable(0),
  };

  // states used by template
  $scope.states = {
    screenScale: function() { return [t9ables.screenScale.get(), t9ables.screenScale.get(), 1]; },
    barsTranslate: function() { return [0, 45 * t9ables.barsTransitionable.get(), 2]; },
    titleTranslate: [130, 35, 5],
    hamburgerTranslate: [-115, -230, 2],
    arrowTranslate: [115, -230, 2],
    searchTranslate: [0, -165, 4]
  };

  // define bars
  var bars = 4;
  $scope.bars = {};
  for(var i = 0; i < bars; i++) {
    (function(i) {
      $scope.bars[i] = {
        X: new Transitionable(0),
        Y: new Transitionable(0),
        translate: function() {
          return [0 - 310 * this.X.get(), 550 - ( 625 * this.Y.get() - 100 * i ), 2];
        },
        opacity: function() {
          // hacky way to hide bars until screenScale hits full
          if($scope.bars[i].Y.get() > 0.4) {
            return this.Y.get();
          }
          return 0;
        },
        rotate: function() {
          return 0;
        }
      };
    })(i);
  }

  // icon bg colors
  $scope.bars[0].bgCol = '#FA726C';
  $scope.bars[1].bgCol = '#BAD174';
  $scope.bars[2].bgCol = '#3BA686';
  $scope.bars[3].bgCol = '#5F6F8C';

  // in transitions
  $scope.from = {
    flipper: function (done) {
      function transition() {
        // set screen
        t9ables.screenScale.set(1, TRANSITIONS.inOutSine500);

        // set bars
        for(var i = 0; i < bars; i++) {
          (function(i) {
            $scope.bars[i].X.set(0); // reset X
            $scope.bars[i].Y.set(0); // reset Y
            Timer.setTimeout(function() {
              $scope.bars[i].Y.set(1, TRANSITIONS.springTransition, function() {
                if(i === bars-1) done(); // call done on last bar completion
              });
            }, 1000 + (100 * i));
          })(i);
        }
      }
      // timeout on entire transition
      Timer.setTimeout(transition, 500);
    },
    untidy2: function(done) {
        // set bars
        for(var i = 0; i < bars; i++) {
          (function(i) {
            Timer.setTimeout(function() {
              $scope.bars[i].X.set(1, TRANSITIONS.inBack800, function() {
                if(i === bars-1) done();
              });
            }, (100 * i) + 1000);
          })(i);
        }
      }
  };

  // out transitions
  $scope.to = {
    flipper: function (done) {
      // set bars
      for(var i = 0; i < bars; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.bars[i].Y.set(0, TRANSITIONS.inBack800, function() {
              if(i+1 === bars) {
                // set screen
                t9ables.screenScale.set(0, TRANSITIONS.inOutSine500, function() {
                  done();
                });
              }
            });
          }, (50 * i) - 50);
        })(i);
      }
    },
    untidy2: function(done) {
      // set bars
      for(var i = 0; i < bars; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.bars[i].X.set(1, TRANSITIONS.inBack800, function() {
              if(i === bars-1) done();
            });
          }, (100 * i) + 1000);
        })(i);
      }
    }
  };
});