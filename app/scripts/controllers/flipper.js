'use strict';
//adapted from @continuata's code at https://github.com/Famous/famous-angular/issues/72 
angular.module('integrationApp')
  .controller('FlipperCtrl', function ($scope, $famous) {
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Transform = $famous['famous/core/Transform'];

    $scope.evt = new EventHandler();

    window.$famous = $famous;
    
    $scope.flip = function(){
      console.log('flip');
      $famous.find('#flipper')[0].flip();
    }
    $scope.scale = new Transitionable(0);
    $scope.inTransitionFunction = function (callback) {
      $scope.scale.set(1,{duration: 1000, curve:'linear'},function() {
          console.log('i"m in');
          callback();
      });
    }


  }
);
