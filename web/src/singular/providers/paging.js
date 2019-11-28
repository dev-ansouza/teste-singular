(function()
{
    'use strict';

    /**
     * Provedor do serviço de paginação para o Singular.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     */
    angular.module('singular').provider('$sngPaging', PagingProvider);

    /**
     * Função de definição do provedor de paginação.
     *
     * @constructor
     */
    function PagingProvider(){
        var provider = this;

        this.$get = [function(){
            function pagingFactory(rawPaging){
                if (!rawPaging) {
                    rawPaging = {};
                }

                var Paging = {
                    isPagingProvider: true,
                    limit: rawPaging.limit || 100,
                    options: rawPaging.options || [10,25,50,100,500],
                    page: rawPaging.page || 1,
                    total: 0,
                    /**
                     * Função que recupera a paginação a ser enviada para o backend.
                     */
                    getPaging: getPagingFn
                };

                function getPagingFn() {
                    return {
                        start: (Paging.page -1) * Paging.limit,
                        limit: Paging.limit
                    }
                }

                return Paging;
            }

            return pagingFactory;
        }];
    }
})();