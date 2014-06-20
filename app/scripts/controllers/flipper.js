'use strict';
//adapted from @continuata's code at https://github.com/Famous/famous-angular/issues/72 
angular.module('integrationApp')
  .controller('FlipperCtrl', function ($scope, $famous) {
    var EventHandler = $famous['famous/core/EventHandler'];

    $scope.evt = new EventHandler();

    window.$famous = $famous;
    
    $scope.flip = function(){
      console.log('flip');
      $famous.find('#flipper')[0].flip();
    }

  }
);
