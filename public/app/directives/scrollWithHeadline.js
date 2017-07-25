angular.module('app')

        .directive("scrollWithHeadline", function ($window) {
            return function (scope, element, attrs) {
                var header = document.querySelector('#managment-toolbar');
                var content = document.querySelector('#managment-content');

                element.bind('scroll', function () {
                    var recTool = header.getBoundingClientRect();                 
                    var recCont = content.getBoundingClientRect();

                    if (recTool.bottom !== recCont.top) {
                        scope.boolChangeClass = true;
                    } else {
                        scope.boolChangeClass = false;
                    }
                    scope.$apply();
                });
            };
        });