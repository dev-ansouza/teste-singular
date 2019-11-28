(function()
{
    'use strict';

    /**
     * Módulo do Singular.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module(
        'singular',
        [
            'toastr'
        ]
    )

    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 0,
            timeOut: 5000,
            extendedTimeOut: 1000,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: true,
            progressBar: true,
            tapToDismiss: true,
            target: 'body'
        });
    });
}());