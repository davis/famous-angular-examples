'use strict';
//adapted from @continuata's code at https://github.com/Famous/famous-angular/issues/72 
angular.module('integrationApp')
  .controller('ExampleCtrl', function ($scope, $famous, $timeout) {
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Transform = $famous['famous/core/Transform'];
    var Easing = $famous['famous/transitions/Easing'];
    var Timer = $famous['famous/utilities/Timer'];

    var SpringTransition = $famous['famous/transitions/SpringTransition'];

    Transitionable.registerMethod('spring', SpringTransition);
    var transition = {
        method: "spring",
        period: 1500,
        dampingRatio: 0.6,
        velocity: 0.003
    };

    var transition2 = {
        method: "spring",
        period: 1500,
        dampingRatio: 0.5,
        velocity: 0.004
    };

    $scope.evt = new EventHandler();

    window.$famous = $famous;

    $scope.t = new Transitionable(0);
    
    $scope.iconT = [];
    for(var i = 0; i < 4; i++) {
      $scope.iconT.push(new Transitionable(0));
    }

    $scope.transitionStates = {
      screenTranslate: function() { return [$scope.t.get() * 620 - 310, 0, 0]; },
      clockTranslate: function() { return [0, 200 * $scope.t.get(), 0]; },
      iconTranslate: {
        0: function() { return [17, 550 - ( 70 * $scope.iconT[0].get() ), 0]; },
        1: function() { return [92, 550 - ( 70 * $scope.iconT[1].get() ), 0]; },
        2: function() { return [167, 550 - ( 70 * $scope.iconT[2].get() ), 0]; },
        3: function() { return [242, 550 - ( 70 * $scope.iconT[3].get() ), 0]; }
      }
    };
    
    $scope.flip = function(){
      console.log('flip');
      $famous.find('#flipper')[0].flip();
    }

    $scope.exampleIn1 = function (done) {
      $scope.t.set(0.5, transition, function() {
          console.log('screenTranslate finished');
      });
      for(var i = 0; i < $scope.iconT.length; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.iconT[i].set(1, transition2, function() {
              if(i === $scope.iconT.length-1) {
                console.log('i\'m done');
                done();
              }
            });
          }, 500 + (100 * i));
        })(i);
      }
    };
    $scope.exampleOut1 = function (done) {
      for(var i = 0; i < $scope.iconT.length; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.iconT[i].set(0, {
              curve: Easing.inBack,
              duration: 800
            }, function() {
              if(i === $scope.iconT.length-1) {
                console.log('i\'m done');
                $scope.t.set(1, transition, function() {
                  console.log('i\'m out');
                  done();
                });
              }
            });
          }, (50 * i) - 50);
        })(i);
      }
    };

    $scope.exampleIn2 = function (done) {
      $scope.t.set(0.5, transition, function() {
          console.log('screenTranslate finished');
      });
      for(var i = 0; i < $scope.iconT.length; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.iconT[i].set(1, transition2, function() {
              if(i === $scope.iconT.length-1) {
                console.log('i\'m done');
                done();
              }
            });
          }, 500 + (100 * i));
        })(i);
      }
    };
    $scope.exampleOut2 = function (done) {
      for(var i = 0; i < $scope.iconT.length; i++) {
        (function(i) {
          Timer.setTimeout(function() {
            $scope.iconT[i].set(0, {
              curve: Easing.inBack,
              duration: 800
            }, function() {
              if(i === $scope.iconT.length-1) {
                console.log('i\'m done');
                $scope.t.set(1, transition, function() {
                  console.log('i\'m out');
                  done();
                });
              }
            });
          }, (50 * i) - 50);
        })(i);
      }
    };

  window.flipperOut = $scope.outTransitionFunction;
});