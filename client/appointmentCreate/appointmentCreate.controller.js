(function () {

  angular
    .module('tableMates')
    .controller('appointmentCreateCtrl', appointmentCreateCtrl);

  appointmentCreateCtrl.$inject = ['api', '$location'];
  function appointmentCreateCtrl(api, $location) {
    var vm = this;
    vm.submit = function () {
      vm.formError = "";
      if (!vm.formData.AppointmentName || !vm.formData.MinAttendees || !vm.formData.RestaurantName || !vm.formData.AppointmentDate || !vm.formData.Lat || !vm.formData.Lng) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.makeAppointment(vm.formData);
      }
    };

    vm.makeAppointment = function(formData){
      console.log("Username field is being set to: " + formData.Attendee);
      api.createAppointment({
        //send object with all formData
        Lat: formData.Lat,
        Lng: formData.Lng,
        MinAttendees: formData.MinAttendees,
        MaxAttendees: formData.MaxAttendees,
        AppointmentName: formData.AppointmentName,
        RestaurantName: formData.RestaurantName,
        AppointmentDate: formData.AppointmentDate
      })
        .success(function(data){
          console.log("it worked! you posted this data: \n" + data);
          $location.path('/#/appointment');
        })
        .error(function(data){
          console.log("Something went wrong");
          vm.formError = "Your data didn't post, please try again."
        });
      return false;
    }
  }

})();
