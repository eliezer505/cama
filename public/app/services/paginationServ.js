(function () {

    angular.module('app').
            service("pagination", function () {

                var options = {};
                var ref = null;
                var paginator = null;

                this.init = function (refVar, pageSize) {
                    options = {
                        pageSize: pageSize,
                        finite: true,
                        retainLastPage: false
                    };
                    ref = refVar;
                    paginator = new FirebasePaginator(ref, options);
                };

                this.getPaginator = function()
                {
                    return paginator;
                };
                
                this.next = function()
                {
                    paginator.next();
                    return this.getPaginator();
                };
                
                this.prev = function()
                {
                    paginator.previous();
                    return this.getPaginator();
                    
                };



                console.log(paginator);

            });
})(); 