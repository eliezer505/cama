angular.module('app')

        .directive("scrollWithHeadline", function ($window) {
            return function (scope, element, attrs) {
                var header = document.querySelector('#managment-toolbar');
                var content = document.querySelector('#managment-content');
                console.log(header);
                console.log(content);
                element.bind('scroll', function () {
                    console.log('in scroll');
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