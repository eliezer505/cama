angular.module('app')

.factory("$infiniteScroll", ["$firebaseArray", "$rootScope",
	function ($firebaseArray, $rootScope) {
		return function (ref, pageMax) {
			var main;
			var current = pageMax;
			console.log(ref);
			console.log(ref.limitToFirst(pageMax));
             
			var result = $firebaseArray(ref.limitToFirst(pageMax)).$loaded();
			result.$scroll = function () {
				if (result.length < current) return false;
				if (main) {
					main.off("child_added");
					main.off("child_removed");
					main.off("child_changed");
					main.off("child_moved");
				}
				current += pageMax;
				console.log(current);
				main = ref.database.ref().child(ref.path.toString()).limitToFirst(current);
				main.on("child_added", function ($snapshot, $prev) { if (result.$$added($snapshot, $prev)) { result.$$process("child_added", result.$$added($snapshot, $prev), $prev); $rootScope.$digest(); } });
				main.on("child_removed", function ($snapshot, $prev) { if (result.$$removed($snapshot)) { result.$$process("child_removed", result.$getRecord($snapshot.getKey())); $rootScope.$digest(); } });
				main.on("child_changed", function ($snapshot, $prev) { if (result.$$updated($snapshot)) { result.$$process("child_changed", result.$getRecord($snapshot.getKey())); $rootScope.$digest(); } });
				main.on("child_moved", function ($snapshot, $prev) { if (result.$$moved($snapshot, $prev)) { result.$$process("child_moved", result.$getRecord($snapshot.getKey()), $prev); $rootScope.$digest(); } });
			};
			
			return result;
		};
	}
]);