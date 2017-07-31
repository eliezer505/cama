angular.module('app')
        .controller('NewEventCtrl', function ($scope, EVENTS, $state) {


            $scope.addEvent = function () {
                console.log('in add');
                var hour =  $scope.event.eTime.getHours();
                var minute = $scope.event.eTime.getMinutes();
                $scope.event.eDate.setHours(hour);
                $scope.event.eDate.setMinutes(minute);            
                $scope.event.eDate =  $scope.event.eDate.getTime();                      
                EVENTS.AddEvent($scope.event);
                $state.go('managment.parties');
            };

            $scope.event = {};
            $scope.event.minAge = 18;
            $scope.event.Price = 0;
            $scope.eventDate = new Date();

        });
