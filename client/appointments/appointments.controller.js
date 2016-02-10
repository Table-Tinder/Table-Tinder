(function () {

  angular
    .module('tableMates')
    .controller('appointmentsCtrl', appointmentsCtrl);

  appointmentsCtrl.$inject = ['$routeParams', 'api', 'authentication'];
  function appointmentsCtrl($routeParams, api, authentication) {
    var vm = this;
    vm.currentUser = authentication.currentUser();
    api.allAppointments()
      .success(function(data) {
      var myAppArray = [];
      for (var i = 0; i < data.length; i++) {
        data[i].canAttend = true;
        for (var attendee in data[i].Attendees) {
          if (attendee.username == vm.currentUser.username) {
            data[i].canAttend = false;
          }
        }
        myAppArray.push(data[i]);
      }
      vm.data = { appointments: myAppArray };
      })
      .error(function (e) {
        console.log(e);
      });
    vm.attend = function(username, appoinmentid){
      api.attendAppointment(username, appointmentid);
    }
  }

})();
