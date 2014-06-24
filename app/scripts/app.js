angular.module('integrationApp',['famous.angular', 'ui.router','ngAnimate'])
  .config(function($famousStateProvider, $urlRouterProvider){
   // $urlRouterProvider.otherwise("/lock-screen");
    $famousStateProvider
      .state("lock-screen", {
       // url: "/lock-screen",
        templateUrl: "views/lock-screen.html"
      })
      .state("animate", {
        url: "/animate",
        templateUrl: "views/animate.html",
        controller: "AnimateCtrl"
      })
      .state("animations", {
       // url: "/animations",
        templateUrl: "views/animations.html", 
        controller: "AnimationsCtrl",
        inTransitionFrom : "inTransitionFunction($callback)",
        outTransitionTo: "outTransitionFunction($callback)"
      })
      .state("transitionables", {
      //  url: "/transitionables",
        templateUrl: "views/transitionables.html",
        controller: "TransitionablesCtrl"
      })
      .state("flipper", {
       // url: "/flipper",
        templateUrl: "views/flipper.html",
        controller: "FlipperCtrl",
        inTransitionFrom : "inTransitionFunction($callback)",
        outTransitionTo: "outTransitionFunction($callback)"
      })
      .state("example1" , {
        // url: "/example1",
        templateUrl: "views/example1.html",
        controller: "ExampleCtrl",
        inTransitionFrom: "exampleIn1($callback)",
        outTransitionTo: "exampleOut1($callback)"
      })
      .state("example2" , {
        // url: "/example2",
        templateUrl: "views/example2.html",
        controller: "ExampleCtrl",
        inTransitionFrom: "exampleIn2($callback)",
        outTransitionTo: "exampleOut2($callback)"
      })
      .state("flipper.demo", {
       // url: "/demo",
        templateUrl: "views/demo.html"
      })
      .state("ng-class", {
        //url: "/ng-class",
        templateUrl: "views/ng-class.html",
        controller: "NgClassCtrl"
      }) 
      .state("render-node", {
        // url: "/render-node",
        templateUrl: "views/render-node.html",
        controller: "RenderNodeCtrl"
      }) 
      .state("header-footer-layout", {
       // url: "/header-footer-layout",
        templateUrl: "views/header-footer-layout.html",
        controller: "HeaderFooterLayoutCtrl"
      }) 
      .state("flexible-layout", {
        url: "/flexible-layout",
        templateUrl: "views/flexible-layout.html",
        controller: "FlexibleLayoutCtrl"
      }) 
      .state("flipper", {
       // url: "/flipper",
        templateUrl: "views/flipper.html",
        controller: "FlipperCtrl"
      });
    })
  .controller('MainCtrl',function($scope, $famousState){
     $scope.changeState = function(state) {
        console.log('clicked');
        $famousState.go(state);
     }
  });
