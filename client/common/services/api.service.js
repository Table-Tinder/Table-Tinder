(function(){
  angular
    .module('tableMates')
    .service('api', api);

  api.$inject = ['$http'];
  function api($http){
    var allAppointments = function(){
      return $http.get('http://newtablemates.azurewebsites.net/api/Appointment');
    };
    var appointmentById = function (appointmentid){
      return $http.get('http://newtablemates.azurewebsites.net/api/Appointment/' + appointmentid);
    };
    var createAppointment = function(){
      return $http.post('http://newtablemates.azurewebsites.net/api/Appointment/');
    }
    return {
      allAppointments: allAppointments,
      appointmentById: appointmentById,
      createAppointment: createAppointment
    };
  }
})();
