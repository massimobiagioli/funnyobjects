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
                    <th data-column-id="fob_id" data-type="numeric" data-identifier="true">ID</th>
                    <th data-column-id="fob_des">Descrizione</th>
                    <th data-column-id="fob_created" data-formatter="fob_created_formatter" data-order="desc">Creato il</th>
                    <th data-column-id="fob_disabled" data-formatter="fob_disabled_formatter">Disabilitato</th>
                    <th data-column-id="actions" data-formatter="actions_formatter" data-sortable="false">Azioni</th>
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
                            <span class="input-group-addon input-group-addon-detail" id="txt_fob_id">ID</span>
                            <input type="text" class="form-control" placeholder="ID" aria-describedby="txt_fob_id" readonly v-model="currentRow.fob_id">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="txt_fob_des">Descrizione</span>
                            <input type="text" class="form-control" placeholder="Descrizione" aria-describedby="txt_fob_des" v-model="currentRow.fob_des">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="txt_fob_created">Creato il</span>
                            <input type="text" class="form-control" placeholder="Creato il" aria-describedby="txt_fob_created" v-model="currentRow.fob_created">
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon input-group-addon-detail" id="txt_fob_disabled">Disabilitato</span>
                            <input type="text" class="form-control" placeholder="Disabilitato" aria-describedby="txt_fob_disabled" v-model="currentRow.fob_disabled">
                        </div>

                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary">Conferma</button>
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
                        <h4 class="modal-title" id="confirmDeleteLabel">Cancella Oggetto</h4>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <div>Sei sicuro di cancellare <b>{{currentRow.fob_des}}</b>?</div>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary">Conferma</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>    
import funnyobjects from '../funnyobjects'
import gridHelper from '../gridHelper'
import {newItem, editItem, deleteItem} from '../actions'
import {actionName, dialogTitle, currentRow} from '../getters'

const sender = 'ObjectManager';
const modelName = 'funnyobject';

export default {
    ready() {
        this.initGrid(this);
        this.initToolbar(this);
    },
    methods: {
        initGrid: (context) => {
            let originalRequest = {};
            let grid = $("#main-grid").bootgrid({
                ajaxSettings: gridHelper.config.ajaxSettings,
                requestHandler: (request) => {
                    originalRequest = request;
                    return {};
                },
                url: () => {
                    return gridHelper.search.getDefaultSearchUrl(funnyobjects.baseUrl + funnyobjects.path + '/', originalRequest, 'fob_des');
                },
                labels: gridHelper.config.labels,
                formatters: {
                    'fob_created_formatter': (column, row) => {
                        return gridHelper.formatters.formatDate(row.fob_created);
                    },
                    'fob_disabled_formatter': (column, row) => {
                        return gridHelper.formatters.formatCheckbox(row.fob_disabled);
                    },
                    'actions_formatter': (column, row) => {
                        return gridHelper.formatters.formatActions(row.fob_id);
                    }
                }
            })
            .on("loaded.rs.jquery.bootgrid", () => {
                grid.find(".command-edit").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    context.editItem(sender, modelName, rowId);
                }).end().find(".command-delete").on("click", (e) => {
                    let rowId = grid.find(".command-edit").data("row-id");
                    context.deleteItem(sender, modelName, rowId);
                });
            });
        },
        initToolbar: (context) => {
            $('#newItem').on('click', () => {
                context.newItem(sender, modelName);
            });
        }
    },
    vuex: {
        actions: {
            newItem,
            editItem,
            deleteItem
        },
        getters: {
            actionName,
            dialogTitle,
            currentRow
        }
    }
}
</script>
