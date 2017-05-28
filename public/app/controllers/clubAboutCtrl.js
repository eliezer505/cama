
angular.module('app').controller('clubAboutCtrl', 
function ($scope,$state) {
    $scope.clubes = [{id: 1, name: "אולטראסאונד", distance: 14.5, photo: "img/avatar.png"},
        {id: 2, name: "חורבה", distance: 7.4, photo: "img/avatar.png"},
        {id: 3, name: "לונה", distance: 2.5, photo: "img/avatar.png"},
        {id: 4, name: "הספרייה", distance: 9.3, photo: "img/avatar.png"}];
        
        
        $scope.enterClub = function (clubPressed){

        	 $state.go('club', {obj:clubPressed});
        };

});
  