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
            ,'$sngApi'
            ,'$sngFilter'
            ,'$sngPaging'
            ,Controller
        ]
    );

    /**
     * Função de definição do controlador.
     *
     * @param $scope
     * @param toastr
     * @param $sngApi
     * @param $sngFilter
     * @param $sngPaging
     * @constructor
     */
    function Controller(
         $scope
        ,toastr
        ,$sngApi
        ,$sngFilter
        ,$sngPaging
    ) {
        /**
         * Referência local ao serviço do filtro.
         *
         * @todo Alterar a url do template
         * @type {$sngApi}
         */
        $scope.filtro = $sngFilter('url_template_do_filtro');

        /**
         * Referência local ao serviço da paginação.
         *
         * @todo Alterar a url do template
         * @type {$sngPaging}
         */
        $scope.paging = $sngPaging();

        /**
         * Api de comunicação com o controlador no backend.
         *
         * @todo Alterar o valor do pacote/controlador
         * @type {$sngApi}
         */
        $scope.api = $sngApi('pacote/controlador', $scope.filtro, $scope.paging);

        /**
         * Configuração de ordenação padrão.
         *
         * @type {string}
         */
        $scope.sort = null;

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
        };

        /**
         * Recarrega a lista de registros.
         */
        $scope.reloadData = function(){
            $scope.api.find($scope.sort).then(function(results){
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