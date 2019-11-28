(function()
{
   /**
    * Serviço de interface.
    *
    * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
    */
    angular.module('admin.builder').factory(
        'builder.BuilderService',
        [
            '$sngApi',
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $sngApi
     * @returns {Service}
     * @constructor
     */
    function Service(
        $sngApi
    ) {
        var me = {
            query: {
                filter: ''
            },
            parents: [],
            selected: ''
        };


        return me;
    }
}());