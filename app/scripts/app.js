angular.module('integrationApp',['famous.angular', 'ui.router', 'ngAnimate'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/lock-screen");
    $stateProvider
      .state("lock-screen", {
        url: "/lock-screen",
        templateUrl: "views/lock-screen.html"
      })
      .state("animations", {
        url: "/animations",
        templateUrl: "views/animations.html",
        controller: "AnimationsCtrl"
      })
      .state("transitionables", {
        url: "/transitionables",
        templateUrl: "views/transitionables.html",
        controller: "TransitionablesCtrl"
      })
      .state("demo", {
        url: "/demo",
        templateUrl: "views/demo.html"
      })
      .state("ng-class", {
        url: "/ng-class",
        templateUrl: "views/ng-class.html",
        controller: "NgClassCtrl"
      }) 
      .state("flipper", {
        url: "/flipper",
        templateUrl: "views/flipper.html",
        controller: "FlipperCtrl"
      });
    });