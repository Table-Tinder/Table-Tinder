(function(){
  angular.module('tableMates', ['ngRoute', 'ngSanitize']);

  function config ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/appointment', {
        templateUrl: '/appointments/appointments.view.html',
        controller: 'appointmentCtrl',
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
    .module('tableMates')
    .config(['$routeProvider', config]);
})();
