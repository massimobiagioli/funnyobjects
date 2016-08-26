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
                        
                        <!-- Dati principali -->

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
                            <input type="checkbox" class="form-control" placeholder="Disabilitato" id="txt_fob_disabled" aria-describedby="lbl_fob_disabled" v-model="fobDisabled">
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

        <!-- Notify Message -->
        <div class="modal fade" id="notifyMessage" tabindex="-1" role="dialog" aria-labelledby="notifyLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="notifyLabel">{{dialogTitle}}</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <span>{{notifyMessage}}</span>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div class="modal fade" id="errorMessage" tabindex="-1" role="dialog" aria-labelledby="errorLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <!-- Header -->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="errorLabel">{{dialogTitle}}</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <span>{{errorMessage}}</span>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>    
import backEndFactory from '../backEndFactory'
import gridHelper from '../gridHelper'
import filters from '../filters'
import {resetState, newItem, editItem, deleteItem, confirmDetail, confirmDelete} from '../actions'
import {actionName, rowId, dialogTitle, currentRow, notifyMessage} from '../getters'

export default {
    created() {
        this.resetState();
    },
    ready() {
        this.sender = 'ObjectManager';
        this.modelName = 'funnyobject';
        this.defaultSearchFieldName = 'fob_des';
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
                        return gridHelper.formatActions(row.fob_id);
                    }
                }
            })
            .on("loaded.rs.jquery.bootgrid", () => {
                grid.find(".command-edit").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    this.editItem(this.sender, this.modelName, rowId);
                }).end().find(".command-delete").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    this.deleteItem(this.sender, this.modelName, rowId);
                });
            });
        },
        initComponents() {
            $('#newItem').on('click', () => {
                this.newItem(this.sender, this.modelName);
            });

            $('#detail').on('shown.bs.modal', function() {
                $('#txt_fob_des').focus();
            });

            $('#confirmDetail').on('click', () => {
                let detailData = {
                    'fob_des': $('#txt_fob_des').val(),
                    'fob_disabled': ($('#txt_fob_disabled').prop('checked') === true ? 1 : 0)
                };
                this.confirmDetail(this.sender, this.modelName, detailData, this.rowId);
            });      

            $('#confirmDelete').on('click', () => {
                this.confirmDelete(this.sender, this.modelName, this.rowId);
            });         
        }
    },
    vuex: {
        actions: {
            resetState,
            newItem,
            editItem,
            deleteItem,
            confirmDetail,
            confirmDelete
        },
        getters: {
            actionName,
            rowId,
            dialogTitle,
            currentRow,
            notifyMessage
        },
        computed: {
            fobDisabled: () => this.currentRow.fob_disabled == 1
        }
    }
}
</script>
