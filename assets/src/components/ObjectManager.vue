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
    .input-group-addon-checkbox {        
        text-align: left;
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
                            <span class="form-control input-group-addon-checkbox"><input type="checkbox" id="txt_fob_disabled" v-model="currentRow.fob_disabled | checkbox"></span>                           
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
                            <select id="txt_fio_direction" class="selectpicker form-control" style="width: 100px;" v-model="currentRowSubItem.fio_direction">
                                <option>in</option>
                                <option>out</option>
                            </select>
                        </div>

                        <div class="input-group" v-if="currentRowSubItem.fio_direction === 'out'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_send_type">Tipo</span>
                            <select id="txt_fio_send_type" class="selectpicker form-control" style="width: 100px;" v-model="currentRowSubItem.fio_send_type">
                                <option>cmd</option>
                                <option>val</option>
                            </select>
                        </div>

                        <div class="input-group" v-if="currentRowSubItem.fio_direction === 'out'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_send_cmd">Comando</span>
                            <input type="text" class="form-control" placeholder="Comando" id="txt_fio_send_cmd" aria-describedby="lbl_fio_send_cmd" v-model="currentRowSubItem.fio_send_cmd">
                        </div>

                        <div class="input-group" v-if="currentRowSubItem.fio_direction === 'out' && currentRowSubItem.fio_send_type === 'val'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_send_vmin">V. Min.</span>
                            <input type="number" class="form-control" placeholder="V. Min." id="txt_fio_send_vmin" aria-describedby="lbl_fio_send_vmin" v-model="currentRowSubItem.fio_send_vmin">
                        </div>

                        <div class="input-group" v-if="currentRowSubItem.fio_direction === 'out' && currentRowSubItem.fio_send_type === 'val'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_send_vmax">V. Max.</span>
                            <input type="number" class="form-control" placeholder="V. Max." id="txt_fio_send_vmax" aria-describedby="lbl_fio_send_vmax" v-model="currentRowSubItem.fio_send_vmax">
                        </div>

                        <div class="input-group" v-if="currentRowSubItem.fio_direction === 'in'">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_recv_freq_polling">Freq. Polling (ms)</span>
                            <input type="number" class="form-control" placeholder="Freq. Polling (ms)" id="txt_fio_recv_freq_polling" aria-describedby="lbl_fio_recv_freq_polling" v-model="currentRowSubItem.fio_recv_freq_polling">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="lbl_fio_disabled">Disabilitato</span>                            
                            <span class="form-control input-group-addon-checkbox"><input type="checkbox" id="txt_fio_disabled" v-model="currentRowSubItem.fio_disabled | checkbox"></span>
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
import {resetState, newItem, editItem, deleteItem, confirmDetail, confirmDelete, editSubItems, newSubItem, confirmDetailSubItem} from '../actions'
import {actionName, rowId, parentId, dialogTitle, currentRow, currentRowSubItem, notifyMessage} from '../getters'
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
        this.parendFieldNameSubItem = 'fob_id';
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
                    return this.backEnd.getUrlForQuerySubItem(this.modelNameSubItem, (this.parentId || this.rowId), originalRequest, this.parendFieldNameSubItem, this.defaultSearchFieldNameSubItem);
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

            // Apertura dialog dettaglio comando
            $('#detailSubItem').on('shown.bs.modal', () => {
                $('#txt_fio_des').focus();
            });

            // Pulsante conferma dettaglio
            $('#confirmDetailSubItem').on('click', () => {
                let detailData = {
                    'fob_id': this.parentId,
                    'fio_des': $('#txt_fio_des').val(),
                    'fio_direction': $('#txt_fio_direction').val(),
                    'fio_send_type': $('#txt_fio_send_type').val(),
                    'fio_send_cmd': $('#txt_fio_send_cmd').val(),
                    'fio_send_vmin': $('#txt_fio_send_vmin').val(),
                    'fio_send_vmax': $('#txt_fio_send_vmax').val(),
                    'fio_recv_freq_polling': $('#txt_fio_recv_freq_polling').val(),
                    'fio_disabled': ($('#txt_fob_disabled').prop('checked') === true ? 1 : 0)
                };
                this.confirmDetailSubItem(this.sender, this.modelNameSubItem, detailData, this.rowId);
            });      

            // Pulsante conferma cancellazione
            $('#confirmDelete').on('click', () => {
                this.confirmDelete(this.sender, this.modelName, this.rowId);
            });

            // Apertura dialog comandi
            $('#commands').on('shown.bs.modal', () => {
                this.initGridCommands();
            });

            // Chiusura dialog comandi
            $('#commands').on('hidden.bs.modal', () => {
                gridHelper.destroy('commands-grid');
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
            newSubItem,
            confirmDetailSubItem
        },
        getters: {
            actionName,
            rowId,
            parentId,
            dialogTitle,
            currentRow,
            currentRowSubItem,
            notifyMessage
        }
    }
}
</script>
