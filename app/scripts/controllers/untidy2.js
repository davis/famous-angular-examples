'use strict';

angular.module('integrationApp')

.controller('UntidyCtrl2', function ($scope, $famous, $timeout) {
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
    screenOpacity: function() { return screenTransitionable.get(); },
    titleTranslate: [130, 35, 0],
    hamburgerTranslate: [-115, -230, 2],
    arrowTranslate: [115, -230, 2],
    searchTranslate: [0, -165, 4],
  };

  $scope.inTransitionFunction = function (done) {
    function _transition() {
      // set screen
      screenTransitionable.set(1, {
        curve: Easing.inOutSine,
        duration: 500
      }, function() {
          console.log('screenOpacitate finished');
      });
    }
    _transition();
  };

  // expose to window for test
  window.flipperOut = $scope.outTransitionFunction = function (done) {
    // // set bars
    // for(var i = 0; i < bars; i++) {
    //   (function(i) {
    //     Timer.setTimeout(function() {
    //       $scope.bars[i].transitionable.set(0, {
    //         curve: Easing.inBack,
    //         duration: 800
    //       }, function() {
    //         if(i+1 === bars) {
    //           console.log('i\'m done');
    //           // set screen
    //           screenTransitionable.set(0, {
    //             curve: Easing.inOutSine,
    //             duration: 500
    //           }, function() {
    //             console.log('i\'m out');
    //             done();
    //           });
    //         }
    //       });
    //     }, (50 * i) - 50);
    //   })(i);
    // }
  };

  $scope.flip=function(){}; // not sure if still needed

  // var _expanded = false;
  // window.expand = $scope.expand = function() {
  //   console.log('toggle expand');
  //   if(!_expanded) {
  //     barsTransitionable.set(1, {
  //       curve: Easing.outBack,
  //       duration: 250
  //     });
  //   } else {
  //     barsTransitionable.set(0, {
  //       curve: Easing.outBack,
  //       duration: 250
  //     });
  //   }

  //   _expanded = !_expanded;
  // }; 
});