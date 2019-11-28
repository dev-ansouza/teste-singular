(function()
{
    'use strict';

    /**
     * Controlador responsável pela interface principal do sistema.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('singular.ui').controller(
        'ui.UiCtrl',
        [
            '$scope',
            '$rootScope',
            '$state',
            '$localStorage',
            '$window',
            'SweetAlert',
            'ui.Session',
            'ui.Notification',
            UiCtrl
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $rootScope
     * @param $state
     * @param $localStorage
     * @param $window
     * @param SweetAlert
     * @param Session
     * @param Notification
     * @constructor
     */
    function UiCtrl(
        $scope,
        $rootScope,
        $state,
        $localStorage,
        $window,
        SweetAlert,
        Session,
        Notification
    ) {
        /**
         * Referência ao serviço de sessão.
         *
         * @type {Session}
         */
        $scope.session = Session;

        /**
         * Referência ao serviço de notificação.
         *
         * @type {Notification}
         */
        $scope.notification = Notification;

        /**
         * Objeto de referência à interface do usuário nas views.
         *
         * @type {Object}
         */
        $scope.ui = {};

        /**
         * Confirma e efetua o encerramento da sessão do usuário logado.
         */
        $scope.logout = function() {
            SweetAlert.swal({
                    title: "Sair",
                    text: "Deseja realmente sair do sistema?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim",
                    cancelButtonText: 'Não',
                    closeOnConfirm: false},
                function(confirm){
                    if (confirm){
                        Session.logout(function(){
                            self.location.reload();
                        });
                    }
                });
        };


        /*
         Exemplo de inclusão de notificação na pilha
        $scope.notification.addNotification({
            message: 'Notificação 1',
            date: new Date()
        });*/


    }

}());