(function()
{
    'use strict';

    /**
     * Controlador responsável pela visualização do registro de usuário.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.ShowCtrl',
        [
            '$scope'
            ,'$stateParams'
            ,'usuario.UsuarioService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param $stateParams
     * @param UsuarioService
     * @constructor
     */
    function Controller(
         $scope
        ,$stateParams
        ,UsuarioService
    ) {
        /**
         * Define que o formulário está em processo de criação.
         *
         * @type {boolean}
         */
        $scope.viewState = 'show';

        /**
         * Ainda não possui o registro ao abrir a tela.
         *
         * @type {boolean}
         */
        $scope.hasRecord = false;

        /**
         * Referência ao serviço de usuário.
         *
         * @type {usuario.UsuarioService}
         */
        $scope.usuario = UsuarioService;

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){
            $scope.usuario.api.get($stateParams.id).then(function(record) {

                if (record) {
                    $scope.hasRecord = true;
                }
                $scope.record = record;
            });

            loadPerfil();
        };

        /**
         * Carrega a lista de perfis de usuário.
         */
        function loadPerfil(){
            $scope.usuario.perfil.find().then(function(results){
                $scope.listaPerfil = results;
            })
        }

        $scope.onInit();
    }

}());