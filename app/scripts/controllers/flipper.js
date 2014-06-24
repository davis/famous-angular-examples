'use strict';
//adapted from @continuata's code at https://github.com/Famous/famous-angular/issues/72 
angular.module('integrationApp')
  .controller('FlipperCtrl', function ($scope, $famous) {
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Transform = $famous['famous/core/Transform'];
    var Easing = $famous['famous/transitions/Easing'];

    var SpringTransition = $famous['famous/transitions/SpringTransition'];

    Transitionable.registerMethod('spring', SpringTransition);
    var transition = {
        method: "spring",
        period: 1500,
        dampingRatio: 0.6,
        velocity: 0
    };

    $scope.evt = new EventHandler();

    window.$famous = $famous;
    
    $scope.flip = function(){
      console.log('flip');
      $famous.find('#flipper')[0].flip();
    }

    $scope.trans = new Transitionable(0);
    $scope.inTransitionFunction = function (callback) {
      $scope.trans.set(1, transition, function() {
          console.log('i"m in');
          callback();
      });
    };
    $scope.outTransitionFunction = function (callback) {
      $scope.trans.set(0, {duration: 1000, curve:'linear'}, function() {
          console.log('i\'m out');
          callback();
      });
    };


  }
);
