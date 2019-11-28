(function()
{
    'use strict';

    /**
     * Provider que cria uma interface de encapsulamento para chamada de métodos remotos no backend.
     *
     * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
     * @todo Implementar mapa de filtro via diretiva / parâmetro
     */
    angular.module('singular').provider('$sngApi', ApiProvider);

    /**
     * Função de definição do Provider.
     *
     * @constructor
     */
    function ApiProvider() {
        var provider = this,
            defaults = {
                method: 'POST',
                params: {}
            };

        /**
         * Registra as configurações.
         *
         * @param {object} settings
         */
        this.config = function(settings) {
            forEach(settings, function(value, key) {
                defaults[key] = value;
            });
        };

        this.$get = [
            '$http',
            '$sngFilter',
            '$sngPaging',
            'SweetAlert',
            'toastr',
            function($http, $sngFilter, $sngPaging, SweetAlert, toastr) {
                function apiFactory(resource, $Filter, $Paging) {
                    var _filter = null,
                        _paging = null,
                        _sort = null;

                    var Api = {
                        /**
                         * Injeta o serviço de filtro na chamada do método.
                         *
                         * @param {object} f
                         * @type {function}
                         */
                        filter: applyFilter,

                        /**
                         * Injeta o serviço de paginação na chamada do método.
                         *
                         * @param {object}
                         * @type {function}
                         */
                        paginate: applyPaging,

                        /**
                         * Injeta a ordenação na chamada do método.
                         *
                         * @param {string}
                         * @type {function}
                         */
                        sort: applySort,

                        /**
                         * Aciona o método get no CRUD trait e recupera um registro pelo seu id.
                         *
                         * @param {int} id
                         * @type {function}
                         */
                        get: doGet,

                        /**
                         * Aciona o método find no CRUD trait e recupera uma lista de registros filtrados.
                         *
                         * @param {object} sort
                         * @type {function}
                         */
                        find: doFind,

                        /**
                         * Aciona o método remove no CRUD trait e excluí um registro pelo seu id.
                         *
                         * @param {int} id
                         * @param {function} callback
                         * @param {string} title
                         * @param {string} text
                         * @param {string} successMsg
                         * @type {function}
                         */
                        remove: doRemove,

                        /**
                         * Aciona o método save no CRUD trait e salva um registro criado ou alterado.
                         *
                         * @param {object} record
                         */
                        save: doSave,

                        /**
                         * Chama o método remoto.
                         *
                         * @param {string} action
                         * @param {object} params
                         * @param {string} method
                         *
                         * @type {function}
                         *
                         * @return {promise}
                         */
                        call: doCall
                    };

                    return Api;


                    /**
                     * Aciona o método save.
                     *
                     * @param {object} record
                     */
                    function doSave(record) {
                        var req = Api
                            .call('save',record);

                        return req;

                    }

                    /**
                     * Aciona o método remove.
                     *
                     * @param {int} id
                     * @param {function} callback
                     * @param {string} title
                     * @param {string} text
                     * @param {string} successMsg
                     * @return {promise}
                     */
                    function doRemove(id, callback, title, text, successMsg) {
                        SweetAlert.swal({
                                title: title || "Atenção",
                                text: text || "Deseja realmente apagar este registro?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Sim",
                                cancelButtonText: 'Não',
                                closeOnConfirm: true},
                            function(confirm) {
                                if (confirm) {
                                    Api.call('remove', {id: id}).then(function(response){
                                        if (response.success) {
                                            toastr.success(successMsg || 'Exclusão realizada com sucesso!');
                                            callback(true);
                                        } else {
                                            callback(false);
                                        }
                                    });
                                }
                            });
                    }

                    /**
                     * Aciona o método find.
                     *
                     * @param sort
                     * @return {promise}
                     */
                    function doFind(sort) {
                        if (!sort) {
                            sort = null;
                        }

                        var req = Api.filter()
                            .paginate()
                            .sort(sort)
                            .call('find')
                            .then(function(response) {
                                if (response.success) {
                                    return response.results;
                                }
                                return false;
                            });

                        return req;
                    }

                    /**
                     * Aciona o método get
                     *
                     * @param id
                     */
                    function doGet(id) {
                        var req = Api.call('get',{id: id}).then(function(response) {
                            if (response.success) {
                                return response.result;
                            }
                            return false;
                        });

                        return req;
                    }

                    /**
                     * Função de chamada do método remoto.
                     *
                     * @param {string} action
                     * @param {object} params
                     * @param {string} method
                     *
                     * @return {promise}
                     */
                    function doCall(action, params, method) {
                        if (!method) {
                            method = defaults.method;
                        }

                        if (!params) {
                            params = angular.copy(defaults.params);
                        }

                        if (_filter) {
                            params.filter = _filter.getFilter();

                            if (!params.filter) {
                                delete params.filter;
                            }
                        }

                        if (_paging) {
                            params.paging = _paging.getPaging();

                            if (!params.paging) {
                                delete params.paging;
                            }

                        }

                        if (_sort) {
                            params.sort = getSort(_sort);
                        }

                        var request = $http({
                            method: method.toUpperCase(),
                            url: getURL(action),
                            data: params
                        }).then(function(response){
                            if (response.status == 200) {

                                if ($Paging) {
                                    $Paging.total = response.data.total;
                                }

                                _paging = null;
                                _filter = null;
                                _sort = null;

                                return response.data;
                            }
                        });

                        return request;
                    }

                    /**
                     * Aplica o filtro na chamada da api.
                     *
                     * @param filter
                     * @return {Api}
                     */
                    function applyFilter(filter) {
                        var f = filter || $Filter;

                        if (!f) {
                            f = {};
                        }
                        if (!f.hasOwnProperty('isFilterProvider')) {
                            if (!_filter) {
                                _filter = $sngFilter(f);
                            }
                        } else {
                            _filter = angular.copy(f);
                        }

                        return Api;
                    }

                    /**
                     * Aplica a paginação na chamada da api.
                     *
                     * @param paging
                     * @return {Api}
                     */
                    function applyPaging(paging) {
                        var p = paging|| $Paging;

                        if (!p) {
                            p = {};
                        }

                        if (!p.hasOwnProperty('isPagingProvider')) {
                            _paging = $sngPaging(p);
                        } else {
                            _paging = p;
                        }

                        return Api;
                    }

                    /**
                     * Aplica a ordenação na chamada da api.
                     *
                     * @param strSort
                     * @return {Api}
                     */
                    function applySort(strSort) {
                        _sort = strSort;

                        return Api;
                    }

                    /**
                     * Recupera a estrutura de ordenação da consulta.
                     *
                     * @param strSort
                     * @return {object}
                     */
                    function getSort(strSort) {
                        var sort = {},
                            direction = 'ASC',
                            fields;

                        if (typeof strSort === 'string') {
                            fields = strSort.split(",");

                            angular.forEach(fields, function(field){
                                try {
                                    if (field.charAt(0) == '-') {
                                        direction = 'DESC';
                                        field = field.substr(1).trim();
                                    }

                                    sort[field] = direction;
                                } catch(e){}
                            });
                        } else {
                            sort = strSort;
                        }

                        return sort;
                    }


                    /**
                     * Recupera a URL completa de um endpoint para chamada remota.
                     *
                     * @param {string} action
                     *
                     * @return {string}
                     */
                    function getURL(action) {
                        return resource + '/' + action;
                    }
                }

                return apiFactory;
            }
        ];
    }
})();