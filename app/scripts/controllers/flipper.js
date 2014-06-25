'use strict';

//adapted from @continuata's code at https://github.com/Famous/famous-angular/issues/72

angular.module('integrationApp')

.controller('FlipperCtrl', function ($scope, $famous, $timeout) {
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
      method: "spring",  period: 1500,
      dampingRatio: 0.5, velocity: 0.004
  };

  $scope.evt = new EventHandler();

  var screenTransitionable = new Transitionable(0);
  var clockTransitionable  = new Transitionable(0);

  $scope.transitionStates = {
    screenTranslate: function() { return [620 * screenTransitionable.get() - 310, 0, 0]; },
    clockTranslate: function() { return [0, 200 * clockTransitionable.get(), 0]; },
  };

  // define icons
  var icons = 4;
  $scope.icons = {};
  for(var i = 0; i < icons; i++) {
    (function(i){
      $scope.icons[i] = {};
      $scope.icons[i].transitionable = new Transitionable(0);
      $scope.icons[i].translate = function() {
        return [75 * i + 17, 550 - ( 70 * $scope.icons[i].transitionable.get() ), 0];
      };
    })(i);
  }
  // icon bg colors
  $scope.icons[0].bgCol = '#FA726C';
  $scope.icons[1].bgCol = '#BAD174';
  $scope.icons[2].bgCol = '#3BA686';
  $scope.icons[3].bgCol = '#5F6F8C';

  // icon icons
  $scope.icons[0].icon = 'fa fa-phone';
  $scope.icons[1].icon = 'fa fa-envelope';
  $scope.icons[2].icon = 'fa fa-cloud';
  $scope.icons[3].icon = 'fa fa-camera';

  $scope.inTransitionFunction = function (done) {
    // set screen
    screenTransitionable.set(0.5, springTransition1, function() {
        console.log('screenTranslate finished');
    });
    // set icons
    for(var i = 0; i < icons; i++) {
      (function(i) {
        Timer.setTimeout(function() {
          $scope.icons[i].transitionable.set(1, springTransition2, function() {
            if(i+1 === icons) {
              console.log('i\'m done');
              done();
            }
          });
        }, 500 + (100 * i));
      })(i);
    }
  };

  // expose to window for test
  window.flipperOut = $scope.outTransitionFunction = function (done) {
    // set icons
    for(var i = 0; i < icons; i++) {
      (function(i) {
        Timer.setTimeout(function() {
          $scope.icons[i].transitionable.set(0, {
            curve: Easing.inBack,
            duration: 800
          }, function() {
            if(i+1 === icons) {
              console.log('i\'m done');
              // set screen
              screenTransitionable.set(1, {
                curve: Easing.inOutSine,
                duration: 400
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

  $scope.flip = function() {
    console.log('flip');
    $famous.find('#flipper')[0].flip();
  }; // not sure if still needed
});