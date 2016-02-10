(function () {

  angular
    .module('tableMates')
    .controller('appointmentsCtrl', appointmentsCtrl);

  appointmentsCtrl.$inject = ['$routeParams', 'api', 'authentication', '$location'];
  function appointmentsCtrl($routeParams, api, authentication, $location) {
    var vm = this;
    vm.currentUser = authentication.currentUser();
    api.allAppointments()
      .success(function(data) {
      var myAppArray = [];
      for (var i = 0; i < data.length; i++) {
        data[i].canAttend = true;
        for (var attendee in data[i].Attendees) {
          if (data[i].Attendees[attendee].username == vm.currentUser.name) {
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
    vm.attend = function(appointmentid){
      console.log(appointmentid);
      api.attendAppointment(vm.currentUser.name, appointmentid);
      $location.path('/myAppointments');
    }
  }

})();
