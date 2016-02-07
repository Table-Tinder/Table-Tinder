(function () {

  angular
    .module('tableMates')
    .controller('appointmentsCtrl', appointmentsCtrl);

  appointmentsCtrl.$inject = ['$routeParams', 'api'];
  function appointmentsCtrl($routeParams, api) {
    var vm = this;

    api.allAppointments()
      .success(function(data) {
        vm.data = { appointments: data };
      })
      .error(function (e) {
        console.log(e);
      });

  }

})();
