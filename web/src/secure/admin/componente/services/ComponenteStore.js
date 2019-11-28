(function()
{
    /**
     * Serviço responsável pela manipulação de componentes.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('admin.componente').factory(
        'componente.ComponenteStore',
        [
            '$http',
            'ui.StoreFactory',
            Service
        ]
    );

    /**
     * Função de definição dos componentes.
     *
     * @param $http
     * @param StoreFactory
     * @constructor
     */
    function Service(
        $http,
        StoreFactory
    ) {
        var me = StoreFactory.create('sessao','componente');

        /**
         * Mapa do filtro de consultas.
         *
         * @type {Object}
         */
        me.filterMap = {

        };

        /**
         * remove o componente mandado como parametro
         *
         * @param {function} callback
         */
        me.removeComponente = function(data, callback) {
            me.call('removeComponente', {data: data}, function(response){
                callback(response);
            });
        };

        me.paging.pageSize =  500;

        return me;
    }

}());