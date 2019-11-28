(function()
{
    /**
     * Serviço responsável pela manipulação de módulos pais.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente').factory(
        'componente.ParenteStore',
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
        var me = StoreFactory.create('sessao','componente','parent');

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