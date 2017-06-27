var club = angular.module("app").config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    $stateProvider

            .state('login', {
                url: "/login",
                templateUrl: "app/pages/login.html",
                controller: "loginCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$waitForSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        if (currentAuth && currentAuth.uid)
                            return USERS.getUser(currentAuth.uid);
                        else
                            return null;
                    }
                }

            })
            .state('phone', {
                url: "/phone",
                templateUrl: "app/pages/phone.html",
                controller: "phoneCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    }
                }
            })
            .state('clubears', {
                url: "/clubears",
                abstract: true,
                templateUrl: "app/pages/clubears.html",
                controller: "clubearsCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    }
                }
            })
            .state('clubears.main', {

                url: "",
                templateUrl: "app/pages/clubears.main.html",
                controller: "mainCtrl",
                onEnter: function ($state) {
                    $state.go('clubears.main.clubes');
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    }
                }
            })

            .state('clubears.main.clubes', {
                url: "/main",
                templateUrl: "app/pages/clubears.main.clubes.html"
                        //      controller: mainClubesCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }
            })
            .state('clubears.main.search', {
                url: "/search",
                templateUrl: "app/pages/clubears.main.search.html"
                        //      controller: mainClubesCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }
            })
            .state('clubears.main.favorites', {
                url: "/favorites",
                templateUrl: "app/pages/clubears.main.favorites.html"
                        //      controller: mainClubesCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }
            })
            .state('friends', {
                url: "/friends",
                templateUrl: "app/pages/friends.html",
                controller: "friendsChatCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    }
                }
            })
            .state('space', {
                url: "/space",
                templateUrl: "app/pages/space.html"
                        //      controller: mainClubesCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }
            })
            .state('space.gallery', {
                url: "/space.gallery",
                templateUrl: "app/pages/space.gallery.html"

                        //
                        //      }
            })
            .state('space.boys', {
                url: "/space.boys",
                templateUrl: "app/pages/space.boys.html"

                        //
                        //      }
            })
            .state('space.girls', {
                url: "/space.girls",
                templateUrl: "app/pages/space.girls.html"

                        //
                        //      }
            })
            .state('clubears.profile', {
                url: "/profile",
                templateUrl: "app/pages/profile.html",
                controller: "profileCtrl",

                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                            return Auth.$requireSignIn();

                        }],
                    "userObj": function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    }
                }
            })
            .state('clubears.events', {
                url: "/events",
                templateUrl: "app/pages/events.html"

                        //
                        //      }
            })
            .state('clubears.pictures', {
                url: "/pictures",
                templateUrl: "app/pages/pictures.html"

                        //
                        //      }
            })
            .state('profile.images', {
                url: "/profile.images",
                templateUrl: "app/pages/profile.images.html"

                        //
                        //      }
            })
            .state('clubears.club', {
                url: "/club",
                templateUrl: "app/pages/club.html",
                onEnter: function ($state) {
                    $state.go('clubears.club.party');
                }
            })
            .state('clubears.club.party', {
                url: "/club.party",
                templateUrl: "app/pages/club.party.html"
                        //      controller: clubPartyCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }
            })
            .state('clubears.club.about', {
                url: "/club.about",
                templateUrl: "app/pages/club.about.html"
                        //      controller: clubAboutCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }

            })
            .state('profileUpdate', {
                url: "/profileUpdate",
                templateUrl: "app/pages/profileUpdate.html"

                        //
                        //      }
            });

}); 