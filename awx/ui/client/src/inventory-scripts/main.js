/*************************************************
 * Copyright (c) 2015 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

import inventoryScriptsList from './list/main';
import inventoryScriptsAdd from './add/main';
import inventoryScriptsEdit from './edit/main';
import list from './inventory-scripts.list';
import form from './inventory-scripts.form';

export default
angular.module('inventoryScripts', [
        inventoryScriptsList.name,
        inventoryScriptsAdd.name,
        inventoryScriptsEdit.name
    ])
    .factory('InventoryScriptsList', list)
    .factory('InventoryScriptsForm', form)
    .config(['$stateProvider', 'stateDefinitionsProvider',
        function($stateProvider, stateDefinitionsProvider) {
            let stateDefinitions = stateDefinitionsProvider.$get();

            $stateProvider.state({
                name: 'inventoryScripts',
                url: '/inventory_script',
                lazyLoad: () => stateDefinitions.generateTree({
                    parent: 'inventoryScripts',
                    modes: ['add', 'edit'],
                    list: 'InventoryScriptsList',
                    form: 'InventoryScriptsForm',
                    controllers: {
                        list: 'InventoryScriptsListController',
                        add: 'InventoryScriptsAddController',
                        edit: 'InventoryScriptsEditController'
                    },
                    resolve: {
                        edit: {
                            inventory_scriptData: ['$state', '$stateParams', 'Rest', 'GetBasePath', 'ProcessErrors',
                                function($state, $stateParams, rest, getBasePath, ProcessErrors) {
                                    var inventoryScriptId = $stateParams.inventory_script_id;
                                    var url = getBasePath('inventory_scripts') + inventoryScriptId + '/';
                                    rest.setUrl(url);
                                    return rest.get()
                                        .then(function(data) {
                                            return data.data;
                                        }).catch(function(response) {
                                            ProcessErrors(null, response.data, response.status, null, {
                                                hdr: 'Error!',
                                                msg: 'Failed to get inventory script info. GET returned status: ' +
                                                    response.status
                                            });
                                        });
                                }
                            ]
                        }
                    },
                    data: {
                        activityStream: true,
                        activityStreamTarget: 'inventory_script'
                    },
                    ncyBreadcrumb: {
                        parent: 'setup',
                        label: 'INVENTORY SCRIPTS'
                    }
                })
            });
        }
    ]);
