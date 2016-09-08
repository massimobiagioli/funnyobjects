<style>
    .starter-template {
        padding: 40px 15px;
        text-align: center;
    }
    .toolbar {
        text-align: left;
    }
    .input-group-addon-detail {
        min-width: 200px;
        text-align: right;
    }
    .modal-dialog {
        width: 80%; 
        margin-left: 10%; 
    }
</style>

<template>
    <div class="starter-template">
        
        <!-- Header -->
        <div class="page-header">
            <h1>Gestione Oggetti</h1>
        </div>

        <!-- New -->
        <div class="toolbar">
            <button type="button" id="newItem" class="btn btn-primary btn-sm"><span class="fa fa-plus"></span><span> Nuovo</span></button>
        </div>

        <!-- Grid -->
        <table id="main-grid" class="table table-condensed table-hover table-striped" data-ajax="true" data-toggle="bootgrid">
            <thead>
                <tr>
                    <th data-column-id="fob_id" data-type="numeric" data-width="10%" data-identifier="true">ID</th>
                    <th data-column-id="fob_des" data-width="40%">Descrizione</th>
                    <th data-column-id="fob_created" data-formatter="fob_created_formatter" data-order="desc" data-width="25%">Creato il</th>
                    <th data-column-id="fob_disabled" data-formatter="fob_disabled_formatter" data-width="10%">Dis.</th>
                    <th data-column-id="actions" data-formatter="actions_formatter" data-sortable="false" data-width="15%">Azioni</th>
                </tr>
            </thead>
        </table>

        <!-- Detail -->
        <div class="modal fade" id="detail" tabindex="-1" role="dialog" aria-labelledby="detailLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="detailLabel">{{dialogTitle}}</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                                               
                        <div class="input-group" v-if="actionName === 'edit'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fob_id">ID</span>
                            <input type="text" class="form-control" placeholder="ID" id="txt_fob_id" aria-describedby="lbl_fob_id" readonly v-model="currentRow.fob_id">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fob_des">Descrizione</span>
                            <input type="text" class="form-control" placeholder="Descrizione" id="txt_fob_des" aria-describedby="lbl_fob_des" v-model="currentRow.fob_des">
                        </div>

                        <div class="input-group" v-if="actionName === 'edit'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fob_created">Creato il</span>
                            <input type="text" class="form-control" placeholder="Creato il" id="txt_fob_created" aria-describedby="txt_fob_created" readonly v-model="currentRow.fob_created | localDateTime">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fob_disabled">Disabilitato</span>                             
                            <input type="checkbox" class="form-control" placeholder="Disabilitato" id="txt_fob_disabled" aria-describedby="lbl_fob_disabled" v-model="currentRow.fob_disabled | checkbox">                           
                        </div>                        

                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" id="confirmDetail">Conferma</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Confirm Delete -->
        <div class="modal fade" id="confirmDelete" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="confirmDeleteLabel">Cancellazione Oggetto</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <div>Sei sicuro di cancellare <b>{{currentRow.fob_des}}</b>?</div>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" id="confirmDelete">Conferma</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Commands -->
        <div class="modal fade" id="commands" tabindex="-1" role="dialog" aria-labelledby="commandsLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="confirmDeleteLabel">Comandi di {{currentRow.fob_des}}</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        
                        <!-- New -->
                        <div class="toolbar">
                            <button type="button" id="newSubItem" class="btn btn-primary btn-sm"><span class="fa fa-plus"></span><span> Nuovo</span></button>
                        </div>

                        <!-- Grid -->
                        <table id="commands-grid" class="table table-condensed table-hover table-striped" data-ajax="true" data-toggle="bootgrid">
                            <thead>
                                <tr>
                                    <th data-column-id="fio_id" data-type="numeric" data-width="10%" data-identifier="true">ID</th>
                                    <th data-column-id="fio_des" data-order="asc" data-width="30%">Descrizione</th>
                                    <th data-column-id="fio_direction" data-width="10%">I/O</th>
                                    <th data-column-id="fio_command" data-formatter="fio_command_formatter" data-width="25%">Comando</th>
                                    <th data-column-id="fio_disabled" data-formatter="fio_disabled_formatter" data-width="10%">Dis.</th>
                                    <th data-column-id="actions" data-formatter="fio_actions_subitems_formatter" data-sortable="false" data-width="15%">Azioni</th>
                                </tr>
                            </thead>
                        </table>

                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                    </div>

                </div>
                
            </div>
        </div>

        <!-- SubItem Detail -->
        <div class="modal fade" id="detailSubItem" tabindex="-1" role="dialog" aria-labelledby="detailSubItemLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="detailSubItemLabel">{{dialogTitle}}</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        
                        <!-- Dati principali -->

                        <div class="input-group" v-if="actionName === 'edit'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_id">ID</span>
                            <input type="text" class="form-control" placeholder="ID" id="txt_fio_id" aria-describedby="lbl_fio_id" readonly v-model="currentRowSubItem.fio_id">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_des">Descrizione</span>
                            <input type="text" class="form-control" placeholder="Descrizione" id="txt_fio_des" aria-describedby="lbl_fio_des" v-model="currentRowSubItem.fio_des">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_direction">Direzione</span>
                            <select class="selectpicker form-control select-direction" style="width: 100px;">
                                <option>Input</option>
                                <option>Output</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_disabled">Disabilitato</span>
                            <input type="checkbox" class="form-control" placeholder="Disabilitato" id="txt_fio_disabled" aria-describedby="lbl_fio_disabled" v-model="currentRowSubItem.fio_disabled | checkbox">
                        </div>

                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" id="confirmDetailSubItem">Conferma</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Notify Message -->
        <dialog-notify-message :dialog-title="dialogTitle" :notify-message="notifyMessage"></dialog-notify-message>

        <!-- Error Message -->
        <dialog-error-message :dialog-title="dialogTitle" :error-message="errorMessage"></dialog-error-message>

    </div>
