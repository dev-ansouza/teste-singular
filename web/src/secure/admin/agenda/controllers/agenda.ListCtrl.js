(function()
{
    'use strict';

    /**
     * Controlador responsável por funcionalidade de listagem.
     *
     * @author Author <Email>
     */
    angular.module('admin.agenda').controller(
        'agenda.ListCtrl',
        [
            '$scope'
            ,'toastr'
            ,'agenda.AgendaService'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param toastr
     * @param AgendaService
     * @constructor
     */
    function Controller(
         $scope
        ,toastr
        ,AgendaService
    ) {

        /**
         * Api de comunicação com o controlador no backend.
         *
         * @type {$sngApi}
         */
        $scope.api = AgendaService.api;

        /**
         * Atalho para a propriedade filter do serviço de agenda.
         *
         * @type {$sngFilter}
         */
        $scope.filtro = AgendaService.filter;

        /**
         * Atalho para a propriedade paging do serviço de agenda.
         *
         * @type {*|$sngApi|paging|{currentPage, pageSize}|{start, limit}|string}
         */
        $scope.paging = AgendaService.paging;

        /**
         * Atalho para a propriedade sort do serviço de agenda.
         */
        $scope.sort = AgendaService.sort;

        /**
         * Registros que serão exibidos na interface.
         *
         * @type {Array}
         */
        $scope.records = [];

        /**
         * Inicialização do controlador.
         */
        $scope.onInit = function(){

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
         * Recarrega a lista de registros.
         */
        $scope.reloadData = function(){
            $scope.api.find($scope.api.sort).then(function(results){
                $scope.records = results;
            });
        };

        /**
         * Remove um registro pelo seu id.
         *
         * @param {int} id
         */
        $scope.remove = function (id) {
            $scope.api.remove(id, function(response) {
                if (response) {
                    $scope.reloadData();
                }
            });
        };

        $scope.onInit();
    }

}());