(function () {

    angular.module('app')
            .service('$clubToast', function ($mdToast) {
                return {
                    show: function (content, parent) {
                        toastr.options = {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": true,
                            "onclick": null,
                            "showDuration": "800",
                            "hideDuration": "0",
                            "timeOut": "2000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        };
                        return toastr.success('Have fun storming the castle!', 'Miracle Max Says')


//                        return $mdToast.show({
//                            template: '<md-toast ng-class="{_md md-bottom:false}"><span>' + content + '</span></md-toast>',
//                            parent: parent,
//                            hideDelay: 400000,
//                            position: 'top'
//                        });
                    }
                };
            });
})(); 