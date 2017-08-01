angular.module('app')
        .controller('managmentEventCtrl', function ($scope, EVENTS, currentEvent, $state) {
            console.log('currentEvent in ctrl');
            console.log(currentEvent);

            $scope.check = function () {
                console.log($scope.eventForm.$pristine);
            };

            $scope.updateEvent = function () {
                console.log('in update');
                if (!$scope.eventForm.$pristine && $scope.eventForm.$valid) {
                    console.log('saving');
                    var hour = $scope.event.eTime.getHours();
                    var minute = $scope.event.eTime.getMinutes();
                    $scope.event.eDate.setHours(hour);
                    $scope.event.eDate.setMinutes(minute);
                    $scope.event.eDate = $scope.event.eDate.getTime();
                    $scope.event.$save();
                    $state.go('managment.parties');
                } else {
                    console.log('not saving');
                    $state.go('managment.parties');
                }
            };

            $scope.event = {};
            $scope.event = currentEvent;

//            $scope.event.minAge = currentEvent.minAge;
//            $scope.event.Price = currentEvent.Price;
            $scope.event.eDate = new Date(currentEvent.eDate);
            $scope.event.eTime = new Date(currentEvent.eDate);

        });
