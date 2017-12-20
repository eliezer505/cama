var club = angular.module("app").config(function ($stateProvider, $urlRouterProvider) {
//
// For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //    $urlRouterProvider.when('clubears/main', '/clubears/main/clubes');
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
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    }

                }
            })
            .state('clubears.main', {

                url: "/main",
                abstract: true,
                templateUrl: "app/pages/clubears.main.html",
                controller: "mainCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    }
                }
            })
            .state('clubears.main.clubes', {
                url: "/clubes",
                templateUrl: "app/pages/clubears.main.clubes.html",
                controller: 'mainClubesCtrl',
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    clubesNearBy: function (CLUBES) {
                        return CLUBES.GetClubesNearBy();
                    }
                }
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
                controller: 'mainFavoritesCtrl',
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
                templateUrl: "app/pages/clubears.profile.html",
                controller: "profileCtrl",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    }
                }
            })
            .state('managment', {
                url: "/managment",
                templateUrl: "app/pages/managment.html",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    },
                    userClubesRoll: function (ROLES, currentAuth) {
                        return ROLES.getClubesUserAssign(currentAuth.uid);
                    },
                    clubesAssign: function (CLUBES, userClubesRoll) {
                        return CLUBES.getClubesUserAssign(userClubesRoll);
                    }
                },
                controller: "managmentCtrl"
            })
            .state('managment.parties', {
                url: "/parties",
                templateUrl: "app/pages/managment.parties.html",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    currentEvents: function (EVENTS, $stateParams, $q,$state) {
                        if (!$stateParams.clubId || !$stateParams.role) {
                            return $q.reject({code: 'MANAGMENT'});
//                          $state.go('managment');
                        } else
                            return EVENTS.GetFirstEvents($stateParams.clubId);
                    }
                },
                params: {
                    clubId: null,
                    role: null

                },
                controller: "managmentPartiesCtrl"
            })
            .state('managment.parties.newevent', {
                url: "/newevent",
                templateUrl: "app/pages/managment.parties.newevent.html",
                params: {
                    clubId: null,
                    role: null
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    isError: function ($stateParams, $q) {
                        if (!$stateParams.clubId || !$stateParams.role) {
                            return $q.reject({code: 'MANAGMENT'});
                        } else
                            return $q.resolve();
                    }
                },
                controller: "managmentNewEventCtrl"

            })
            .state('managment.parties.editevent', {
                url: "/editevent",
                templateUrl: "app/pages/managment.parties.editevent.html",
                controller: "managmentEditEventCtrl",
                params: {
                    eventId: null,
                    clubId: null,
                    role: null
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    currentEvent: function ($stateParams, EVENTS, $q) {
                        if (!$stateParams.clubId || !$stateParams.role) {
                            return $q.reject({code: 'MANAGMENT'});
                        } else
                            return EVENTS.GetOneEvent($stateParams.clubId, $stateParams.eventId);
                    }
                }
            })
            .state('managment.parties.panding', {
                url: "/editpanding",
                templateUrl: "app/pages/managment.parties.panding.html",
                controller: "managmentEditPandingCtrl",
                params: {
                    eventId: null,
                    clubId: null,
                    role: null
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    currentEvent: function ($stateParams, EVENTS, $q) {
                        if (!$stateParams.clubId || !$stateParams.role) {
                            return $q.reject({code: 'MANAGMENT'});
                        } else
                            return EVENTS.GetOneEvent($stateParams.clubId, $stateParams.eventId);
                    }
                }
            })
            .state('managment.profile', {
                url: "/profile",
                templateUrl: "app/pages/managment.profile.html",
                params: {
                    clubId: null,
                    role: null
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    currentClub: function ($stateParams, CLUBES, $q,$state) {
                        if (!$stateParams.clubId || !$stateParams.role) {
                            return $q.reject({code: 'MANAGMENT'});
//  $state.go('managment');
                        } else
                            return CLUBES.GetOneClub($stateParams.clubId);
                    },
                    clubPO: function ($stateParams, CLUBES, $q,$state) {
                        if (!$stateParams.clubId || !$stateParams.role) {
//                              $state.go('managment');
                            return $q.reject({code: 'MANAGMENT'});
                        } else
                            return CLUBES.GetClubPOActive($stateParams.clubId);
                    }
                },
                controller: "managmentProfileCtrl"
            })

            .state('superuser', {
                url: "/superuser",
                templateUrl: "app/pages/superuser.html",
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    }
                },
                controller: "superUserCtrl"
            })

            .state('managment.stats', {
                url: "/stats",
                templateUrl: "app/pages/managment.stats.html"

                        //
                        //      }
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
                templateUrl: "app/pages/clubears.club.html",
                controller: 'clubesCtrl',
                params: {
                    clubId: null
                },
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    },
                    userObj: function (USERS, currentAuth) {
                        return USERS.getUser(currentAuth.uid);
                    },
                    currentClub: function (CLUBES, $stateParams) {
                        return CLUBES.GetOneClub($stateParams.clubId);
                    },
                    clubesEvents: function (EVENTS, $stateParams) {
                        return EVENTS.GetFirstEvents($stateParams.clubId);
                    }
                }
            })
            .state('clubears.club.party', {
                url: "/club.party",
                templateUrl: "app/pages/clubears.club.party.html",
                controller: 'clubPartyCtrl',
                resolve: {
                    currentAuth: function (Auth) {
                        return Auth.$requireSignIn();
                    }
                }

            })
            .state('clubears.club.about', {
                url: "/club.about",
                templateUrl: "app/pages/clubears.club.about.html"
                        //      controller: clubAboutCtrl
                        //              function($scope) {
                        //        $scope.items = ["A", "List", "Of", "Items"];
                        //      }

            })
            .state('clubears.profileUpdate', {
                url: "/profileUpdate",
                templateUrl: "app/pages/clubears.profileUpdate.html"

                        //
                        //      }
            });
});
