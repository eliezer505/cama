angular.module('app')

        .directive("scrollHeadlineClubes", function ($window) {
            return function (scope, element, attrs) {
                var header = document.querySelector('#clubes-toolbar');
                var content = document.querySelector('#clubes-content');
                var last = document.querySelector('.club-hr-bottom');

                console.log(header);
                console.log(content);
                console.log(last);
                element.bind('scroll', function () {
                    last = document.querySelector('.club-hr-bottom');

                    var recTool = header.getBoundingClientRect();
                    var recCont = content.getBoundingClientRect();
                    var recLast = last.getBoundingClientRect();
                    console.log(recTool);
                    console.log(recCont);
                    console.log(recLast);

                    if (recCont.bottom >= recLast.top)

                    {
                        console.log('in bottom');
                        scope.clubes.$scroll();
                    }

                    if (recTool.bottom !== recCont.top) {
                        scope.boolChangeClass = true;
                    } else {
                        scope.boolChangeClass = false;
                    }
                    scope.$apply();
                });
            };
        });