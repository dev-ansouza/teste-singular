(function()
{
    /**
     * Serviço de store para o recurso de usuário na API.
     *
     * @author Otávio Fernandes <otavio@neton.com.br>
     */
    angular.module('admin.usuario').factory(
        'usuario.UsuarioService',
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
        var filter = $sngFilter('src/secure/admin/usuario/views/usuario.filter.html'),
            paging = $sngPaging(),
            api = $sngApi('sessao/usuario', filter, paging),
            perfil = $sngApi('sessao/perfil_acesso'),

        me = {
            /**
             * Api de comunicação com o controlador de usuários no backend.
             *
             * @type {$sngApi}
             */
            api: api,

            /**
             * Api de comunicação com o controlador de perfil de acesso no backend.
             *
             * @type {$sngApi}
             */
            perfil: perfil,

            /**
             * Filtro de resultados para a listagem de usuários no backend.
             *
             * @type {$sngApi}
             */
            filter: filter,

            /**
             * Paginador de resultados para a listagem de usuários no backend.
             *
             * @type {$sngApi}
             */
            paging: paging,

            /**
             * Campo de ordenação da lista de usuários.
             *
             * @type {string}
             */
            sort: null,

            /**
             * Renderiza o status do usuário.
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