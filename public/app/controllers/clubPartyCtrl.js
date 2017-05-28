
angular.module('app').controller('clubPartyCtrl', 
function ($scope,$state,$mdDialog) {
    $scope.clubes = [{id: 1, name: "אולטראסאונד", distance: 14.5, photo: "img/reg.png"},
        {id: 2, name: "חורבה", distance: 7.4, photo: "img/reg.png"},
        {id: 3, name: "לונה", distance: 2.5, photo: "img/reg.png"},
        {id: 4, name: "הספרייה", distance: 9.3, photo: "img/reg.png"}];
        
        
        $scope.enterClub = function (clubPressed){

        	 $state.go('club', {obj:clubPressed});
        };



  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('היי, בחרת להרשם למסיבה, יש אישור?')
          .targetEvent(ev)
          .ok('!כן תרשמו אותי')
          .cancel('אחשוב על זה');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
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
  