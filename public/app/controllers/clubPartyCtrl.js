
angular.module('app').controller('clubPartyCtrl', 
function ($scope,$state,$mdDialog,$clubToast,clubesEvents) {
    $scope.clubes = clubesEvents;
        console.log($scope.clubes);
        
//        $scope.enterClub = function (clubPressed){
//
//        	 $state.go('club', {obj:clubPressed});
//        };



  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('היי, בחרת להרשם למסיבה, יש אישור?')
          .targetEvent(ev)
          .ok('!כן תרשמו אותי')
          .cancel('אחשוב על זה');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'ok.';
         $clubToast.show('הבקשה לרישום נשלחה', 'toaster-ancor', 'success');
    }, function() {
      $scope.status = 'no.';
         $clubToast.show('בקשה לרישום בוטלה', 'toaster-ancor', 'error');
    });
  };



  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});
  