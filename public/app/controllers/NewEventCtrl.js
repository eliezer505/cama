angular.module('app')
        .controller('NewEventCtrl', function ($scope, EVENTS, $state) {


            $scope.addEvent = function () {
                EVENTS.AddEvent($scope.event);
                $state.go('managment.parties');
            };

            $scope.event = {};
            $scope.event.minAge = 18;
            $scope.event.Price = 0;
            $scope.eventDate = new Date();

        });
