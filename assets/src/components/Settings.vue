<style>
    .starter-template {
        padding: 40px 15px;
        text-align: center;
    }
    .input-group-addon-detail {
        min-width: 200px;
        text-align: right;
    }
    .action-buttons {
        text-align: right;
    }
</style>

<template>
    <div class="starter-template">
        
        <!-- Header -->
        <div class="page-header">
            <h1>Impostazioni</h1>
        </div>

        <!-- Gateway -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Gateway</h3>
            </div>
            <div class="panel-body">
                
                <div class="input-group">
                    <span class="input-group-addon input-group-addon-detail" id="lbl_set_gateway_host">Host</span>
                    <input type="text" class="form-control" placeholder="Host" id="txt_set_gateway_host" aria-describedby="lbl_set_gateway_host" v-model="currentRow.set_gateway_host">
                </div>

                <div class="input-group">
                    <span class="input-group-addon input-group-addon-detail" id="lbl_set_gateway_port">Port</span>
                    <input type="text" class="form-control" placeholder="Port" id="txt_set_gateway_port" aria-describedby="lbl_fob_des" v-model="currentRow.set_gateway_port">
                </div>
                
            </div>
        </div>    

        <!-- Actions -->
        <div class="action-buttons">
            <button type="button" class="btn btn-primary" id="saveSettings">Salva</button>
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
import {resetState, editItem, confirmDetail} from '../actions'
import {actionName, rowId, dialogTitle, currentRow, notifyMessage} from '../getters'

export default {
    created() {
        this.resetState();
    },
    ready() {
        this.sender = 'Settings';
        this.modelName = 'settings';
        this.backEnd = backEndFactory.create();

        this.initComponents();
    },
    methods: {
        initComponents() {
            this.editItem(this.sender, this.modelName, 1);

            $('#saveSettings').on('click', () => {
                let detailData = {
                    'set_gateway_host': $('#txt_set_gateway_host').val(),
                    'set_gateway_port': $('#txt_set_gateway_port').val()
                };
                this.confirmDetail(this.sender, this.modelName, detailData, this.rowId);
            });
        }
    },
    vuex: {
        actions: {
            resetState,
            editItem,
            confirmDetail
        },
        getters: {
            actionName,
            rowId,
            dialogTitle,
            currentRow,
            notifyMessage
        }
    }
}
</script>
