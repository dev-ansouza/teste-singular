(function()
{
    /**
     * Serviço responsável pela manipulação do menu.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente').factory(
        'componente.MenuStore',
        [
            '$http',
            'ui.StoreFactory',
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $http
     * @param StoreFactory
     * @constructor
     */
    function Service(
        $http,
        StoreFactory
    ) {
        var me = StoreFactory.create('sessao','menu');


        /**
         * Mapa do filtro de consultas.
         *
         * @type {Object}
         */
        me.filterMap = {

        };

        return me;
    }

}());