
angular.module('app').controller('managmentPartiesCtrl',
        function ($scope,currentEvents,$state) {


                    
			console.log(currentEvents);
      
            $scope.events = currentEvents;

            $scope.edit = function (id){
                console.log(id);
                $state.go('managment.event', {id: id});
            };

        });
  