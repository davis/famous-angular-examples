'use strict';

//

angular.module('integrationApp')

.controller('UntidyMenuCtrl', function($scope, $famous, $timeout, $famousState) {
  var Transitionable   = $famous['famous/transitions/Transitionable'];
  var SpringTransition = $famous['famous/transitions/SpringTransition'];
  var EventHandler     = $famous['famous/core/EventHandler'];
  var Transform        = $famous['famous/core/Transform'];
  var Easing           = $famous['famous/transitions/Easing'];
  var Timer            = $famous['famous/utilities/Timer'];

  Transitionable.registerMethod('spring', SpringTransition);
  $scope.evt = new EventHandler();

  // TODO: make this work
  $scope.collapse = function() {
    $famousState.go('untidy1');
  };

  // make some useful transitions available
  var TRANSITIONS = {
    inBack800:  { curve: Easing.inBack, duration: 800 },
    outBack800: { curve: Easing.outBack, duration: 800 }
  };

  // intialize transitionables
  var t9ables = {
    menuTranslate: new Transitionable(0)
  };

  // states used by template
  $scope.states = {
    menuTranslate: function() { return [-285 + 226*t9ables.menuTranslate.get(), 0, 0]; },
    xRotate: function() { return 720 * t9ables.menuTranslate.get(); },
    xTranslate: [100, 0 , 0]
  };

  // in transitions
  $scope.from = {
    untidy1: function(done) {
      t9ables.menuTranslate.set(1, TRANSITIONS.outBack800, function() {
        done();
      });
    },
    default: function (done) { done(); }
  };

  // out transitions
  $scope.to = {
    untidy1: function(done) {
      t9ables.menuTranslate.set(0, TRANSITIONS.inBack800, function() {
        done();
      });
    },
    default: function (done) {}
  };
});