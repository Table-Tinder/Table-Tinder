(function(){
  angular.module('tableMates', ['ngRoute', 'ngSanitize']);

  function config ($routeProvider, $httpProvider){
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
        controller: 'appointmentsCtrl',
        controllerAs: 'vm'
      })
      .when('/appointment/:appointmentid', {
        templateUrl: '/appointmentDetail/appointmentDetail.view.html',
        controller: 'appointmentDetailCtrl',
        controllerAs: 'vm'
      })
      .when('/create', {
        templateUrl: '/appointmentCreate/appointmentCreate.view.html',
        controller: 'appointmentCreateCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // $httpProvider.defaults.headers.common = {};
    // $httpProvider.defaults.headers.post = {};
    // $httpProvider.defaults.headers.put = {};
    // $httpProvider.defaults.headers.patch = {};
  }

  angular
    .module('tableMates')
    .config(['$routeProvider', '$httpProvider', config]);
})();
