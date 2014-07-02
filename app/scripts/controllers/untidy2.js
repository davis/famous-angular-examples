'use strict';

//

angular.module('integrationApp')

.controller('UntidyCtrl2', function($scope, $famous, $timeout, $famousState) {
  var Transitionable   = $famous['famous/transitions/Transitionable'];
  var SpringTransition = $famous['famous/transitions/SpringTransition'];
  var EventHandler     = $famous['famous/core/EventHandler'];
  var Transform        = $famous['famous/core/Transform'];
  var Easing           = $famous['famous/transitions/Easing'];
  var Timer            = $famous['famous/utilities/Timer'];

  Transitionable.registerMethod('spring', SpringTransition);
  $scope.evt = new EventHandler();

  // make some useful transitions available
  var TRANSITIONS = {
    inBack800:        { curve: Easing.inBack, duration: 800 },
    inOutSine500:     { curve: Easing.inOutSine, duration: 500 },
    outBack250:       { curve: Easing.outBack, duration: 250 },
    springTransition: { method: "spring", period: 1300, dampingRatio: 0.8, velocity: 0.004 }
  };

  var t9ables = {
    screenOpacity: new Transitionable(0),
    screenScale:   new Transitionable(0)
  };

  $scope.states = {
    screenOpacity: function() { return t9ables.screenOpacity.get(); },
    screenScale: function() { return [t9ables.screenScale.get(), t9ables.screenScale.get(), 1]; },
    titleTranslate: [130, 35, 0],
    hamburgerTranslate: [-115, -230, 0],
    arrowTranslate: [115, -230, 0],
    searchTranslate: [0, -165, 0],
    loadingTranslate: [0, 0, 0]
  };

  // in transitions
  $scope.from = {
    untidy1: function(done) {
      // initialize
      t9ables.screenScale.set(1); // TODO: find some better way to 'initialize'

      // set screen
      t9ables.screenOpacity.set(1, TRANSITIONS.inOutSine500, function(){
        done();
        Timer.setTimeout(function() {
          $famousState.go('untidy1');
        }, 2000);
      });
    },
    default: function(done) {
      // initialize
      t9ables.screenOpacity.set(1);

      Timer.setTimeout(function() {
        // set screen
        t9ables.screenScale.set(1, TRANSITIONS.inOutSine500, function() {
          done();
        });
      }, 1000);
    }
  };

  // out transitions
  $scope.to = {
    untidy1: function(done) {
      Timer.setTimeout(function() {
        t9ables.screenOpacity.set(0, TRANSITIONS.inOutSine500, function() {
          done();
        });
      }, 0);
    },
    default: function(done) {
      Timer.setTimeout(function() {
        // set screen
        t9ables.screenScale.set(0, TRANSITIONS.inOutSine500, function() {
          done();
        });
      }, 800);
    }
  };
});