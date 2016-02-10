(function () {

  angular
    .module('tableMates')
    .controller('myAppointmentsCtrl', myAppointmentsCtrl);

  myAppointmentsCtrl.$inject = ['$routeParams', 'api', 'authentication'];
  function myAppointmentsCtrl($routeParams, api, authentication) {
    var vm = this;
    vm.currentUser = authentication.currentUser();
    api.allAppointments()
      .success(function(data) {
        var myAppArray = [];
        for (var i = 0; i < data.length; i++) {
          for (var attendee in data[i].Attendees) {
            console.log(data[i].Attendees[attendee]);
            if (data[i].Attendees[attendee].username == vm.currentUser.name) {
              myAppArray.push(data[i]);
            }
          }
        }
        vm.data = { appointments: myAppArray };
      })
      .error(function (e) {
        console.log(e);
      });

  }

})();
