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
  $scope.evt = new EventHandler();

  window.flip = $scope.flip = function() {
    console.log('flip');
    $famous.find('#flipper')[0].flip();
  };

  // make some useful transitions available
  var TRANSITIONS = {
    inBack800:         { curve: Easing.inBack, duration: 800 },
    inOutSine500:      { curve: Easing.inOutSine, duration: 500 },
    outBack250:        { curve: Easing.outBack, duration: 250 },
    springTransition:  { method: "spring", period: 1500, dampingRatio: 0.8, velocity: 0.003 },
    springTransition2: { method: "spring", period: 1500, dampingRatio: 0.8, velocity: 0.004 }
  };

  // initialize transitionables
  var t9ables = {
    screenTranslate: new Transitionable(0),
    clocktranslate:  new Transitionable(0)
  };

  // states used by template
  $scope.states = {
    screenTranslate: function() { return [620 * t9ables.screenTranslate.get() - 310, 0, 2]; },
    clockTranslate: function() { return [0, 200 * t9ables.clocktranslate.get(), 2]; },
  };

  // define icons
  var icons = 4;
  $scope.icons = {};
  for(var i = 0; i < icons; i++) {
    (function(i){
      $scope.icons[i] = {
        X: 75*i + 17,
        Y: new Transitionable(0),
        translate: function() {
          return [$scope.icons[i].X, 550 - ( 70 * $scope.icons[i].Y.get() ), 2];
        }
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
    Timer.setTimeout(function() {
      // set screen
      t9ables.screenTranslate.set(0.5, TRANSITIONS.springTransition, function() {
        // set icons
        for(var i = 0; i < icons; i++) {
          (function(i) {
            Timer.setTimeout(function() {
              $scope.icons[i].Y.set(1, TRANSITIONS.springTransition2, function() {
                if(i === icons-1) done();
              });
            }, 100*i);
          })(i);
        }
      });
    }, 800);
  };

  $scope.outTransitionFunction = function (done) {
    // set icons
    for(var i = 0; i < icons; i++) {
      (function(i) {
        Timer.setTimeout(function() {
          $scope.icons[i].Y.set(0, TRANSITIONS.inBack800, function() {
            if(i === icons-1) {
              // set screen after last icon is done transitioning
              t9ables.screenTranslate.set(1, TRANSITIONS.inOutSine500, function() {
                done();
              });
            }
          });
        }, 50*i - 50);
      })(i);
    }
  };
});