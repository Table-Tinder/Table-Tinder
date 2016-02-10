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
    var createAppointment = function(data){
      return $http.post('http://newtablemates.azurewebsites.net/api/Appointment', data);
    };
    var attendAppointment = function(username, appoinmentid){
      return $http.put('http://newtablemates.azurewebsites.net/api/Appointment/Attend?id='+ appoinmentid + '&attendeeName=' + username);
      // http://newtablemates.azurewebsites.net/api/Appointment/Attend?id=1&attendeeName=testuser2
    };
    return {
      allAppointments: allAppointments,
      appointmentById: appointmentById,
      createAppointment: createAppointment,
      attendAppointment: attendAppointment
    };
  }
})();
