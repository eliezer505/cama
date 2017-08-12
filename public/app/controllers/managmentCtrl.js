angular
        .module('app')
        .controller('managmentCtrl', function ($state,clubesAssign) {
            
            console.log(clubesAssign);
            $state.go('managment.parties');


        });


