(function()
{
   /**
    * Serviço de interface.
    *
    * @author Arthur Nunes <arthurn98@gmail.com>
    */
    angular.module('admin.agenda').factory(
        'agenda.AgendaService',
        [
            '$sngApi',
            '$sngFilter',
            '$sngPaging',
            Service
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $sngApi
     * @param $sngFilter
     * @param $sngPaging
     *
     * @return {object}
     * @constructor
     */
    function Service(
        $sngApi,
        $sngFilter,
        $sngPaging
    ) {
        var filter = $sngFilter('src/secure/admin/agenda/views/agenda.filter.html'),
            paging = $sngPaging(),
            api = $sngApi('sessao/agenda', filter, paging),

            me = {
                /**
                 * Api de comunicação com o controlador da agenda no backend.
                 *
                 * @type {$sngApi}
                 */
                api: api,

                /**
                 * Filtro de resultados para a listagem da agenda no backend.
                 *
                 * @type {$sngApi}
                 */
                filter: filter,

                /**
                 * Paginador de resultados para a listagem da agenda no backend.
                 *
                 * @type {$sngApi}
                 */
                paging: paging,

                /**
                 * Campo de ordenação da agenda.
                 *
                 * @type {string}
                 */
                sort: null,

                /**
                 * Renderiza o status do cliente.
                 *
                 * @param {string} status
                 *
                 * @return {string}
                 */
                renderAtivo: function(status) {
                    switch (status) {
                        case '1':
                            return 'Sim';
                            break;
                        case '0':
                            return 'Não';
                            break;
                    }
                }
            };

        return me;
    }
}());