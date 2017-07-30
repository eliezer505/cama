
angular.module('app').controller('managmentPartiesCtrl',
        function ($scope,currentEvents) {


                    
			console.log(currentEvents);
      
            $scope.events = currentEvents;



        });
  