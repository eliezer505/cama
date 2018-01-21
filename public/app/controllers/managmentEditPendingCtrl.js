angular.module('app')

        .controller('managmentEditPendingCtrl', function ($scope, usersInEvent, $state, $stateParams, $clubToast, $mdDialog, EVENTS, ModalService) {

            console.log(usersInEvent);
            $scope.users = usersInEvent;
            $scope.isOpen = false;
            $scope.all = false;
            $scope.updated = false;
            $scope.isFilterOpen = false;
            $scope.countt = 0;
            $scope.graph = {};

            $scope.openModal = openModal;
            $scope.closeModal = closeModal;


            $scope.config = {
                visible: true, // default: true
                extended: true // default: false

            };

            $scope.options = {
                chart: {
                    type: 'pieChart',
                    height: 250,
                    valueFormat: function (d) {
                        return d3.format('.2%')(d / totalValues);
                    },
                    x: function (d) {
                        return d.label;
                    },
                    y: function (d) {
                        return d.value;
                    },
                    showValues: true, //Display pie labels
                    legendPosition: 'bottom',
                    useInteractiveGuideline: true,
                    labelType: 'percent', //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: false,
                    title: true,
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5
                    },
                    noData: null,
                    showLegend: true,
                    defaultState: null,
                    labelsOutside: false,
                    legend: {
                        vers: "classic",
                    }
                },
                title: {
                    enable: true,
                    text: "יחס הרשמה נשים גברים",
                    className: "h4",
                    css: {
                        width: "nullpx",
                        textAlign: "center"
                    }
                }

            };


            function openModal(id) {
                ModalService.Open(id);
            }

            function closeModal(id) {
                ModalService.Close(id);
            }


            $scope.cancel = function () {
                $scope.users.forEach(function (user) {
                    console.log(user);
                    if (!user.sent && user.approved) {
                        user.approved = false;
                        $scope.users.$save(user);
                    }
                });

                $scope.$parent.partiesShow = true;
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});

                $clubToast.show('הרשימות לא עודכנו', 'managment-content', 'error');
            };

            $scope.updatePendingUsers = function ()
            {
                $scope.users.forEach(function (user) {
                    if (!user.sent && user.approved) {
                        user.sent = true;
                        $scope.users.$save(user);
                    }
                });
                $scope.$parent.partiesShow = true;
                $state.go('managment.parties', {clubId: $stateParams.clubId, role: $stateParams.role});

                $clubToast.show('הרשימות עודכנו', 'managment-content', 'error');
            };


            $scope.changeState = function (user)
            {
                console.log(user);
                console.log($scope.users);
                if (user.approved)
                    $scope.updated = true;
                else
                    $scope.updated = false;
                $scope.users.$save(user);
            };



            $scope.checkAll = function ()
            {
                var count = 0;
                if (!$scope.all)
                {

                    $scope.users.forEach(function (user) {
                        if (!user.approved) {
                            user.approved = true;
                            $scope.users.$save(user);
                            count++;
                        }
                    });
                    $scope.all = true;
                    $scope.updated = true;
                    $clubToast.show('סומנו ' + count + ' בליינים', 'toast-content', 'success');
                } else
                {
                    $scope.users.forEach(function (user) {
                        if (!user.sent) {
                            user.approved = false;
                            $scope.users.$save(user);
                            count++;
                        }
                    });
                    $scope.all = false;
                    $scope.updated = false;
                    $clubToast.show('הוסרו ' + count + ' בליינים', 'toast-content', 'success');
                }
            };

            $scope.chart = function ()
            {

                EVENTS.GetOneEvent($stateParams.clubId, $stateParams.eventId).then(function (data) {
                    $scope.data = [
                        {
                            label: "נשים",
                            value: data.pending.female,
                            color: "#ff4d6a"
                        },
                        {
                            label: "גברים",
                            value: data.pending.male,
                            color: "#4d94ff"
                        }
                    ];

                    $scope.data1 = [
                        {
                            label: "נשים",
                            value: data.approved.female,
                            color: "#ff4d6a"
                        },
                        {
                            label: "גברים",
                            value: data.approved.male,
                            color: "#4d94ff"
                        }
                    ];


                });



//                $scope.graph.maleSigned = 10;
//                $scope.graph.femaleSigned = 6;
//                $scope.graph.maleApproved = 5;
//                $scope.graph.femaleApproved = 6;
//
//                $scope.labels = ["גברים רשומים", "נשים רשומות"];
//                $scope.data = [$scope.graph.maleSigned, $scope.graph.femaleSigned];
                $scope.openModal('pending-gender-graphs');
            };


            $scope.filterByFemale = function ()
            {

                EVENTS.GetUsersInEventByFemale($stateParams.clubId, $stateParams.eventId).then(function (data) {
                    $scope.users = data;
                });

            };

            $scope.filterByMale = function ()
            {

                EVENTS.GetUsersInEventByMale($stateParams.clubId, $stateParams.eventId).then(function (data) {
                    $scope.users = data;
                });

            };

            $scope.filterAll = function ()
            {

                EVENTS.GetUsersInEvent($stateParams.clubId, $stateParams.eventId).then(function (data) {
                    $scope.users = data;
                });

            };

            $scope.showConfirm = function (ev, user) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm({
                    controller: AvatarCtrl,
                    templateUrl: 'app/templete/avatar.tmpl.html',
                    parent: angular.element(document.body),
                    locals: {
                        User: user
                    },
                    targetEvent: ev
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.status = 'Confirm resolved';
                    $scope.codeRunningBeforeResolve = 'code only runs after resolve';
                });

                $scope.codeRunningBeforeResolve = 'code is running before resolve!';
            };
        });



function AvatarCtrl($scope, $mdDialog, User) {
    $scope.User = User;
    console.log(User);
    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
