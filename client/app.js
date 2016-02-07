(function(){
  angular.module('tableMates', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider){
    $routeProvider
      .when('/angular', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/appointment/:id', {
        templateUrl: '/appointmentDetail/appointmentDetail.view.html',
        controller: 'appointmentDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('loc8rApp')
    .config(['$routeProvider', config]);
})();
