(function(){
  angular
    .module('tableMates')
    .service('api', api);
  api.$inject = ['$http'];
  function api($http){
    var allAppointments = function(){
      return $http.get('http://newtablemates.azurewebsites.net/api/Appointment');
    };  
    return {
      allAppointments: allAppointments,
    };
  }
})();
