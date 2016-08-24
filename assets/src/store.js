import Vue from 'vue'
import Vuex from 'vuex'
import gridHelper from './gridHelper'
import dialogHelper from './dialogHelper'
import modelHelper from './modelHelper'

Vue.use(Vuex);

// Inizializzazione state
const state = {
    action: {},
    labels: {},
    messages: {},
    data: {
        currentRow: {}
    }
};

export const mutations = {
    
    // Preparazione aggiunta di un nuovo elemento
    NEW_ITEM(state, sender, modelName, rowId) {
        Vue.set(state, 'action', {  
            name: 'new',
            sender,
            modelName
        });
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.data, 'currentRow', {});
        dialogHelper.openDetail();
    }, 

    // Preparazione modifica elemento esistente
    EDIT_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'edit',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.data, 'currentRow', data);
        dialogHelper.openDetail();
    },

    // Preparazione cancellazione elemento esistente
    DELETE_ITEM(state, sender, modelName, rowId, data) {
        Vue.set(state, 'action', {  
            name: 'delete',
            sender,
            modelName,
            rowId
        });
        Vue.set(state.data, 'currentRow', data);
        dialogHelper.openConfirmDelete();
    },

    // Conferma inserimento/modifica elemento
    CONFIRM_DETAIL(state, sender, modelName, detailData, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        dialogHelper.closeDetail();
        dialogHelper.openNotifyMessage();
        gridHelper.reload();
    },

    // Conferma cancellazione elemento
    CONFIRM_DELETE(state, sender, modelName, rowId, data) {
        Vue.set(state.data, 'currentRow', data);
        Vue.set(state.labels, 'dialogTitle', modelHelper.getConfirmDeleteDialogTitle(modelName));
        Vue.set(state.messages, 'notify', modelHelper.getNotifyMessage(modelName, state.action.name, data));
        dialogHelper.closeConfirmDelete();
        dialogHelper.openNotifyMessage();
        gridHelper.reload();
    },

    // Gestione errore server
    SERVER_ERROR(state, sender, modelName, req, err) {
        Vue.set(state.labels, 'dialogTitle', modelHelper.getDetailDialogTitle(modelName, state.action.name));
        Vue.set(state.messages, 'error', modelHelper.getErrorMessage(modelName, state.action.name, err));
        dialogHelper.openErrorMessage();
    },
}

export default new Vuex.Store({
    state,
    mutations
})
