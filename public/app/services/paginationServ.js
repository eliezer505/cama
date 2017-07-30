(function () {

angular.module('app')

.controller("AppCtrl", ["$scope", "$infiniteScroll", "$paginated",
	function ($scope, $firebaseArray, $paginated) {
		$scope.text = "Fire Event to load more data";		
		
		var ref = firebase.database().ref().child("pagination")
		$scope.array = $firebaseArray(ref, 5);
		$scope.page = $paginated(ref, 12);
	}
])





})(); 