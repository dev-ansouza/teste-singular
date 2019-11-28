(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade da aplicação.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.usuario').controller(
        'usuario.ListCtrl',
        [
            '$scope'
            ,'usuario.UsuarioService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param UsuarioService
     * @constructor
     */
    function Controller(
         $scope
        ,UsuarioService
    ) {
        /**
         * Atalho para o serviço de usuário.
         *
         * @type {usuario.UsuarioService}
         */
        $scope.usuario = UsuarioService;

        /**
         * Atalho para a propriedade filter do serviço de usuário.
         *
         * @type {$sngFilter}
         */
        $scope.filtro = UsuarioService.filter;

        /**
         * Registros de usuários.
         *
         * @type {Array}
         */
        $scope.records = [];

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function() {
            $scope.reloadData();

            // evento acionado ao clicar no botão "Aplicar filtro"
            $scope.filtro.$on('apply', $scope.reloadData);

            // evento acionado ao clicar no botão "Limpar filtro"
            $scope.filtro.$on('clear', function(){
                $scope.reloadData();
                $scope.filtro.close();
            });

        };

        /**
         * Função de recarregamento dos dados.
         */
        $scope.reloadData = function(){
            $scope.usuario.api.find($scope.usuario.sort).then(function(results) {
                if (results) {
                    $scope.records = results;
                }
            });
        };

        /**
         * Função de remoção dos registros.
         *
         * @param {int} id
         */
        $scope.remove = function (id) {
            $scope.usuario.api.remove(id, function(response) {
                if (response) {
                    $scope.reloadData();
                }
            });
        };

        // inicializa o controlador
        $scope.onInit();
    }

}());