</template>

<script>    
import backEndFactory from '../backEndFactory'
import gridHelper from '../gridHelper'
import filters from '../filters'
import {resetState, newItem, editItem, deleteItem, confirmDetail, confirmDelete, editSubItems, newSubItem} from '../actions'
import {actionName, rowId, dialogTitle, currentRow, currentRowSubItem, notifyMessage} from '../getters'
import DialogNotifyMessage from './DialogNotifyMessage.vue'
import DialogErrorMessage from './DialogErrorMessage.vue'

export default {
    created() {
        this.resetState();
    },
    ready() {
        this.sender = 'ObjectManager';
        this.modelName = 'funnyobject';
        this.modelNameSubItem = 'funnyobjectio';
        this.defaultSearchFieldName = 'fob_des';
        this.parendFieldNameSubItem = 'fio_id';
        this.defaultSearchFieldNameSubItem = 'fio_des';
        this.backEnd = backEndFactory.create();

        this.initGrid();
        this.initComponents();
    },
    methods: {
        initGrid() {
            let originalRequest = {};
            let grid = $("#main-grid").bootgrid({
                ajaxSettings: gridHelper.getAjaxSettings(),
                requestHandler: (request) => {
                    originalRequest = request;
                    return {};
                },
                url: () => {
                    return this.backEnd.getUrlForQuery(this.modelName, originalRequest, this.defaultSearchFieldName);
                },
                labels: gridHelper.getLabels(),
                formatters: {
                    'fob_created_formatter': (column, row) => {
                        return gridHelper.formatDate(row.fob_created);
                    },
                    'fob_disabled_formatter': (column, row) => {
                        return gridHelper.formatCheckbox(row.fob_disabled);
                    },
                    'actions_formatter': (column, row) => {
                        let additionalActions = "<button type=\"button\" class=\"btn btn-xs btn-default command-io\" data-row-id=\"" + row.fob_id + "\"><span class=\"fa fa-play\"></span></button>";
                        return gridHelper.formatActions(row.fob_id, additionalActions);
                    }
                }
            })
            .on("loaded.rs.jquery.bootgrid", () => {
                grid.find(".command-edit").on("click", (e) => {
                    let rowId = $(e.currentTarget).data("row-id");
                    this.editItem(this.sender, this.modelName, rowId);
                }).end().find(".command-delete").on("click", (e) => {
                    let rowId = $(e.currentTarget).data("row-id");
                    this.deleteItem(this.sender, this.modelName, rowId);
                }).end().find(".command-io").on("click", (e) => {
                    let rowId = $(e.currentTarget).data("row-id");
                    this.editSubItems(this.sender, this.modelName, rowId);
                });
            });
        },
        initGridCommands() {
            let originalRequest = {};
            let grid = $("#commands-grid").bootgrid({
                ajaxSettings: gridHelper.getAjaxSettings(),
                requestHandler: (request) => {
                    originalRequest = request;
                    return {};
                },
                url: () => {
                    return this.backEnd.getUrlForQuerySubItem(this.modelNameSubItem, this.rowId, originalRequest, this.parendFieldNameSubItem, this.defaultSearchFieldNameSubItem);
                },
                labels: gridHelper.getLabels(),
                formatters: {
                    'fio_disabled_formatter': (column, row) => {
                        return gridHelper.formatCheckbox(row.fio_disabled);
                    },
                    'fio_command_formatter': (column, row) => {
                        let html = '';
                        if (row.fio_direction === 'out') {
                            html += '<div><span>type: </span><span>' + row.fio_send_type + '</span></div>';
                            html += '<div><span>cmd: </span><span>' + row.fio_send_cmd + '</span></div>';
                            if (row.fio_send_type === 'val') {
                                html += '<div><span>range: </span><span>' + row.fio_send_vmin + '</span><span> - </span><span>' + row.fio_send_vmax + '</span></div>';
                            } 
                        } else {   
                            html += '<span>polling freq. (ms): </span><span>' + row.fio_recv_freq_polling + '</span>';    
                        }
                        return html;
                    },
                    'fio_actions_subitems_formatter': (column, row) => {
                        return gridHelper.formatActions(row.fio_id, '', '-subitem');
                    }
                }
            })
            .on("loaded.rs.jquery.bootgrid", () => {
                grid.find(".command-edit-subitem").on("click", (e) => {
                    let rowId = $(e.currentTarget).data("row-id");
                    this.editItem(this.sender, this.modelName, rowId);
                }).end().find(".command-delete-subitem").on("click", (e) => {
                    let rowId = $(e.currentTarget).data("row-id");
                    this.deleteItem(this.sender, this.modelName, rowId);
                });
            });
        },
        initComponents() {
            
            // Pulsante aggiunta nuovo elemento
            $('#newItem').on('click', () => {
                this.newItem(this.sender, this.modelName);
            });

            // Apertura dialog dettaglio
            $('#detail').on('shown.bs.modal', () => {
                $('#txt_fob_des').focus();
            });

            // Pulsante conferma dettaglio
            $('#confirmDetail').on('click', () => {
                let detailData = {
                    'fob_des': $('#txt_fob_des').val(),
                    'fob_disabled': ($('#txt_fob_disabled').prop('checked') === true ? 1 : 0)
                };
                this.confirmDetail(this.sender, this.modelName, detailData, this.rowId);
            });      

            // Pulsante conferma cancellazione
            $('#confirmDelete').on('click', () => {
                this.confirmDelete(this.sender, this.modelName, this.rowId);
            });

            // Apertura dialog comandi
            $('#commands').on('shown.bs.modal', () => {
                this.initGridCommands();
            });

            // Pulsante aggiunta nuovo sottoelemento
            $('#newSubItem').on('click', () => {
                this.newSubItem(this.sender, this.modelNameSubItem, this.rowId);
            });
        }
    },
    components: {
        DialogNotifyMessage,
        DialogErrorMessage
    },
    vuex: {
        actions: {
            resetState,
            newItem,
            editItem,
            deleteItem,
            confirmDetail,
            confirmDelete,
            editSubItems,
            newSubItem
        },
        getters: {
            actionName,
            rowId,
            dialogTitle,
            currentRow,
            currentRowSubItem,
            notifyMessage
        }
    }
}
</script>
