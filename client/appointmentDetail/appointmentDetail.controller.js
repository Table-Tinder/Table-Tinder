(function () {

  angular
    .module('tableMates')
    .controller('appointmentDetailCtrl', appointmentDetailCtrl);

  appointmentDetailCtrl.$inject = ['$routeParams', 'api'];
  function appointmentDetailCtrl($routeParams, api) {
    var vm = this;
    vm.appointmentid = $routeParams.appointmentid;
    api.appointmentById(vm.appointmentid)
      .success(function(data) {
        vm.data = { appointment: data };
      })
      .error(function (e) {
        console.log(e);
      });

  }

})();
