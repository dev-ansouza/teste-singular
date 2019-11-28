(function()
{
    'use strict';

    /**
     * Serviço responsável por criar uma instância de store para conexão com a API remota.
     *
     * @author Otávio Fernanes <otavio@neton.com.br>
     */
    angular.module('singular.ui').factory(
        'ui.StoreFactory',
        [
            '$http'
            ,'$localStorage'
            ,'UI'
            ,'SweetAlert'
            ,'toastr'
            ,'ui.Session'
            ,StoreFactory
        ]
    );

    /**
     * Função de definição do serviço.
     *
     * @param $http
     * @param $localStorage
     * @param UI
     * @param SweetAlert
     * @param toastr
     * @param Session
     * @returns {StoreFactory}
     * @constructor
     */
    function StoreFactory(
        $http
        ,$localStorage
        ,UI
        ,SweetAlert
        ,toastr
        ,Session
    ) {
        var me = this,
            session = Session.getSession();

        /**
         * Cria uma nova instância de store para um endpoint na api remota.
         *
         * @param {string} pack
         * @param {string} controller
         * @param {string} storeId
         */
        me.create = function(pack, controller, storeId) {
            return createInstance(pack, controller, storeId);
        };

        /**
         * Recupera a URL remota para chamada do método na API.
         *
         * @returns {string}
         */
        function getRemoteUrl(instance) {
            return instance.pack + '/' + instance.controller;
        }

        /**
         * Recupera os parâmetros de ordenação a serem passados para a API.
         *
         * @param {string} strSort
         * @return {object}
         */
        function getSort(strSort){
            var sort = {},
                direction = 'ASC',
                fields;

            if (typeof strSort == 'string') {
                fields = strSort.split(",");

                angular.forEach(fields, function(field){
                    try {
                        if (field.charAt(0) == '-') {
                            direction = 'DESC';
                            field = field.substr(1).trim();
                        }

                        if (field != ""){
                            sort[field] = direction;
                        }

                    } catch(e){}
                });
            } else {
                sort = strSort;
            }

            return sort;
        }

        /**
         * Recupera os filtros a serem aplicados na consulta.
         *
         * @todo Simplificar a complexidade desta funcionalidade.
         *
         * @param {object} instance
         *
         * @return {object}
         */
        function getFilter(instance) {
            var filter = {};

            angular.forEach(instance.filter, function(value, key) {
                if (instance.filterMap[key]) {
                    // se o mapa é um objeto
                    if (typeof instance.filterMap[key] == 'object') {
                        if (!instance.filterMap[key].convert) { // se não existe função de conversão para o valor
                            // cria o filtro para a
                            filter[key] = {
                                property: instance.filterMap[key].property,
                                clause: instance.filterMap[key].operation + ':' + value
                            }


                        } else {
                            filter[key] = {
                                property: instance.filterMap[key].property,
                                clause: instance.filterMap[key].operation + ':' + instance.filterMap[key].convert(value)
                            }
                        }

                    } else { // se o mapa é uma string
                        // monta o filtro do tipo id: '>=:'
                        filter[key] = instance.filterMap[key] + ':' + value;
                    }
                } else { // se o filtro não possui um mapa definido
                    filter[key] = value;
                }
            });

            return filter;
        }


        /**
         * Cria um serviço com funcionalidades de Crud Padrão.
         *
         * @param {string} pack Pacote do backend ao qual pertence o controlador.
         * @param {string} controller Controlador do backend pertencente ao pacote.
         * @param {string} storeId
         *
         * @return {object}
         */
        function createInstance(pack, controller, storeId) {
            var stId = storeId || pack + controller,
                storeCache = angular.copy($localStorage[stId] || {paging: {
                        currentPage: 1,
                        pageSize: 50
                    }, filter: {}, sort: ''});

            var that = {
                results: [],
                storeId: stId,
                pack: pack,
                controller: controller,
                total: 0,
                enableRowSelection: true,
                filterFocus: false,
                firstLoad: false,
                isSubmited: false,
                sort: storeCache.sort,
                selected: [],
                paging: storeCache.paging,
                /**
                 * idade: {
                 *  prop: 't.idade',
                 *  value: ''
                 * }
                 */
                filterMap: {
                },
                filter: storeCache.filter,

                /**
                 * Limpa os filtros aplicados a uma listagem de registros.
                 *
                 * @param {function} callback
                 */
                clearFilter : function(callback) {
                    that.filter = {};
                    that.load(callback);
                },

                /**
                 * Limpa um filtro específico.
                 *
                 * @param {string} field
                 */
                clear : function(field){
                    delete that.filter[field];
                },

                /**
                 * Retorna a classe css do botão de filtrar para mostrar se o filtro está ou não ativo.
                 *
                 * @return string
                 */
                isActiveClass : function() {
                    if (!angular.equals(that.filter, {})) {
                        return 'btn-info active';
                    }

                    return 'btn-default';
                },

                /**
                 * Checa a validação de um campo do formulário para exibição de mensagem de erro.
                 *
                 * @param {object} field
                 * @returns {boolean|FormController.$dirty|*|ngModel.NgModelController.$dirty}
                 */
                checkField : function(field,name) {
                    if (field) {
                        return that.isSubmited || field.$dirty;
                    }
                },

                /**
                 * Chama método remoto para recuperação de um registro a partir do seu ID.
                 *
                 * @param {integer} id
                 * @param {function} callback
                 */
                get : function(id, callback){
                    var url = getRemoteUrl(that);

                    $http.post(url + '/get', {id: id}).success(function(response){
                        callback(response.result);
                    });
                },

                /**
                 * Chama método remoto para atualização/inserção de um registro.
                 *
                 * @param {object} data
                 * @param {function} callback
                 */
                save : function(data, callback){
                    var url = getRemoteUrl(that);

                    $http.post(url + '/save', data).success(function(response){
                        callback(response);
                    });
                },

                /**
                 * Chama método remoto para exclusão de um registro.
                 *
                 * @param {integer}  id
                 * @param {function} callback
                 * @param {object}   config
                 */
                remove : function(id, callback, config) {
                    if (!config) {
                        config = {}
                    }
                    
                    SweetAlert.swal({
                        title: config.title || "Atenção",
                        text: config.text || "Deseja realmente apagar este registro?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sim",
                        cancelButtonText: 'Não',
                        closeOnConfirm: true},
                    function(confirm) {
                        if (confirm) {
                            that.call('remove', {id: id}, function(response){
                                if (response.success) {
                                    toastr.pop('success', config.success || 'Exclusão realizada com sucesso!');
                                    callback(true);
                                } else {
                                    callback(false);
                                }
                            });
                        }
                    });

                },

                /**
                 * Recupera um registro na lista d registros carregados por uma determinada propriedade.
                 *
                 * @param {string} field
                 * @param {string} value
                 * @param {string} property
                 * @param {array}  list
                 *
                 * @return {integer}
                 */
                getBy : function(field, value, property, list){
                    var source = that.results;

                    if (list) {
                        source = list;
                    }

                    var record = $.grep(source, function(item){ return item[field] == value; });

                    if (record.length > 0){
                        if (property){
                            return record[0][property];
                        }

                        return record[0];
                    }
                },

                /**
                 * Chama um método remoto na api.
                 *
                 * @param {string} method
                 * @param {object} params
                 * @param {function} callback
                 * @param {object} config
                 */
                call : function(method, params, callback, config){
                    var url = getRemoteUrl(that);

                    if (!config) {
                        config = {
                            method: 'post'
                        }
                    }

                    switch(config.method) {
                        case 'post':
                            $http.post(url + '/' + method, params).success(callback);
                            break;
                        case 'get':
                            $http.get(url + '/' + method + (config.urlParams || ''), params).success(callback);
                            break;
                    }

                },

                /**
                 * Função que carrega a relação de registros.
                 *
                 * @param {function} callback
                 * @param {string} method
                 */
                load : function(callback, method) {
                    var storageKey = that.storeId + '_store',
                        cache = $localStorage[storageKey];

                    if ('function' != typeof callback) {
                        callback = function(){}
                    }

                    if (!cache) {
                        $localStorage[storageKey] = {
                            filter: that.filter,
                            sort: that.sort,
                            paging: that.paging
                        }
                    } else {
                        if (!that.firstLoad) {
                            that.filter = angular.copy(cache.filter);
                            that.paging = angular.copy(cache.paging);
                            that.sort = angular.copy(cache.sort);
                            that.firstLoad = true;
                        } else {
                            $localStorage[storageKey] = {
                                filter: angular.copy(that.filter),
                                sort: angular.copy(that.sort),
                                paging: angular.copy(that.paging)
                            }
                        }
                    }

                    var params = {
                            paging: {
                                start: (that.paging.currentPage -1) * that.paging.pageSize,
                                limit: that.paging.pageSize
                            },
                            filter: getFilter(that),
                            sort: getSort(that.sort)
                        },
                        url = getRemoteUrl(that),
                        findMethod = method || 'find';

                    $http.post(url + '/' + findMethod, params).success(function(response){
                        that.results = response.results;
                        that.total = response.total;
                        callback(that);
                        that.filterFocus = true;
                    });
                }
            };

            return that;
        }

        return me;
    }

}());