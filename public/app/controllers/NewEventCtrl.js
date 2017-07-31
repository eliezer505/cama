angular.module('app')
        .controller('NewEventCtrl', function ($scope, EVENTS, $state) {


            $scope.addEvent = function () {
                console.log('in add');
                if ($scope.eventForm.$valid) {
                    var hour = $scope.event.eTime.getHours();
                    var minute = $scope.event.eTime.getMinutes();
                    $scope.event.eDate.setHours(hour);
                    $scope.event.eDate.setMinutes(minute);
                    $scope.event.eDate = $scope.event.eDate.getTime();
                    EVENTS.AddEvent($scope.event);
                    $state.go('managment.parties');
                }
            };

            $scope.check = function () {
                console.log($scope.eventForm.lineName.$error);
                console.log($scope.eventForm.dateFormat.$error);
                console.log($scope.eventForm.timeFormat.$error);
                console.log($scope.eventForm.minAge.$error);
                console.log($scope.eventForm.Price.$error);
                console.log($scope.eventForm.description.$error);
                if ($scope.eventForm.$valid)
                    console.log('valid');
                else
                    console.log('not');
            };


            $scope.event = {};
            $scope.event.minAge = 18;
            $scope.event.Price = 0;
            $scope.eventDate = new Date();

        });
