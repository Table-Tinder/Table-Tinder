(function(){
  angular.
    module('tableMates')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {
    var vm = this;
    vm.title = "tableMates";
  }
})();
